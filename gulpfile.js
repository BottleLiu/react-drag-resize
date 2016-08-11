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
var srcRoot = 'src';
var port = 3089;
var watchPaths = {
    jsSrc: 'src/js/index.js',
    jsDest: './',
    jsFile: 'bundle.js',
    less: 'src/style/less/**/*.less',
    css: 'src/style/css/'
};
var browserifyOpts = {
    entries: [watchPaths.jsSrc],
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
        return gulp.src(watchPaths.less)
            .pipe(less({
                plugins: [autoprefix]
            }))
            .pipe(gulp.dest(watchPaths.css))
            .pipe(connect.reload());
    };
    parseLess();
    gulp.watch(watchPaths.less, parseLess);
});

gulp.task('builder-drag-resize', function () {
    
});

var bundle = function () {
    return jsWatcher.bundle()
        .on('error', function (err) {
            console.log(err.message);
            console.log(err.stack);
        })
        .pipe(source(watchPaths.jsFile))
        .pipe(gulp.dest(watchPaths.jsDest))
        .pipe(connect.reload());
};

var babelifyTrans = cacheify(babelify.configure({
    presets: ["es2015", "stage-0", "react"],
    plugins: ['external-helpers']
}), levelDb);


var bundler = browserify(browserifyOpts)
    .external(['react', 'react-dom'])
    .transform(babelifyTrans);

jsWatcher = watchify(bundler)
    .on('update', bundle)
    .on('log', gutil.log);

gulp.task('watch-js', bundle);
gulp.task('watch', ['watch-js', 'watch-html', 'watch-less'])
gulp.task('default', ['connect', 'watch']);
