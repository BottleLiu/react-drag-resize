'use strict';

var url = require('url');
var gulp = require('gulp');
var gutil = require('gulp-util');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var cacheify = require('cacheify');
var levelup = require('levelup');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var connect = require('gulp-connect');
var autoprefixer = require('autoprefixer');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({ browsers: ['last 2 versions'] });
var levelDb = levelup('./.cache');

var jsWatcher;
var srcRoot = 'site';
var port = 3089;
var watchPaths = {
    site: {
        jsSrc: 'site/js/index.js',
        jsDest: 'site/js/',
        jsFile: 'bundle.js',
        less: 'site/style/less/**/*.less',
        css: 'site/style/css/',
    },
    dragResize: {
        jsSrc: './src/js/drag-resize/drag-resize.js',
        jsDest: 'src/js/',
        jsFile: 'drag-resize.js',
        less: 'src/style/less/drag-resize.less',
        css: 'src/style/css/',
        moduleName: 'drag-resize'
    }
};
var browserifyOpts = {
    entries: [watchPaths.site.jsSrc],
    debug: true,
    insertGlobals: true,
    detectGlobals: false
};

gulp.task('connect', function () {
    connect.server({
        root: [srcRoot, './'],
        port: port,
        livereload: {
            port: port * 10
        },
        fallback: './index.html'
    });
});

gulp.task('watch-html', function () {
    gulp.watch('./index.html', function () {
        return gulp.src('./**/*.html')
            .pipe(connect.reload());
    });
});

gulp.task('watch-less', function () {
    var parseLess = function () {
        return gulp.src(watchPaths.site.less)
            .pipe(less({
                plugins: [autoprefix]
            }))
            .pipe(gulp.dest(watchPaths.site.css))
            .pipe(connect.reload());
    };
    parseLess();
    gulp.watch(watchPaths.site.less, parseLess);
});

gulp.task('builder-drag-resize-less', function () {
    var conf = watchPaths.dragResize;
    var parseLess = function () {
        return gulp.src(conf.less)
            .pipe(less({
                plugins: [autoprefix]
            }))
            .pipe(gulp.dest(conf.css))
            .pipe(connect.reload());
    };
    parseLess();
    gulp.watch(conf.less, parseLess);
});

gulp.task('builder-drag-resize', function () {
    var conf = watchPaths.dragResize;
    var opts = {
        debug: true,
        insertGlobals: true,
        detectGlobals: false
    };
    var dragResizeWatcher;
    var dragResizeBundle = function () {
        return dragResizeWatcher.bundle()
            .on('error', function (err) {
                console.log(err.message);
                console.log(err.stack);
            })
            .pipe(source(conf.jsFile))
            .pipe(gulp.dest(conf.jsDest))
            .pipe(connect.reload());
    };

    var babelifyTrans = cacheify(babelify.configure({
        presets: ["es2015", "stage-0", "react"],
        plugins: ['external-helpers']
    }), levelDb);


    var bundler = browserify(opts)
        .require(conf.jsSrc, {expose: conf.moduleName})
        .external(['react', 'react-dom'])
        .transform(babelifyTrans);

    dragResizeWatcher = watchify(bundler)
        .on('update', dragResizeBundle)
        .on('log', gutil.log);
    dragResizeBundle();
});

var bundle = function () {
    return jsWatcher.bundle()
        .on('error', function (err) {
            console.log(err.message);
            console.log(err.stack);
        })
        .pipe(source(watchPaths.site.jsFile))
        .pipe(gulp.dest(watchPaths.site.jsDest))
        .pipe(connect.reload());
};

var babelifyTrans = cacheify(babelify.configure({
    presets: ["es2015", "stage-0", "react"],
    plugins: ['external-helpers']
}), levelDb);


var bundler = browserify(browserifyOpts)
    .external(['react', 'react-dom', 'drag-resize'])
    .transform(babelifyTrans);

jsWatcher = watchify(bundler)
    .on('update', bundle)
    .on('log', gutil.log);

gulp.task('build', ['builder-drag-resize', 'builder-drag-resize-less']);
gulp.task('watch-js', bundle);
gulp.task('watch', ['watch-js', 'watch-html', 'watch-less'])
gulp.task('default', ['connect', 'watch']);
