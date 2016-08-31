require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

var _utils2 = babelHelpers.interopRequireDefault(_utils);

var getStyle = _utils2.default.getStyle;

// 计算可使用的区域
/**
 * 处理边界
 */
var calcAvailableZone = function calcAvailableZone(nd, relativeParentInfo, wrapperPosVal) {
    var ndStyle = void 0;
    var ndInfo = void 0;
    if (_utils2.default.isNode(nd)) {
        ndStyle = getStyle(nd);
        ndInfo = _utils2.default.getDomAbsoluteInfo(nd);
    } else if (_utils2.default.isWindow(nd)) {
        var winSize = _utils2.default.getWinSize(nd.document.body);
        ndStyle = {
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0
        };
        ndInfo = {
            left: 0,
            top: 0,
            width: winSize.width,
            height: winSize.height
        };
    } else {
        return false;
    }
    // 此处由于ndInfo是基于初始时位置计算的，因此直接使用即可
    var bdL = parseFloat(ndStyle.borderLeftWidth, 10);
    var bdR = parseFloat(ndStyle.borderRightWidth, 10);
    var bdT = parseFloat(ndStyle.borderTopWidth, 10);
    var bdB = parseFloat(ndStyle.borderBottomWidth, 10);
    var bpL = bdL + parseFloat(ndStyle.paddingLeft, 10);
    var bpR = bdR + parseFloat(ndStyle.paddingRight, 10);
    var bpT = bdT + parseFloat(ndStyle.paddingTop, 10);
    var bpB = bdB + parseFloat(ndStyle.paddingBottom, 10);

    var startX = 0;
    var endX = 0;
    var startY = 0;
    var endY = 0;
    // 相对参数的边界条件特殊处理，其元素定位与内边距有关
    if (wrapperPosVal === 'relative') {
        startX = ndInfo.left - relativeParentInfo.left + bdL;
        endX = startX + ndInfo.width - bpL - bpR;
        startY = ndInfo.top - relativeParentInfo.top + bdT;
        endY = startY + ndInfo.height - bpT - bpB;
    } else {
        startX = ndInfo.left - relativeParentInfo.left + bpL;
        endX = startX + ndInfo.width - bpL - bpR;
        startY = ndInfo.top - relativeParentInfo.top + bpT;
        endY = startY + ndInfo.height - bpT - bpB;
    }
    var range = {
        x: [startX, endX],
        y: [startY, endY]
    };
    return range;
};

exports.default = {
    calcAvailableZone: calcAvailableZone
};

},{"./utils":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var DragHandler = function (_Component) {
    babelHelpers.inherits(DragHandler, _Component);

    function DragHandler() {
        babelHelpers.classCallCheck(this, DragHandler);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(DragHandler).apply(this, arguments));
    }

    babelHelpers.createClass(DragHandler, [{
        key: 'render',
        value: function render() {
            return false;
        }
    }]);
    return DragHandler;
}(_react.Component); /**
                      * 手柄模块
                      */


var ResizeHandler = function (_Component2) {
    babelHelpers.inherits(ResizeHandler, _Component2);

    function ResizeHandler() {
        babelHelpers.classCallCheck(this, ResizeHandler);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ResizeHandler).apply(this, arguments));
    }

    babelHelpers.createClass(ResizeHandler, [{
        key: 'render',
        value: function render() {
            return false;
        }
    }]);
    return ResizeHandler;
}(_react.Component);

exports.default = { DragHandler: DragHandler, ResizeHandler: ResizeHandler };

},{"react":"react"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var Placeholder = function (_Component) {
    babelHelpers.inherits(Placeholder, _Component);

    function Placeholder() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        babelHelpers.classCallCheck(this, Placeholder);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Placeholder)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.buildStyle = function () {
            var props = _this.props;
            var prevParam = props.prevParam;

            var style = {
                width: props.width,
                height: props.height,
                left: -parseFloat(prevParam.left || 0, 10) + parseFloat(props.left || 0, 10) + 'px',
                top: -parseFloat(prevParam.top || 0, 10) + parseFloat(props.top || 0, 10) + 'px'
            };

            return style;
        }, _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
    }

    babelHelpers.createClass(Placeholder, [{
        key: 'render',
        value: function render() {
            var style = this.buildStyle();
            return _react2.default.createElement('div', { className: 'dg-ph', style: style });
        }
    }]);
    return Placeholder;
}(_react.Component); /**
                      * 拖拽占位模块
                      */


Placeholder.defaultProps = {
    left: 0,
    top: 0
};
exports.default = Placeholder;

},{"react":"react"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var utils = {
    getNum: function getNum(val) {
        var tmpVal = parseFloat(val, 10);
        if (!isNaN(tmpVal)) {
            return tmpVal;
        }
        return 0;
    },
    getAvailableSize: function getAvailableSize(nd) {
        var root = (nd ? nd.ownerDocument : document)['body'];
        return {
            height: root.clientHeight,
            width: root.clientWidth
        };
    },
    getWinSize: function getWinSize(nd) {
        var root = (nd ? nd.ownerDocument : document)['documentElement'];
        return {
            height: root.clientHeight,
            width: root.clientWidth
        };
    },
    getStyle: function getStyle(nd) {
        var styleName = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        var style = void 0;
        if (nd.currentStyle) {
            style = nd.currentStyle;
        } else {
            style = window.getComputedStyle(nd, null);
        }
        return styleName ? style[styleName] : style;
    },
    isNode: function isNode(nd) {
        return !!(nd && nd.nodeType === 1);
    },
    merge: function merge() {
        var rootObj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var newObj = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        for (var i in newObj) {
            if (newObj.hasOwnProperty(i)) {
                rootObj[i] = newObj[i];
            }
        }

        return rootObj;
    },
    isArray: function isArray(item) {
        return item instanceof Array;
    },
    isObject: function isObject(item) {
        return item instanceof Object;
    },
    isWindow: function isWindow(item) {
        return !(item && item.constructor.toString().indexOf('Window') !== -1);
    },
    getEvtPos: function getEvtPos(e) {
        return {
            x: e.pageX,
            y: e.pageY
        };
    },
    getScrollPos: function getScrollPos(nd) {
        if (nd) {
            return {
                top: nd.scrollTop,
                left: nd.scrollLeft
            };
        }
        return {
            top: Math.max(window.pageYOffset || 0, document.body.scrollTop || document.documentElement.scrollTop),
            left: Math.max(window.pageXOffset || 0, document.body.scrollLeft || document.documentElement.scrollLeft)
        };
    },
    getDomPageInfo: function getDomPageInfo(nd) {
        if (nd.getBoundingClientRect) {
            return nd.getBoundingClientRect();
        }

        var winScrollPos = this.getScrollPos();
        return {
            top: nd.offsetTop - winScrollPos.top,
            left: nd.offsetLeft - winScrollPos.left,
            width: nd.offsetWidth,
            height: nd.offsetHeight
        };
    },
    getDomAbsoluteInfo: function getDomAbsoluteInfo(nd) {
        var winScrollPos = this.getScrollPos();
        var reactInfo = nd.getBoundingClientRect();

        return {
            top: reactInfo.top + winScrollPos.top,
            left: reactInfo.left + winScrollPos.left,
            width: nd.offsetWidth,
            height: nd.offsetHeight
        };
    },
    addClass: function addClass(nd, classStr) {
        if (nd.classList) {
            nd.classList.add(classStr);
        } else {
            var classArr = nd.className.replace(/\s{2,}/g, ' ').split(' ');
            if (classArr.indexOf(classStr) === -1) {
                classArr.push(classStr);
                nd.className = classArr.join(' ');
            }
        }
        return nd;
    },
    removeClass: function removeClass(nd, classStr) {
        if (nd.classList) {
            nd.classList.remove(classStr);
        } else {
            var classArr = nd.className.replace(/\s{2,}/g, ' ').split(' ');
            var myPos = classArr.indexOf(classStr);
            if (myPos !== -1) {
                classArr.splice(myPos, 1);
                nd.className = classArr.join(' ');
            }
        }
        return nd;
    },
    addEvent: function addEvent(nd, evtType, cbk) {
        if (nd) {
            switch (true) {
                case !!nd.addEventListener:
                    nd.addEventListener(evtType, cbk, false);
                    break;
                case !!nd.attachEvent:
                    nd.attachEvent(evtType, cbk);
                    break;
                default:
                    nd['on' + evtType] = cbk;
            }
        }
        return nd;
    },
    removeEvent: function removeEvent(nd, evtType, cbk) {
        if (nd) {
            switch (true) {
                case !!nd.removeEventListener:
                    nd.removeEventListener(evtType, cbk, false);
                    break;
                case !!nd.detachEvent:
                    nd.detachEvent(evtType, cbk);
                    break;
                default:
                    nd['on' + evtType] = null;
            }
        }
        return nd;
    },
    unikey: function unikey() {
        var len = arguments.length <= 0 || arguments[0] === undefined ? 16 : arguments[0];

        var result = '';
        for (; result.length < len; result += Math.random().toString(36).substr(2)) {}
        return result.substr(0, len);
    },
    keyCreator: function keyCreator() {
        var prefix = arguments.length <= 0 || arguments[0] === undefined ? 'd' : arguments[0];

        var keyArr = this.unikey(9).match(/.{1,3}/g);
        keyArr.unshift(prefix);
        return keyArr.join('-');
    }
};

exports.default = utils;

},{}],"drag-resize":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _utils = require('./utils');

var _utils2 = babelHelpers.interopRequireDefault(_utils);

var _boundary = require('./boundary');

var _boundary2 = babelHelpers.interopRequireDefault(_boundary);

var _placeholder = require('./placeholder');

var _placeholder2 = babelHelpers.interopRequireDefault(_placeholder);

var _handler = require('./handler');

var _handler2 = babelHelpers.interopRequireDefault(_handler);

var DragHandler = _handler2.default.DragHandler; /**
                                                  * drag-resize基础单元
                                                  */

var ResizeHandler = _handler2.default.ResizeHandler;

var validPositionVal = {
    relative: true,
    absolute: true,
    fixed: true
};
var getStyle = _utils2.default.getStyle;


var infoToStyle = function infoToStyle() {
    var currentInfo = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var enabledMap = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var param = {};
    if (enabledMap.drag) {
        var left = currentInfo.left;
        var top = currentInfo.top;

        if (left || left === 0) {
            param.left = (left || 0) + 'px';
        }
        if (top || top === 0) {
            param.top = (top || 0) + 'px';
        }
    }
    if (enabledMap.resize) {
        var width = currentInfo.width;
        var height = currentInfo.height;

        if (width || width === 0) {
            param.width = (width || 0) + 'px';
        }
        if (height || height === 0) {
            param.height = (height || 0) + 'px';
        }
    }
    return param;
};

var DragResize = function (_Component) {
    babelHelpers.inherits(DragResize, _Component);

    function DragResize(props) {
        babelHelpers.classCallCheck(this, DragResize);

        // 容器position属性
        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(DragResize).call(this, props));

        _initialiseProps.call(_this);

        _this.wrapperPositionStyle = 'relative';
        // 点击时，主体与点击位置的差值
        _this.handleOffset = { x: 0, y: 0 };
        // 稳定态盒子尺寸信息
        _this.stableSoureInfo = { left: 0, top: 0, width: 0, height: 0 };
        // 当前信息
        _this.currentInfo = {};
        _this.currentInfoCache = {};
        _this.node = null;
        _this.handle = {};
        // 父级首个相对定位的节点，在使用了绝对定位控制时使用
        _this.relativeParentInfo = null;
        // 冻结
        _this.frozenX = false;
        _this.frozenY = false;
        _this.frozenW = false;
        _this.frozenH = false;
        _this.frozenResize = false;
        _this.frozenDrag = false;
        // 网格
        _this.gridX = false;
        _this.gridY = false;
        _this.noGrid = true;
        // 尺寸限制
        _this.wRange = false;
        _this.hRange = false;
        // 边界检测参数
        _this.boundParams = null;
        // 用定时器节流
        _this.ingTimer = null;
        // 辅助fixed节点不超出窗口
        _this.limitWin = false;
        _this.winSize = null;
        _this.scrollCache = null;
        _this.needRefreshInitInfo = false;
        // 用于手柄的占用冲突处理
        _this.selfOccupied = false;
        _this.handleInstMap = {};
        return _this;
    }

    babelHelpers.createClass(DragResize, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.parseFrozen();
            this.parseGrid();
            this.parseSizeRange();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.wrapperPositionStyle = this.parseNdStylePosition();
            this.parseInitStyle(this.props, function () {
                _this2.initCurrentInfo(true);
                _this2.freshParam();
            });
            this.parseHandleParam();
            this.parseBound();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.destroyEvt();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this3 = this;

            this.needRefreshInitInfo = true;
            this.destroyEvt();
            this.wrapperPositionStyle = this.parseNdStylePosition(nextProps);
            this.parseFrozen(nextProps);
            this.parseGrid(nextProps);
            this.parseSizeRange(nextProps);
            this.parseHandleParam(nextProps);
            this.parseBound();
            this.parseInitStyle(nextProps, function () {
                _this3.initCurrentInfo(true);
            });
        }

        // 返回到上一个稳定态位置


        // 初始化currentInfo


        // style参数预处理


        // 解析手柄参数


        // 解析冻结参数


        // 解析网格参数


        // 解析尺寸限制


        // 解析边界约束


        // betterFixed


        // 预解析边界，在action开始时调用
        // 生成实时解析边界参数中依赖的值


        // 实时解析边界参数


        // 实时解析边界参数


        // 实时解析冻结参数


        // 实时解析网格拖拽


        // 实时解析网格resize


        // 实时解析尺寸限制


        // 从this.currentInfo参数和state中解析出拖拽体的样式


        // 获取最近一个relative的父级节点(自身为relative时，将基于父级节点)


        // 节流


        // 节流

    }, {
        key: 'render',
        value: function render() {
            var _state = this.state;
            var styleParam = _state.styleParam;
            var status = _state.status;

            var placeholder = false;
            var extraProps = {};
            // 特殊处理self
            if (this.handle.drag === 'self') {
                extraProps.onMouseDown = this.handleDragStart;
            }
            // 处理占位元素
            if (this.props.enablePlaceholder && status !== 'idle') {
                var prevStableParam = this.buildStyleByState(this.state, this.currentInfoCache);
                placeholder = _react2.default.createElement(_placeholder2.default, babelHelpers.extends({}, styleParam, { prevParam: prevStableParam }));
                styleParam = prevStableParam;
            }

            return _react2.default.createElement(
                'div',
                babelHelpers.extends({
                    className: 'drag-unit',
                    ref: this.getWrapperNd,
                    style: styleParam
                }, extraProps),
                this.parseContent(),
                placeholder
            );
        }
    }]);
    return DragResize;
}(_react.Component);

DragResize.propTypes = {
    // 拖拽的手柄，可选为节点或者简单的选择器
    dragHandler: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.string, _react.PropTypes.element]),
    resizeHandler: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.string, _react.PropTypes.element]),
    // 拖拽时的节流间隙时长，单位为ms
    debounce: _react.PropTypes.number,
    // 边界参数，可选为：
    // 节点：表示在该节点范围内移动，'parent'关键词：表示只能在其父节点内移动
    bound: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.string]),
    // 拖拽步进，如grid: [50, 100]表示拖拽x方向以50为步进，y方向以100为步进
    grid: _react.PropTypes.arrayOf(_react.PropTypes.number),
    // 冻结操作，ture表示都冻结，x表示冻结x方向，y表示冻结y方向
    frozen: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.object]),
    sizeRange: _react.PropTypes.object,
    // 是否取消拖拽，在拖拽结束时执行，可选为true(直接返回)，function(判断后返回true时则返回)
    beforeEnd: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func]),
    // 是否开启placeholder模式，该模式下，拖拽过程中使用的是一个辅助块，结束之后才更新主体位置
    enablePlaceholder: _react.PropTypes.bool,
    // 进行时，不在body上添加辅助的class
    noGlobalClass: _react.PropTypes.bool,
    // position为fixed时自动限定不超出窗口
    betterFixed: _react.PropTypes.bool,
    // 以下三个分别为拖拽开始，拖拽中，拖拽结束的回调，接收三个参数：event, 当前位置参数，在页面上的位置
    onStart: _react.PropTypes.func,
    onProcess: _react.PropTypes.func,
    onEnd: _react.PropTypes.func
};
DragResize.defaultProps = {
    frozen: false,
    debounce: 17,
    grid: [],
    betterFixed: true,
    enablePlaceholder: false,
    enabled: { drag: true, resize: true },
    onStart: function onStart() {},
    onProcess: function onProcess() {},
    onEnd: function onEnd() {}
};

var _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.state = {
        status: 'idle',
        currentInfo: {},
        style: {}
    };

    this.destroyEvt = function () {
        if (_this4.handle.drag) {
            _utils2.default.removeEvent(_this4.node.ownerDocument, 'mousemove', _this4.lazyHandleDragIn);
            _utils2.default.removeEvent(_this4.node.ownerDocument, 'mouseup', _this4.handleDragEnd);
        }
        if (_this4.handle.resize) {
            _utils2.default.removeEvent(_this4.node.ownerDocument, 'mousemove', _this4.lazyHandleResizeIn);
            _utils2.default.removeEvent(_this4.node.ownerDocument, 'mouseup', _this4.handleResizeEnd);
        }
        _this4.ingTimer && clearTimeout(_this4.ingTimer);
        _this4.ingTimer = null;
    };

    this.getWrapperNd = function (comp) {
        _this4.node = comp;
    };

    this.backToPrevPos = function (cbk) {
        _this4.currentInfo = _this4.currentInfoCache;
        var styleParam = _this4.buildStyleByState(_this4.state);
        _this4.setState({
            styleParam: styleParam,
            status: 'idle'
        }, function () {
            cbk && cbk();
        });
    };

    this.initCurrentInfo = function () {
        var force = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

        if (force || _this4.needRefreshInitInfo) {
            _this4.currentInfo = _this4.parseStyleParam();
            // 初始缓存
            _this4.currentInfoCache = babelHelpers.extends({}, _this4.currentInfo);
            _this4.needRefreshInitInfo = false;
            return true;
        }
        return false;
    };

    this.parseInitStyle = function () {
        var props = arguments.length <= 0 || arguments[0] === undefined ? _this4.props : arguments[0];
        var cbk = arguments[1];

        var styleOpts = babelHelpers.extends({}, props.style || {});
        styleOpts.position = _this4.wrapperPositionStyle;
        if (styleOpts.position === 'absolute') {
            if (props.enabled.drag) {
                if (typeof styleOpts.top === 'undefined') {
                    styleOpts.top = _this4.node.offsetTop + 'px';
                }
                if (typeof styleOpts.left === 'undefined') {
                    styleOpts.left = _this4.node.offsetLeft + 'px';
                }
            }
        }
        if (styleOpts.position === 'fixed') {
            _this4.limitWin = props.betterFixed;
        }
        _this4.setState({
            styleParam: styleOpts
        }, function () {
            cbk && cbk();
        });
    };

    this.parseContent = function () {
        var props = arguments.length <= 0 || arguments[0] === undefined ? _this4.props : arguments[0];

        _this4.handleInstMap = {};
        var enabledDrag = props.enabled.drag;
        var enabledResize = props.enabled.resize;
        return _react2.default.Children.map(props.children, function (Child) {
            if (!Child || !Child.type) {
                return Child;
            }
            switch (Child.type) {
                case DragHandler:
                    if (!enabledDrag || _this4.handleInstMap['drag']) {
                        return Child;
                    }
                    _this4.handleInstMap['drag'] = true;
                    return _react2.default.createElement('div', babelHelpers.extends({}, Child.props || {}, {
                        ref: function ref(nd) {
                            _this4.handle.drag = nd;
                        },
                        onMouseDown: _this4.handleDragStart }));

                case ResizeHandler:
                    if (!enabledResize || _this4.handleInstMap['resize']) {
                        return Child;
                    }
                    _this4.handleInstMap['resize'] = true;
                    return _react2.default.createElement('div', babelHelpers.extends({}, Child.props || {}, {
                        ref: function ref(nd) {
                            _this4.handle.resize = nd;
                        },
                        onMouseDown: _this4.handleResizeStart }));

                default:
                    return Child;
            }
        });
    };

    this.parseNdStylePosition = function () {
        var props = arguments.length <= 0 || arguments[0] === undefined ? _this4.props : arguments[0];

        var styleOpts = props.style || {};
        var targetVal = 'relative';
        var ndPosition = styleOpts.position || _utils2.default.getStyle(_this4.node, 'position');
        if (validPositionVal[ndPosition]) {
            targetVal = ndPosition;
        }

        return targetVal;
    };

    this.parseStyleParam = function () {
        var modStyle = _utils2.default.getStyle(_this4.node);
        return {
            left: _utils2.default.getNum(modStyle.left),
            top: _utils2.default.getNum(modStyle.top),
            width: _utils2.default.getNum(modStyle.width),
            height: _utils2.default.getNum(modStyle.height)
        };
    };

    this.parseHandleParam = function () {
        var props = arguments.length <= 0 || arguments[0] === undefined ? _this4.props : arguments[0];
        var dragSelf = props.dragSelf;
        var enabled = props.enabled;

        if (!_this4.handleInstMap.drag) {
            _this4.handle.drag = dragSelf && enabled.drag ? 'self' : null;
        }
    };

    this.parseFrozen = function () {
        var props = arguments.length <= 0 || arguments[0] === undefined ? _this4.props : arguments[0];
        var frozen = props.frozen;

        var frozenType = typeof frozen === 'undefined' ? 'undefined' : babelHelpers.typeof(frozen);
        switch (frozenType) {
            case 'boolean':
                _this4.frozenX = _this4.frozenY = _this4.frozenW = _this4.frozenH = frozen;
                break;

            case 'string':
                frozen = frozen.toLowerCase();
                _this4.frozenX = frozen === 'x';
                _this4.frozenY = frozen === 'y';
                _this4.frozenW = frozen === 'w';
                _this4.frozenH = frozen === 'h';
                break;

            default:
                if (_utils2.default.isObject(frozen)) {
                    _this4.frozenX = !!frozen.x;
                    _this4.frozenY = !!frozen.y;
                    _this4.frozenW = !!frozen.w;
                    _this4.frozenH = !!frozen.h;
                } else {
                    _this4.frozenX = _this4.frozenY = _this4.frozenW = _this4.frozenH = false;
                }
        }
        _this4.frozenResize = _this4.frozenW && _this4.frozenH;
        _this4.frozenDrag = _this4.frozenX && _this4.frozenY;
    };

    this.parseGrid = function () {
        var props = arguments.length <= 0 || arguments[0] === undefined ? _this4.props : arguments[0];
        var grid = props.grid;

        if (grid) {
            if (typeof grid === 'number') {
                _this4.gridX = _this4.gridY = grid > 0 ? grid : false;
            } else if (_utils2.default.isArray(grid)) {
                _this4.gridX = grid[0] || false;
                _this4.gridY = grid[1] || false;
            } else {
                _this4.gridX = _this4.gridY = false;
            }
        } else {
            _this4.gridX = _this4.gridY = false;
        }
        _this4.noGrid = _this4.gridX === _this4.gridY && _this4.girdX === false;
    };

    this.parseSizeRange = function () {
        var props = arguments.length <= 0 || arguments[0] === undefined ? _this4.props : arguments[0];
        var sizeRange = props.sizeRange;

        var wRange = false;
        var hRange = false;
        if (sizeRange) {
            if (sizeRange.w) {
                var _sizeRange$w = babelHelpers.slicedToArray(sizeRange.w, 2);

                var wMin = _sizeRange$w[0];
                var wMax = _sizeRange$w[1];

                if (typeof wMin !== 'number' || wMin < 0) {
                    wMin = 0;
                }
                if (typeof wMax !== 'number') {
                    wMax = Infinity;
                }
                if (wMin <= wMax) {
                    wRange = [wMin, wMax];
                }
            }
            if (sizeRange.h) {
                var _sizeRange$h = babelHelpers.slicedToArray(sizeRange.h, 2);

                var hMin = _sizeRange$h[0];
                var hMax = _sizeRange$h[1];

                if (typeof hMin !== 'number' || hMin < 0) {
                    hMin = 0;
                }
                if (typeof hMax !== 'number') {
                    hMax = Infinity;
                }
                if (hMin <= hMax) {
                    hRange = [hMin, hMax];
                }
            }
        }
        _this4.wRange = wRange;
        _this4.hRange = hRange;
    };

    this.parseBound = function () {
        var props = arguments.length <= 0 || arguments[0] === undefined ? _this4.props : arguments[0];
        var bound = props.bound;

        if (!bound && !_this4.limitWin) {
            return false;
        }
        var resolveDragBound = void 0;
        var resolveResizeBound = void 0;
        var preResolveBound = void 0;
        var getAvailableParam = void 0;
        switch (true) {
            case bound === 'parent':
                getAvailableParam = function getAvailableParam() {
                    return _this4.node.parentNode;
                };
                break;

            case _utils2.default.isNode(bound):
                if (!bound.contains(_this4.node)) {
                    break;
                }
                getAvailableParam = function getAvailableParam() {
                    return bound;
                };
                break;

            case _this4.limitWin:
                getAvailableParam = function getAvailableParam() {
                    return window;
                };
                break;
        }
        if (getAvailableParam) {
            preResolveBound = function preResolveBound() {
                var availableParam = getAvailableParam();
                var bParams = _this4.boundParams = availableParam && _boundary2.default.calcAvailableZone(availableParam, _this4.relativeParentInfo, _this4.wrapperPositionStyle);
                if (_this4.limitWin) {
                    var currentScrollPos = _this4.scrollCache = _utils2.default.getScrollPos();
                    _this4.winSize = _utils2.default.getWinSize(_this4.node);
                    bParams.x[0] -= currentScrollPos.left;
                    bParams.x[1] -= currentScrollPos.left;
                    bParams.y[0] -= currentScrollPos.top;
                    bParams.y[1] -= currentScrollPos.top;
                }
            };

            resolveDragBound = function resolveDragBound(prevInfo, newInfo) {
                if (!_this4.boundParams) {
                    return newInfo;
                }

                var _boundParams$x = babelHelpers.slicedToArray(_this4.boundParams.x, 2);

                var startX = _boundParams$x[0];
                var endX = _boundParams$x[1];

                var _boundParams$y = babelHelpers.slicedToArray(_this4.boundParams.y, 2);

                var startY = _boundParams$y[0];
                var endY = _boundParams$y[1];
                var _newInfo = newInfo;
                var left = _newInfo.left;
                var top = _newInfo.top;

                var right = left + newInfo.width;
                var bottom = top + newInfo.height;
                if (left < startX) {
                    newInfo.left = startX;
                } else if (right > endX) {
                    var fixedLeft = endX - newInfo.width;
                    if (fixedLeft >= startX) {
                        newInfo.left = endX - newInfo.width;
                    }
                }
                if (top < startY) {
                    newInfo.top = startY;
                } else if (bottom > endY) {
                    var fixedTop = endY - newInfo.height;
                    if (fixedTop >= startY) {
                        newInfo.top = endY - newInfo.height;
                    }
                }
                newInfo = _this4.resolveDragWinLimit(newInfo);
                return newInfo;
            };
            resolveResizeBound = function resolveResizeBound(prevInfo, newInfo) {
                if (!_this4.boundParams) {
                    return newInfo;
                }

                var _boundParams$x2 = babelHelpers.slicedToArray(_this4.boundParams.x, 2);

                var startX = _boundParams$x2[0];
                var endX = _boundParams$x2[1];

                var _boundParams$y2 = babelHelpers.slicedToArray(_this4.boundParams.y, 2);

                var startY = _boundParams$y2[0];
                var endY = _boundParams$y2[1];
                var _newInfo2 = newInfo;
                var left = _newInfo2.left;
                var top = _newInfo2.top;

                var right = left + newInfo.width;
                var bottom = top + newInfo.height;
                if (left < startX) {
                    newInfo.width = prevInfo.width;
                } else if (right > endX) {
                    newInfo.width = endX - left;
                }
                if (top < startY) {
                    newInfo.height = prevInfo.height;
                } else if (bottom > endY) {
                    newInfo.height = endY - top;
                }
                newInfo = _this4.resolveResizeWinLimit(newInfo);
                return newInfo;
            };
        } else {
            resolveDragBound = function resolveDragBound(prevInfo, newInfo) {
                return newInfo;
            };
            resolveResizeBound = function resolveResizeBound(prevInfo, newInfo) {
                return newInfo;
            };
            preResolveBound = function preResolveBound() {};
        }
        _this4.resolveDragBound = resolveDragBound;
        _this4.resolveResizeBound = resolveResizeBound;
        _this4.preResolveBound = preResolveBound;
    };

    this.resolveDragWinLimit = function (newInfo) {
        if (!_this4.limitWin) {
            return newInfo;
        }
        var scrollSize = _utils2.default.getScrollPos();
        var winSize = _this4.winSize;
        var offsetL = scrollSize.left - _this4.scrollCache.left;
        var offsetV = scrollSize.top - _this4.scrollCache.top;
        newInfo.left -= offsetL;
        newInfo.top -= offsetV;
        var right = newInfo.left + newInfo.width;
        var bottom = newInfo.top + newInfo.height;
        if (newInfo.top < 0) {
            newInfo.top = 0;
        }
        if (right > winSize.width) {
            var newLeft = winSize.width - newInfo.width;
            if (newLeft >= 0) {
                newInfo.left = newLeft;
            }
        }
        if (newInfo.left < 0) {
            newInfo.left = 0;
        }
        if (bottom > winSize.height) {
            var newTop = winSize.height - newInfo.height;
            if (newTop >= 0) {
                newInfo.top = newTop;
            }
        }
        return newInfo;
    };

    this.resolveResizeWinLimit = function (newInfo) {
        if (!_this4.limitWin) {
            return newInfo;
        }
        var winSize = _this4.winSize;
        var right = newInfo.left + newInfo.width;
        var bottom = newInfo.top + newInfo.height;
        if (right > winSize.width) {
            var newW = winSize.width - newInfo.left;
            if (newW >= (_this4.wRange ? _this4.wRange[0] : 0)) {
                newInfo.width = newW;
            }
        }
        if (bottom > winSize.height) {
            var newH = winSize.height - newInfo.top;
            if (newH >= (_this4.hRange ? _this4.hRange[0] : 0)) {
                newInfo.height = newH;
            }
        }
        return newInfo;
    };

    this.preResolveBound = function () {};

    this.resolveDragBound = function (prevInfo, newInfo) {
        return newInfo;
    };

    this.resolveResizeBound = function (prevInfo, newInfo) {
        return newInfo;
    };

    this.resolveFrozen = function (prevInfo, newInfo) {
        if (_this4.frozenX) {
            newInfo.left = prevInfo.left;
        }
        if (_this4.frozenY) {
            newInfo.top = prevInfo.top;
        }
        if (_this4.frozenW) {
            newInfo.width = prevInfo.width;
        }
        if (_this4.frozenH) {
            newInfo.height = prevInfo.height;
        }
        return newInfo;
    };

    this.resolveDragGrid = function (prevInfo, newInfo) {
        if (_this4.noGrid) {
            return newInfo;
        }
        if (_this4.gridX !== false) {
            var offsetLeft = newInfo.left - prevInfo.left;
            if (offsetLeft) {
                var gridN = Math.round(offsetLeft / _this4.gridX);
                newInfo.left = prevInfo.left + gridN * _this4.gridX;
            }
        }
        if (_this4.gridY !== false) {
            var offsetTop = newInfo.top - prevInfo.top;
            if (offsetTop) {
                var _gridN = Math.round(offsetTop / _this4.gridY);
                newInfo.top = prevInfo.top + _gridN * _this4.gridY;
            }
        }
        return newInfo;
    };

    this.resolveResizeGrid = function (prevInfo, newInfo) {
        if (_this4.noGrid) {
            return newInfo;
        }
        if (_this4.gridX !== false) {
            var offsetWidth = newInfo.width - prevInfo.width;
            if (offsetWidth) {
                var gridN = Math.round(offsetWidth / _this4.gridX);
                newInfo.width = prevInfo.width + gridN * _this4.gridX;
            }
        }
        if (_this4.gridY !== false) {
            var offsetHeight = newInfo.height - prevInfo.height;
            if (offsetHeight) {
                var _gridN2 = Math.round(offsetHeight / _this4.gridY);
                newInfo.height = prevInfo.height + _gridN2 * _this4.gridY;
            }
        }
        return newInfo;
    };

    this.resolveSizeRange = function (prevInfo, newInfo) {
        if (_this4.wRange !== false) {
            var _wRange = babelHelpers.slicedToArray(_this4.wRange, 2);

            var wMin = _wRange[0];
            var wMax = _wRange[1];

            if (newInfo.width > wMax) {
                newInfo.width = wMax;
            } else if (newInfo.width < wMin) {
                newInfo.width = wMin;
            }
        }
        if (_this4.hRange !== false) {
            var _hRange = babelHelpers.slicedToArray(_this4.hRange, 2);

            var hMin = _hRange[0];
            var hMax = _hRange[1];

            if (newInfo.height > hMax) {
                newInfo.height = hMax;
            } else if (newInfo.height < hMin) {
                newInfo.height = hMin;
            }
        }
        return newInfo;
    };

    this.buildStyleByState = function () {
        var state = arguments.length <= 0 || arguments[0] === undefined ? _this4.state : arguments[0];
        var currentInfo = arguments.length <= 1 || arguments[1] === undefined ? _this4.currentInfo : arguments[1];
        var _state$styleParam = state.styleParam;
        var styleParam = _state$styleParam === undefined ? {} : _state$styleParam;
        var enabled = _this4.props.enabled;

        var posStyle = infoToStyle(currentInfo, enabled);
        styleParam = babelHelpers.extends({}, styleParam);
        styleParam = _utils2.default.merge(styleParam, posStyle);
        styleParam.position = _this4.wrapperPositionStyle;
        return styleParam;
    };

    this.getRelativeParentInfo = function () {
        var nodePosition = _utils2.default.getStyle(_this4.node, 'position');
        var parentNd = _this4.node;
        // (自身为relative时，将基于父级节点)
        if (nodePosition !== 'relative') {
            parentNd = _this4.node.offsetParent;
        } else {
            parentNd = _this4.node.parentNode;
        }
        var ndStyle = getStyle(parentNd);
        var ndInfo = _utils2.default.getDomAbsoluteInfo(parentNd);

        ndInfo.left += parseFloat(ndStyle.borderLeftWidth || 0, 10);
        ndInfo.top += parseFloat(ndStyle.borderTopWidth || 0, 10);
        return ndInfo;
    };

    this.freshParam = function () {
        var props = arguments.length <= 0 || arguments[0] === undefined ? _this4.props : arguments[0];
        var currentInfo = _this4.currentInfo;

        _this4.stableSoureInfo = _utils2.default.getDomAbsoluteInfo(_this4.node);
        _this4.stableSoureInfo.left -= currentInfo.left;
        _this4.stableSoureInfo.top -= currentInfo.top;
        _this4.relativeParentInfo = _this4.getRelativeParentInfo();
        if (_this4.wrapperPositionStyle === 'fixed' && props.betterFixed) {
            _this4.limitWin = true;
        } else {
            _this4.limitWin = false;
        }
    };

    this.handleStart = function (e, act, params) {
        !_this4.props.noGlobalClass && _utils2.default.addClass(_this4.node.ownerDocument.body, 'dg-active-' + act);
        _this4.props.onStart(e, act, params);
    };

    this.handleProcess = function (e, act, params) {
        _this4.props.onProcess(e, act, params);
    };

    this.handleEnd = function (e, act, params) {
        !_this4.props.noGlobalClass && _utils2.default.removeClass(_this4.node.ownerDocument.body, 'dg-active-' + act);
        _this4.currentInfoCache = babelHelpers.extends({}, _this4.currentInfo);
        _this4.props.onEnd(e, act, params);
    };

    this.handleDragStart = function (e) {
        var props = _this4.props;
        if (props.frozen === true) {
            return;
        }
        var el = e.target;
        // 两操作冲突
        if (_this4.handle.resize && _this4.handle.resize.contains(el)) {
            return;
        }

        _this4.preResolveBound();
        _this4.freshParam();
        var evtPos = _utils2.default.getEvtPos(e);
        var state = _this4.state;
        var currentInfo = _this4.currentInfo;

        var stableSoureInfo = _this4.stableSoureInfo;
        _this4.handleOffset = {
            x: evtPos.x - stableSoureInfo.left - currentInfo.left,
            y: evtPos.y - stableSoureInfo.top - currentInfo.top
        };

        _utils2.default.addEvent(_this4.node.ownerDocument, 'mousemove', _this4.lazyHandleDragIn);
        _utils2.default.addEvent(_this4.node.ownerDocument, 'mouseup', _this4.handleDragEnd);
        state.status = 'active';
        state.styleParam = _this4.buildStyleByState(state);
        _this4.setState(state, function () {
            _this4.handleStart(e, 'drag', babelHelpers.extends({}, currentInfo));
        });
    };

    this.lazyHandleDragIn = function (e) {
        if (!_this4.ingTimer) {
            _this4.ingTimer = setTimeout(function () {
                _this4.handleDragIn(e);
                _this4.ingTimer = null;
            }, _this4.props.debounce);
        }
    };

    this.handleDragIn = function (e) {
        var pos = _utils2.default.getEvtPos(e);
        var stableSoureInfo = _this4.stableSoureInfo;
        var handleOffset = _this4.handleOffset;
        var state = _this4.state;
        var prevCurrentInfo = _this4.currentInfo;
        var newCurrentInfo = {
            left: pos.x - stableSoureInfo.left - handleOffset.x,
            top: pos.y - stableSoureInfo.top - handleOffset.y,
            width: prevCurrentInfo.width,
            height: prevCurrentInfo.height
        };

        newCurrentInfo = _this4.resolveFrozen(prevCurrentInfo, newCurrentInfo);
        newCurrentInfo = _this4.resolveDragGrid(prevCurrentInfo, newCurrentInfo);
        newCurrentInfo = _this4.resolveDragBound(prevCurrentInfo, newCurrentInfo);
        _this4.currentInfo = newCurrentInfo;
        state.styleParam = _this4.buildStyleByState(state);
        _this4.setState(state, function () {
            _this4.handleProcess(e, 'drag', babelHelpers.extends({}, _this4.currentInfo));
        });
    };

    this.handleDragEnd = function (e) {
        _utils2.default.removeEvent(_this4.node.ownerDocument, 'mousemove', _this4.lazyHandleDragIn);
        _utils2.default.removeEvent(_this4.node.ownerDocument, 'mouseup', _this4.handleDragEnd);
        var currentInfo = _this4.currentInfo;
        var beforeEnd = _this4.props.beforeEnd;
        var endCopyInfo = babelHelpers.extends({}, currentInfo);
        var validFlag = true;
        if (typeof beforeEnd === 'function') {
            var absoluteInfo = _utils2.default.getDomAbsoluteInfo(_this4.node);
            validFlag = beforeEnd(e, 'drag', babelHelpers.extends({}, currentInfo), absoluteInfo) !== false;
        } else {
            validFlag = beforeEnd !== false;
        }
        if (!validFlag) {
            _this4.backToPrevPos(function () {
                _this4.handleEnd(e, 'drag', endCopyInfo);
            });
            return;
        }

        var state = _this4.state;
        state.status = 'idle';
        _this4.setState(state, function () {
            _this4.handleEnd(e, 'drag', endCopyInfo);
        });
    };

    this.handleResizeStart = function (e) {
        e.stopPropagation();
        var props = _this4.props;
        if (props.frozen === true) {
            return;
        }

        _this4.preResolveBound();
        _this4.freshParam();
        var evtPos = _utils2.default.getEvtPos(e);
        var state = _this4.state;
        var currentInfo = _this4.currentInfo;

        var stableSoureInfo = _this4.stableSoureInfo;
        _this4.handleOffset = {
            x: stableSoureInfo.width + stableSoureInfo.left - evtPos.x,
            y: stableSoureInfo.height + stableSoureInfo.top - evtPos.y
        };
        _utils2.default.addEvent(_this4.node.ownerDocument, 'mousemove', _this4.lazyHandleResizeIn);
        _utils2.default.addEvent(_this4.node.ownerDocument, 'mouseup', _this4.handleResizeEnd);
        state.status = 'active';
        state.styleParam = _this4.buildStyleByState(state);
        _this4.setState(state, function () {
            _this4.handleStart(e, 'resize', babelHelpers.extends({}, currentInfo));
        });
    };

    this.lazyHandleResizeIn = function (e) {
        if (!_this4.ingTimer) {
            _this4.ingTimer = setTimeout(function () {
                _this4.handleResizeIn(e);
                _this4.ingTimer = null;
            }, _this4.props.debounce);
        }
    };

    this.handleResizeIn = function (e) {
        var pos = _utils2.default.getEvtPos(e);
        var stableSoureInfo = _this4.stableSoureInfo;
        var handleOffset = _this4.handleOffset;
        var state = _this4.state;
        var prevCurrentInfo = _this4.currentInfo;
        var newCurrentInfo = {
            left: prevCurrentInfo.left,
            top: prevCurrentInfo.top,
            width: pos.x - stableSoureInfo.left + handleOffset.x,
            height: pos.y - stableSoureInfo.top + handleOffset.y
        };

        newCurrentInfo = _this4.resolveFrozen(prevCurrentInfo, newCurrentInfo);
        newCurrentInfo = _this4.resolveSizeRange(prevCurrentInfo, newCurrentInfo);
        newCurrentInfo = _this4.resolveResizeGrid(prevCurrentInfo, newCurrentInfo);
        newCurrentInfo = _this4.resolveResizeBound(prevCurrentInfo, newCurrentInfo);
        _this4.currentInfo = newCurrentInfo;
        state.styleParam = _this4.buildStyleByState(state);
        _this4.setState(state, function () {
            _this4.handleProcess(e, 'resize', babelHelpers.extends({}, _this4.currentInfo));
        });
    };

    this.handleResizeEnd = function (e) {
        _utils2.default.removeEvent(_this4.node.ownerDocument, 'mousemove', _this4.lazyHandleResizeIn);
        _utils2.default.removeEvent(_this4.node.ownerDocument, 'mouseup', _this4.handleResizeEnd);
        var currentInfo = _this4.currentInfo;
        var endCopyInfo = babelHelpers.extends({}, currentInfo);
        var beforeEnd = _this4.props.beforeEnd;
        var validFlag = true;
        if (typeof beforeEnd === 'function') {
            var absoluteInfo = _utils2.default.getDomAbsoluteInfo(_this4.node);
            validFlag = beforeEnd(e, 'resize', babelHelpers.extends({}, currentInfo), absoluteInfo) !== false;
        } else {
            validFlag = beforeEnd !== false;
        }
        if (!validFlag) {
            _this4.backToPrevPos(function () {
                _this4.handleEnd(e, 'resize', endCopyInfo);
            });
            return;
        }

        var state = _this4.state;
        state.status = 'idle';
        _this4.setState(state, function () {
            _this4.handleEnd(e, 'resize', endCopyInfo);
        });
    };
};

DragResize.DragHandler = DragHandler;
DragResize.ResizeHandler = ResizeHandler;
exports.default = DragResize;

},{"./boundary":1,"./handler":2,"./placeholder":3,"./utils":4,"react":"react"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZHJhZy1yZXNpemUvYm91bmRhcnkuanMiLCJzcmMvanMvZHJhZy1yZXNpemUvaGFuZGxlci5qcyIsInNyYy9qcy9kcmFnLXJlc2l6ZS9wbGFjZWhvbGRlci5qcyIsInNyYy9qcy9kcmFnLXJlc2l6ZS91dGlscy5qcyIsInNyYy9qcy9kcmFnLXJlc2l6ZS9kcmFnLXJlc2l6ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0dBOzs7O0FBRUEsSUFBTSxXQUFXLGdCQUFNLFFBQXZCOztBQUVBO0FBUEE7OztBQVFBLElBQU0sb0JBQW9CLFNBQXBCLGlCQUFvQixDQUFDLEVBQUQsRUFBSyxrQkFBTCxFQUF5QixhQUF6QixFQUEyQztBQUNqRSxRQUFJLGdCQUFKO0FBQ0EsUUFBSSxlQUFKO0FBQ0EsUUFBSSxnQkFBTSxNQUFOLENBQWEsRUFBYixDQUFKLEVBQXNCO0FBQ2xCLGtCQUFVLFNBQVMsRUFBVCxDQUFWO0FBQ0EsaUJBQVMsZ0JBQU0sa0JBQU4sQ0FBeUIsRUFBekIsQ0FBVDtBQUNILEtBSEQsTUFJSyxJQUFJLGdCQUFNLFFBQU4sQ0FBZSxFQUFmLENBQUosRUFBd0I7QUFDekIsWUFBSSxVQUFVLGdCQUFNLFVBQU4sQ0FBaUIsR0FBRyxRQUFILENBQVksSUFBN0IsQ0FBZDtBQUNBLGtCQUFVO0FBQ04sNkJBQWlCLENBRFg7QUFFTiw4QkFBa0IsQ0FGWjtBQUdOLDRCQUFnQixDQUhWO0FBSU4sK0JBQW1CLENBSmI7QUFLTix5QkFBYSxDQUxQO0FBTU4sMEJBQWMsQ0FOUjtBQU9OLHdCQUFZLENBUE47QUFRTiwyQkFBZTtBQVJULFNBQVY7QUFVQSxpQkFBUztBQUNMLGtCQUFNLENBREQ7QUFFTCxpQkFBSyxDQUZBO0FBR0wsbUJBQU8sUUFBUSxLQUhWO0FBSUwsb0JBQVEsUUFBUTtBQUpYLFNBQVQ7QUFNSCxLQWxCSSxNQW1CQTtBQUNELGVBQU8sS0FBUDtBQUNIO0FBQ0Q7QUFDQSxRQUFJLE1BQU0sV0FBVyxRQUFRLGVBQW5CLEVBQW9DLEVBQXBDLENBQVY7QUFDQSxRQUFJLE1BQU0sV0FBVyxRQUFRLGdCQUFuQixFQUFxQyxFQUFyQyxDQUFWO0FBQ0EsUUFBSSxNQUFNLFdBQVcsUUFBUSxjQUFuQixFQUFtQyxFQUFuQyxDQUFWO0FBQ0EsUUFBSSxNQUFNLFdBQVcsUUFBUSxpQkFBbkIsRUFBc0MsRUFBdEMsQ0FBVjtBQUNBLFFBQUksTUFBTSxNQUFNLFdBQVcsUUFBUSxXQUFuQixFQUFnQyxFQUFoQyxDQUFoQjtBQUNBLFFBQUksTUFBTSxNQUFNLFdBQVcsUUFBUSxZQUFuQixFQUFpQyxFQUFqQyxDQUFoQjtBQUNBLFFBQUksTUFBTSxNQUFNLFdBQVcsUUFBUSxVQUFuQixFQUErQixFQUEvQixDQUFoQjtBQUNBLFFBQUksTUFBTSxNQUFNLFdBQVcsUUFBUSxhQUFuQixFQUFrQyxFQUFsQyxDQUFoQjs7QUFFQSxRQUFJLFNBQVMsQ0FBYjtBQUNBLFFBQUksT0FBTyxDQUFYO0FBQ0EsUUFBSSxTQUFTLENBQWI7QUFDQSxRQUFJLE9BQU8sQ0FBWDtBQUNBO0FBQ0EsUUFBSSxrQkFBa0IsVUFBdEIsRUFBa0M7QUFDOUIsaUJBQVMsT0FBTyxJQUFQLEdBQWMsbUJBQW1CLElBQWpDLEdBQXdDLEdBQWpEO0FBQ0EsZUFBTyxTQUFTLE9BQU8sS0FBaEIsR0FBd0IsR0FBeEIsR0FBOEIsR0FBckM7QUFDQSxpQkFBUyxPQUFPLEdBQVAsR0FBYSxtQkFBbUIsR0FBaEMsR0FBc0MsR0FBL0M7QUFDQSxlQUFPLFNBQVMsT0FBTyxNQUFoQixHQUF5QixHQUF6QixHQUErQixHQUF0QztBQUNILEtBTEQsTUFNSztBQUNELGlCQUFTLE9BQU8sSUFBUCxHQUFjLG1CQUFtQixJQUFqQyxHQUF3QyxHQUFqRDtBQUNBLGVBQU8sU0FBUyxPQUFPLEtBQWhCLEdBQXdCLEdBQXhCLEdBQThCLEdBQXJDO0FBQ0EsaUJBQVMsT0FBTyxHQUFQLEdBQWEsbUJBQW1CLEdBQWhDLEdBQXNDLEdBQS9DO0FBQ0EsZUFBTyxTQUFTLE9BQU8sTUFBaEIsR0FBeUIsR0FBekIsR0FBK0IsR0FBdEM7QUFDSDtBQUNELFFBQUksUUFBUTtBQUNSLFdBQUcsQ0FBQyxNQUFELEVBQVMsSUFBVCxDQURLO0FBRVIsV0FBRyxDQUFDLE1BQUQsRUFBUyxJQUFUO0FBRkssS0FBWjtBQUlBLFdBQU8sS0FBUDtBQUNILENBN0REOztrQkErRGU7QUFDWDtBQURXLEM7Ozs7Ozs7OztBQ3BFZjs7SUFFTSxXOzs7Ozs7Ozs7O2lDQUNRO0FBQ04sbUJBQU8sS0FBUDtBQUNIOzs7cUJBUkw7Ozs7O0lBV00sYTs7Ozs7Ozs7OztpQ0FDUTtBQUNOLG1CQUFPLEtBQVA7QUFDSDs7Ozs7a0JBR1UsRUFBQyx3QkFBRCxFQUFjLDRCQUFkLEU7Ozs7Ozs7OztBQ2RmOzs7O0lBRU0sVzs7Ozs7Ozs7Ozs7Ozs7eU5BTUYsVSxHQUFhLFlBQU07QUFDZixnQkFBSSxRQUFRLE1BQUssS0FBakI7QUFEZSxnQkFFVixTQUZVLEdBRUcsS0FGSCxDQUVWLFNBRlU7O0FBR2YsZ0JBQUksUUFBUTtBQUNSLHVCQUFPLE1BQU0sS0FETDtBQUVSLHdCQUFRLE1BQU0sTUFGTjtBQUdSLHNCQUFNLENBQUMsV0FBVyxVQUFVLElBQVYsSUFBa0IsQ0FBN0IsRUFBZ0MsRUFBaEMsQ0FBRCxHQUF1QyxXQUFXLE1BQU0sSUFBTixJQUFjLENBQXpCLEVBQTRCLEVBQTVCLENBQXZDLEdBQXlFLElBSHZFO0FBSVIscUJBQUssQ0FBQyxXQUFXLFVBQVUsR0FBVixJQUFpQixDQUE1QixFQUErQixFQUEvQixDQUFELEdBQXNDLFdBQVcsTUFBTSxHQUFOLElBQWEsQ0FBeEIsRUFBMkIsRUFBM0IsQ0FBdEMsR0FBdUU7QUFKcEUsYUFBWjs7QUFPQSxtQkFBTyxLQUFQO0FBQ0gsUzs7Ozs7aUNBRVM7QUFDTixnQkFBSSxRQUFRLEtBQUssVUFBTCxFQUFaO0FBQ0EsbUJBQ0ksdUNBQUssV0FBVSxPQUFmLEVBQXVCLE9BQU8sS0FBOUIsR0FESjtBQUdIOzs7cUJBN0JMOzs7OztBQUtNLFcsQ0FDSyxZLEdBQWU7QUFDbEIsVUFBTSxDQURZO0FBRWxCLFNBQUs7QUFGYSxDO2tCQTBCWCxXOzs7Ozs7OztBQ2hDZixJQUFNLFFBQVE7QUFDVixVQURVLGtCQUNGLEdBREUsRUFDRztBQUNULFlBQUksU0FBUyxXQUFXLEdBQVgsRUFBZ0IsRUFBaEIsQ0FBYjtBQUNBLFlBQUksQ0FBQyxNQUFNLE1BQU4sQ0FBTCxFQUFvQjtBQUNoQixtQkFBTyxNQUFQO0FBQ0g7QUFDRCxlQUFPLENBQVA7QUFDSCxLQVBTO0FBUVYsb0JBUlUsNEJBUVEsRUFSUixFQVFZO0FBQ2xCLFlBQUksT0FBTyxDQUFDLEtBQUssR0FBRyxhQUFSLEdBQXdCLFFBQXpCLEVBQW1DLE1BQW5DLENBQVg7QUFDQSxlQUFPO0FBQ0gsb0JBQVEsS0FBSyxZQURWO0FBRUgsbUJBQU8sS0FBSztBQUZULFNBQVA7QUFJSCxLQWRTO0FBZVYsY0FmVSxzQkFlRSxFQWZGLEVBZU07QUFDWixZQUFJLE9BQU8sQ0FBQyxLQUFLLEdBQUcsYUFBUixHQUF3QixRQUF6QixFQUFtQyxpQkFBbkMsQ0FBWDtBQUNBLGVBQU87QUFDSCxvQkFBUSxLQUFLLFlBRFY7QUFFSCxtQkFBTyxLQUFLO0FBRlQsU0FBUDtBQUlILEtBckJTO0FBc0JWLFlBdEJVLG9CQXNCQSxFQXRCQSxFQXNCdUI7QUFBQSxZQUFuQixTQUFtQix5REFBUCxLQUFPOztBQUM3QixZQUFJLGNBQUo7QUFDQSxZQUFJLEdBQUcsWUFBUCxFQUFxQjtBQUNqQixvQkFBUSxHQUFHLFlBQVg7QUFDSCxTQUZELE1BR0s7QUFDRCxvQkFBUSxPQUFPLGdCQUFQLENBQXdCLEVBQXhCLEVBQTRCLElBQTVCLENBQVI7QUFDSDtBQUNELGVBQU8sWUFBWSxNQUFNLFNBQU4sQ0FBWixHQUErQixLQUF0QztBQUNILEtBL0JTO0FBZ0NWLFVBaENVLGtCQWdDRixFQWhDRSxFQWdDRTtBQUNSLGVBQU8sQ0FBQyxFQUFFLE1BQU0sR0FBRyxRQUFILEtBQWdCLENBQXhCLENBQVI7QUFDSCxLQWxDUztBQW1DVixTQW5DVSxtQkFtQ3dCO0FBQUEsWUFBM0IsT0FBMkIseURBQWpCLEVBQWlCO0FBQUEsWUFBYixNQUFhLHlEQUFKLEVBQUk7O0FBQzlCLGFBQUssSUFBSSxDQUFULElBQWMsTUFBZCxFQUFzQjtBQUNsQixnQkFBSSxPQUFPLGNBQVAsQ0FBc0IsQ0FBdEIsQ0FBSixFQUE4QjtBQUMxQix3QkFBUSxDQUFSLElBQWEsT0FBTyxDQUFQLENBQWI7QUFDSDtBQUNKOztBQUVELGVBQU8sT0FBUDtBQUNILEtBM0NTO0FBNkNWLFdBN0NVLG1CQTZDRCxJQTdDQyxFQTZDSztBQUNYLGVBQU8sZ0JBQWdCLEtBQXZCO0FBQ0gsS0EvQ1M7QUFpRFYsWUFqRFUsb0JBaURBLElBakRBLEVBaURNO0FBQ1osZUFBTyxnQkFBZ0IsTUFBdkI7QUFDSCxLQW5EUztBQXFEVixZQXJEVSxvQkFxREEsSUFyREEsRUFxRE07QUFDWixlQUFPLEVBQUUsUUFBUyxLQUFLLFdBQUwsQ0FBaUIsUUFBakIsR0FBNEIsT0FBNUIsQ0FBb0MsUUFBcEMsTUFBa0QsQ0FBQyxDQUE5RCxDQUFQO0FBQ0gsS0F2RFM7QUF5RFYsYUF6RFUscUJBeURDLENBekRELEVBeURJO0FBQ1YsZUFBTztBQUNILGVBQUcsRUFBRSxLQURGO0FBRUgsZUFBRyxFQUFFO0FBRkYsU0FBUDtBQUlILEtBOURTO0FBZ0VWLGdCQWhFVSx3QkFnRUksRUFoRUosRUFnRVE7QUFDZCxZQUFJLEVBQUosRUFBUTtBQUNKLG1CQUFPO0FBQ0gscUJBQUssR0FBRyxTQURMO0FBRUgsc0JBQU0sR0FBRztBQUZOLGFBQVA7QUFJSDtBQUNELGVBQU87QUFDSCxpQkFBSyxLQUFLLEdBQUwsQ0FBUyxPQUFPLFdBQVAsSUFBc0IsQ0FBL0IsRUFBa0MsU0FBUyxJQUFULENBQWMsU0FBZCxJQUEyQixTQUFTLGVBQVQsQ0FBeUIsU0FBdEYsQ0FERjtBQUVILGtCQUFNLEtBQUssR0FBTCxDQUFTLE9BQU8sV0FBUCxJQUFzQixDQUEvQixFQUFrQyxTQUFTLElBQVQsQ0FBYyxVQUFkLElBQTRCLFNBQVMsZUFBVCxDQUF5QixVQUF2RjtBQUZILFNBQVA7QUFJSCxLQTNFUztBQTZFVixrQkE3RVUsMEJBNkVNLEVBN0VOLEVBNkVVO0FBQ2hCLFlBQUksR0FBRyxxQkFBUCxFQUE4QjtBQUMxQixtQkFBTyxHQUFHLHFCQUFILEVBQVA7QUFDSDs7QUFFRCxZQUFJLGVBQWUsS0FBSyxZQUFMLEVBQW5CO0FBQ0EsZUFBTztBQUNILGlCQUFLLEdBQUcsU0FBSCxHQUFlLGFBQWEsR0FEOUI7QUFFSCxrQkFBTSxHQUFHLFVBQUgsR0FBZ0IsYUFBYSxJQUZoQztBQUdILG1CQUFPLEdBQUcsV0FIUDtBQUlILG9CQUFRLEdBQUc7QUFKUixTQUFQO0FBTUgsS0F6RlM7QUEyRlYsc0JBM0ZVLDhCQTJGVSxFQTNGVixFQTJGYztBQUNwQixZQUFJLGVBQWUsS0FBSyxZQUFMLEVBQW5CO0FBQ0EsWUFBSSxZQUFZLEdBQUcscUJBQUgsRUFBaEI7O0FBRUEsZUFBTztBQUNILGlCQUFLLFVBQVUsR0FBVixHQUFnQixhQUFhLEdBRC9CO0FBRUgsa0JBQU0sVUFBVSxJQUFWLEdBQWlCLGFBQWEsSUFGakM7QUFHSCxtQkFBTyxHQUFHLFdBSFA7QUFJSCxvQkFBUSxHQUFHO0FBSlIsU0FBUDtBQU1ILEtBckdTO0FBdUdWLFlBdkdVLG9CQXVHQSxFQXZHQSxFQXVHSSxRQXZHSixFQXVHYztBQUNwQixZQUFJLEdBQUcsU0FBUCxFQUFrQjtBQUNkLGVBQUcsU0FBSCxDQUFhLEdBQWIsQ0FBaUIsUUFBakI7QUFDSCxTQUZELE1BR0s7QUFDRCxnQkFBSSxXQUFXLEdBQUcsU0FBSCxDQUFhLE9BQWIsQ0FBcUIsU0FBckIsRUFBZ0MsR0FBaEMsRUFBcUMsS0FBckMsQ0FBMkMsR0FBM0MsQ0FBZjtBQUNBLGdCQUFJLFNBQVMsT0FBVCxDQUFpQixRQUFqQixNQUErQixDQUFDLENBQXBDLEVBQXVDO0FBQ25DLHlCQUFTLElBQVQsQ0FBYyxRQUFkO0FBQ0EsbUJBQUcsU0FBSCxHQUFlLFNBQVMsSUFBVCxDQUFjLEdBQWQsQ0FBZjtBQUNIO0FBQ0o7QUFDRCxlQUFPLEVBQVA7QUFDSCxLQW5IUztBQXFIVixlQXJIVSx1QkFxSEcsRUFySEgsRUFxSE8sUUFySFAsRUFxSGlCO0FBQ3ZCLFlBQUksR0FBRyxTQUFQLEVBQWtCO0FBQ2QsZUFBRyxTQUFILENBQWEsTUFBYixDQUFvQixRQUFwQjtBQUNILFNBRkQsTUFHSztBQUNELGdCQUFJLFdBQVcsR0FBRyxTQUFILENBQWEsT0FBYixDQUFxQixTQUFyQixFQUFnQyxHQUFoQyxFQUFxQyxLQUFyQyxDQUEyQyxHQUEzQyxDQUFmO0FBQ0EsZ0JBQUksUUFBUSxTQUFTLE9BQVQsQ0FBaUIsUUFBakIsQ0FBWjtBQUNBLGdCQUFJLFVBQVUsQ0FBQyxDQUFmLEVBQWtCO0FBQ2QseUJBQVMsTUFBVCxDQUFnQixLQUFoQixFQUF1QixDQUF2QjtBQUNBLG1CQUFHLFNBQUgsR0FBZSxTQUFTLElBQVQsQ0FBYyxHQUFkLENBQWY7QUFDSDtBQUNKO0FBQ0QsZUFBTyxFQUFQO0FBQ0gsS0FsSVM7QUFvSVYsWUFwSVUsb0JBb0lBLEVBcElBLEVBb0lJLE9BcElKLEVBb0lhLEdBcEliLEVBb0lrQjtBQUN4QixZQUFJLEVBQUosRUFBUTtBQUNKLG9CQUFRLElBQVI7QUFDSSxxQkFBSyxDQUFDLENBQUMsR0FBRyxnQkFBVjtBQUNJLHVCQUFHLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLEdBQTdCLEVBQWtDLEtBQWxDO0FBQ0E7QUFDSixxQkFBSyxDQUFDLENBQUMsR0FBRyxXQUFWO0FBQ0ksdUJBQUcsV0FBSCxDQUFlLE9BQWYsRUFBd0IsR0FBeEI7QUFDQTtBQUNKO0FBQ0ksdUJBQUcsT0FBTyxPQUFWLElBQXFCLEdBQXJCO0FBUlI7QUFVSDtBQUNELGVBQU8sRUFBUDtBQUNILEtBbEpTO0FBb0pWLGVBcEpVLHVCQW9KRyxFQXBKSCxFQW9KTyxPQXBKUCxFQW9KZ0IsR0FwSmhCLEVBb0pxQjtBQUMzQixZQUFJLEVBQUosRUFBUTtBQUNKLG9CQUFRLElBQVI7QUFDSSxxQkFBSyxDQUFDLENBQUMsR0FBRyxtQkFBVjtBQUNJLHVCQUFHLG1CQUFILENBQXVCLE9BQXZCLEVBQWdDLEdBQWhDLEVBQXFDLEtBQXJDO0FBQ0E7QUFDSixxQkFBSyxDQUFDLENBQUMsR0FBRyxXQUFWO0FBQ0ksdUJBQUcsV0FBSCxDQUFlLE9BQWYsRUFBd0IsR0FBeEI7QUFDQTtBQUNKO0FBQ0ksdUJBQUcsT0FBTyxPQUFWLElBQXFCLElBQXJCO0FBUlI7QUFVSDtBQUNELGVBQU8sRUFBUDtBQUNILEtBbEtTO0FBb0tWLFVBcEtVLG9CQW9LUTtBQUFBLFlBQVYsR0FBVSx5REFBSixFQUFJOztBQUNkLFlBQUksU0FBUyxFQUFiO0FBQ0EsZUFBTyxPQUFPLE1BQVAsR0FBZ0IsR0FBdkIsRUFBNEIsVUFBVSxLQUFLLE1BQUwsR0FBYyxRQUFkLENBQXVCLEVBQXZCLEVBQTJCLE1BQTNCLENBQWtDLENBQWxDLENBQXRDO0FBQ0EsZUFBTyxPQUFPLE1BQVAsQ0FBYyxDQUFkLEVBQWlCLEdBQWpCLENBQVA7QUFDSCxLQXhLUztBQTBLVixjQTFLVSx3QkEwS2dCO0FBQUEsWUFBZCxNQUFjLHlEQUFMLEdBQUs7O0FBQ3RCLFlBQUksU0FBUyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsS0FBZixDQUFxQixTQUFyQixDQUFiO0FBQ0EsZUFBTyxPQUFQLENBQWUsTUFBZjtBQUNBLGVBQU8sT0FBTyxJQUFQLENBQVksR0FBWixDQUFQO0FBQ0g7QUE5S1MsQ0FBZDs7a0JBaUxlLEs7Ozs7Ozs7OztBQzlLZjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0lBRU8sVyxxQkFBQSxXLEVBVFA7Ozs7SUFTb0IsYSxxQkFBQSxhOztBQUNwQixJQUFNLG1CQUFtQjtBQUNyQixjQUFVLElBRFc7QUFFckIsY0FBVSxJQUZXO0FBR3JCLFdBQU87QUFIYyxDQUF6QjtJQUtPLFEsbUJBQUEsUTs7O0FBRVAsSUFBTSxjQUFjLFNBQWQsV0FBYyxHQUF1QztBQUFBLFFBQXRDLFdBQXNDLHlEQUF4QixFQUF3QjtBQUFBLFFBQXBCLFVBQW9CLHlEQUFQLEVBQU87O0FBQ3ZELFFBQUksUUFBUSxFQUFaO0FBQ0EsUUFBSSxXQUFXLElBQWYsRUFBcUI7QUFBQSxZQUNaLElBRFksR0FDQyxXQURELENBQ1osSUFEWTtBQUFBLFlBQ04sR0FETSxHQUNDLFdBREQsQ0FDTixHQURNOztBQUVqQixZQUFJLFFBQVEsU0FBUyxDQUFyQixFQUF3QjtBQUNwQixrQkFBTSxJQUFOLEdBQWEsQ0FBQyxRQUFRLENBQVQsSUFBYyxJQUEzQjtBQUNIO0FBQ0QsWUFBSSxPQUFPLFFBQVEsQ0FBbkIsRUFBc0I7QUFDbEIsa0JBQU0sR0FBTixHQUFZLENBQUMsT0FBTyxDQUFSLElBQWEsSUFBekI7QUFDSDtBQUNKO0FBQ0QsUUFBSSxXQUFXLE1BQWYsRUFBdUI7QUFBQSxZQUNkLEtBRGMsR0FDRyxXQURILENBQ2QsS0FEYztBQUFBLFlBQ1AsTUFETyxHQUNHLFdBREgsQ0FDUCxNQURPOztBQUVuQixZQUFJLFNBQVMsVUFBVSxDQUF2QixFQUEwQjtBQUN0QixrQkFBTSxLQUFOLEdBQWMsQ0FBQyxTQUFTLENBQVYsSUFBZSxJQUE3QjtBQUNIO0FBQ0QsWUFBSSxVQUFVLFdBQVcsQ0FBekIsRUFBNEI7QUFDeEIsa0JBQU0sTUFBTixHQUFlLENBQUMsVUFBVSxDQUFYLElBQWdCLElBQS9CO0FBQ0g7QUFDSjtBQUNELFdBQU8sS0FBUDtBQUNILENBckJEOztJQXVCTSxVOzs7QUFDRix3QkFBYSxLQUFiLEVBQW9CO0FBQUE7O0FBRWhCO0FBRmdCLDhHQUNWLEtBRFU7O0FBQUE7O0FBR2hCLGNBQUssb0JBQUwsR0FBNEIsVUFBNUI7QUFDQTtBQUNBLGNBQUssWUFBTCxHQUFvQixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQUFwQjtBQUNBO0FBQ0EsY0FBSyxlQUFMLEdBQXVCLEVBQUMsTUFBTSxDQUFQLEVBQVUsS0FBSyxDQUFmLEVBQWtCLE9BQU8sQ0FBekIsRUFBNEIsUUFBUSxDQUFwQyxFQUF2QjtBQUNBO0FBQ0EsY0FBSyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsY0FBSyxnQkFBTCxHQUF3QixFQUF4QjtBQUNBLGNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxjQUFLLE1BQUwsR0FBYyxFQUFkO0FBQ0E7QUFDQSxjQUFLLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0E7QUFDQSxjQUFLLE9BQUwsR0FBZSxLQUFmO0FBQ0EsY0FBSyxPQUFMLEdBQWUsS0FBZjtBQUNBLGNBQUssT0FBTCxHQUFlLEtBQWY7QUFDQSxjQUFLLE9BQUwsR0FBZSxLQUFmO0FBQ0EsY0FBSyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0EsY0FBSyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0E7QUFDQSxjQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsY0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGNBQUssTUFBTCxHQUFjLElBQWQ7QUFDQTtBQUNBLGNBQUssTUFBTCxHQUFjLEtBQWQ7QUFDQSxjQUFLLE1BQUwsR0FBYyxLQUFkO0FBQ0E7QUFDQSxjQUFLLFdBQUwsR0FBbUIsSUFBbkI7QUFDQTtBQUNBLGNBQUssUUFBTCxHQUFnQixJQUFoQjtBQUNBO0FBQ0EsY0FBSyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsY0FBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLGNBQUssV0FBTCxHQUFtQixJQUFuQjtBQUNBLGNBQUssbUJBQUwsR0FBMkIsS0FBM0I7QUFDQTtBQUNBLGNBQUssWUFBTCxHQUFvQixLQUFwQjtBQUNBLGNBQUssYUFBTCxHQUFxQixFQUFyQjtBQXhDZ0I7QUF5Q25COzs7OzZDQWdEcUI7QUFDbEIsaUJBQUssV0FBTDtBQUNBLGlCQUFLLFNBQUw7QUFDQSxpQkFBSyxjQUFMO0FBQ0g7Ozs0Q0FFb0I7QUFBQTs7QUFDakIsaUJBQUssb0JBQUwsR0FBNEIsS0FBSyxvQkFBTCxFQUE1QjtBQUNBLGlCQUFLLGNBQUwsQ0FBb0IsS0FBSyxLQUF6QixFQUFnQyxZQUFNO0FBQ2xDLHVCQUFLLGVBQUwsQ0FBcUIsSUFBckI7QUFDQSx1QkFBSyxVQUFMO0FBQ0gsYUFIRDtBQUlBLGlCQUFLLGdCQUFMO0FBQ0EsaUJBQUssVUFBTDtBQUNIOzs7K0NBRXVCO0FBQ3BCLGlCQUFLLFVBQUw7QUFDSDs7O2tEQUUwQixTLEVBQVc7QUFBQTs7QUFDbEMsaUJBQUssbUJBQUwsR0FBMkIsSUFBM0I7QUFDQSxpQkFBSyxVQUFMO0FBQ0EsaUJBQUssb0JBQUwsR0FBNEIsS0FBSyxvQkFBTCxDQUEwQixTQUExQixDQUE1QjtBQUNBLGlCQUFLLFdBQUwsQ0FBaUIsU0FBakI7QUFDQSxpQkFBSyxTQUFMLENBQWUsU0FBZjtBQUNBLGlCQUFLLGNBQUwsQ0FBb0IsU0FBcEI7QUFDQSxpQkFBSyxnQkFBTCxDQUFzQixTQUF0QjtBQUNBLGlCQUFLLFVBQUw7QUFDQSxpQkFBSyxjQUFMLENBQW9CLFNBQXBCLEVBQStCLFlBQU07QUFDakMsdUJBQUssZUFBTCxDQUFxQixJQUFyQjtBQUNILGFBRkQ7QUFHSDs7QUFtQkQ7OztBQVlBOzs7QUE4RUE7OztBQXNCQTs7O0FBUUE7OztBQWdDQTs7O0FBcUJBOzs7QUFtQ0E7OztBQWdIQTs7O0FBd0RBO0FBQ0E7OztBQUdBOzs7QUFLQTs7O0FBS0E7OztBQWlCQTs7O0FBc0JBOzs7QUFzQkE7OztBQXVCQTs7O0FBV0E7OztBQWlGQTs7O0FBdUZBOzs7O2lDQThEVTtBQUFBLHlCQUNxQixLQUFLLEtBRDFCO0FBQUEsZ0JBQ0QsVUFEQyxVQUNELFVBREM7QUFBQSxnQkFDVyxNQURYLFVBQ1csTUFEWDs7QUFFTixnQkFBSSxjQUFjLEtBQWxCO0FBQ0EsZ0JBQUksYUFBYSxFQUFqQjtBQUNBO0FBQ0EsZ0JBQUksS0FBSyxNQUFMLENBQVksSUFBWixLQUFxQixNQUF6QixFQUFpQztBQUM3QiwyQkFBVyxXQUFYLEdBQXlCLEtBQUssZUFBOUI7QUFDSDtBQUNEO0FBQ0EsZ0JBQUksS0FBSyxLQUFMLENBQVcsaUJBQVgsSUFBZ0MsV0FBVyxNQUEvQyxFQUF1RDtBQUNuRCxvQkFBSSxrQkFBa0IsS0FBSyxpQkFBTCxDQUF1QixLQUFLLEtBQTVCLEVBQW1DLEtBQUssZ0JBQXhDLENBQXRCO0FBQ0EsOEJBQ0ksOEVBQWlCLFVBQWpCLElBQTZCLFdBQVcsZUFBeEMsSUFESjtBQUdBLDZCQUFhLGVBQWI7QUFDSDs7QUFFRCxtQkFDSTtBQUFBO0FBQUE7QUFDSSwrQkFBVSxXQURkO0FBRUkseUJBQUssS0FBSyxZQUZkO0FBR0ksMkJBQU87QUFIWCxtQkFJUSxVQUpSO0FBS0sscUJBQUssWUFBTCxFQUxMO0FBTUs7QUFOTCxhQURKO0FBVUg7Ozs7O0FBbjNCQyxVLENBa0RLLFMsR0FBWTtBQUNmO0FBQ0EsaUJBQWEsaUJBQVUsU0FBVixDQUFvQixDQUFDLGlCQUFVLElBQVgsRUFBaUIsaUJBQVUsTUFBM0IsRUFBbUMsaUJBQVUsT0FBN0MsQ0FBcEIsQ0FGRTtBQUdmLG1CQUFlLGlCQUFVLFNBQVYsQ0FBb0IsQ0FBQyxpQkFBVSxJQUFYLEVBQWlCLGlCQUFVLE1BQTNCLEVBQW1DLGlCQUFVLE9BQTdDLENBQXBCLENBSEE7QUFJZjtBQUNBLGNBQVUsaUJBQVUsTUFMTDtBQU1mO0FBQ0E7QUFDQSxXQUFPLGlCQUFVLFNBQVYsQ0FBb0IsQ0FBQyxpQkFBVSxJQUFYLEVBQWlCLGlCQUFVLE1BQTNCLENBQXBCLENBUlE7QUFTZjtBQUNBLFVBQU0saUJBQVUsT0FBVixDQUFrQixpQkFBVSxNQUE1QixDQVZTO0FBV2Y7QUFDQSxZQUFRLGlCQUFVLFNBQVYsQ0FBb0IsQ0FBQyxpQkFBVSxJQUFYLEVBQWlCLGlCQUFVLE1BQTNCLEVBQW1DLGlCQUFVLE1BQTdDLENBQXBCLENBWk87QUFhZixlQUFXLGlCQUFVLE1BYk47QUFjZjtBQUNBLGVBQVcsaUJBQVUsU0FBVixDQUFvQixDQUFDLGlCQUFVLElBQVgsRUFBaUIsaUJBQVUsSUFBM0IsQ0FBcEIsQ0FmSTtBQWdCZjtBQUNBLHVCQUFtQixpQkFBVSxJQWpCZDtBQWtCZjtBQUNBLG1CQUFlLGlCQUFVLElBbkJWO0FBb0JmO0FBQ0EsaUJBQWEsaUJBQVUsSUFyQlI7QUFzQmY7QUFDQSxhQUFTLGlCQUFVLElBdkJKO0FBd0JmLGVBQVcsaUJBQVUsSUF4Qk47QUF5QmYsV0FBTyxpQkFBVTtBQXpCRixDO0FBbERqQixVLENBOEVLLFksR0FBZTtBQUNsQixZQUFRLEtBRFU7QUFFbEIsY0FBVSxFQUZRO0FBR2xCLFVBQU0sRUFIWTtBQUlsQixpQkFBYSxJQUpLO0FBS2xCLHVCQUFtQixLQUxEO0FBTWxCLGFBQVMsRUFBQyxNQUFNLElBQVAsRUFBYSxRQUFRLElBQXJCLEVBTlM7QUFPbEIsV0FQa0IscUJBT1AsQ0FBRSxDQVBLO0FBUWxCLGFBUmtCLHVCQVFMLENBQUUsQ0FSRztBQVNsQixTQVRrQixtQkFTVCxDQUFFO0FBVE8sQzs7Ozs7U0FsQ3RCLEssR0FBUTtBQUNKLGdCQUFRLE1BREo7QUFFSixxQkFBYSxFQUZUO0FBR0osZUFBTztBQUhILEs7O1NBZ0ZSLFUsR0FBYSxZQUFNO0FBQ2YsWUFBSSxPQUFLLE1BQUwsQ0FBWSxJQUFoQixFQUFzQjtBQUNsQiw0QkFBTSxXQUFOLENBQWtCLE9BQUssSUFBTCxDQUFVLGFBQTVCLEVBQTJDLFdBQTNDLEVBQXdELE9BQUssZ0JBQTdEO0FBQ0EsNEJBQU0sV0FBTixDQUFrQixPQUFLLElBQUwsQ0FBVSxhQUE1QixFQUEyQyxTQUEzQyxFQUFzRCxPQUFLLGFBQTNEO0FBQ0g7QUFDRCxZQUFJLE9BQUssTUFBTCxDQUFZLE1BQWhCLEVBQXdCO0FBQ3BCLDRCQUFNLFdBQU4sQ0FBa0IsT0FBSyxJQUFMLENBQVUsYUFBNUIsRUFBMkMsV0FBM0MsRUFBd0QsT0FBSyxrQkFBN0Q7QUFDQSw0QkFBTSxXQUFOLENBQWtCLE9BQUssSUFBTCxDQUFVLGFBQTVCLEVBQTJDLFNBQTNDLEVBQXNELE9BQUssZUFBM0Q7QUFDSDtBQUNELGVBQUssUUFBTCxJQUFpQixhQUFhLE9BQUssUUFBbEIsQ0FBakI7QUFDQSxlQUFLLFFBQUwsR0FBZ0IsSUFBaEI7QUFDSCxLOztTQUVELFksR0FBZSxVQUFDLElBQUQsRUFBVTtBQUNyQixlQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0gsSzs7U0FHRCxhLEdBQWdCLFVBQUMsR0FBRCxFQUFTO0FBQ3JCLGVBQUssV0FBTCxHQUFtQixPQUFLLGdCQUF4QjtBQUNBLFlBQUksYUFBYSxPQUFLLGlCQUFMLENBQXVCLE9BQUssS0FBNUIsQ0FBakI7QUFDQSxlQUFLLFFBQUwsQ0FBYztBQUNWLGtDQURVO0FBRVYsb0JBQVE7QUFGRSxTQUFkLEVBR0csWUFBTTtBQUNMLG1CQUFPLEtBQVA7QUFDSCxTQUxEO0FBTUgsSzs7U0FHRCxlLEdBQWtCLFlBQW1CO0FBQUEsWUFBbEIsS0FBa0IseURBQVYsS0FBVTs7QUFDakMsWUFBSSxTQUFTLE9BQUssbUJBQWxCLEVBQXVDO0FBQ25DLG1CQUFLLFdBQUwsR0FBbUIsT0FBSyxlQUFMLEVBQW5CO0FBQ0E7QUFDQSxtQkFBSyxnQkFBTCw0QkFBNEIsT0FBSyxXQUFqQztBQUNBLG1CQUFLLG1CQUFMLEdBQTJCLEtBQTNCO0FBQ0EsbUJBQU8sSUFBUDtBQUNIO0FBQ0QsZUFBTyxLQUFQO0FBQ0gsSzs7U0FFRCxjLEdBQWlCLFlBQTZCO0FBQUEsWUFBNUIsS0FBNEIseURBQXBCLE9BQUssS0FBZTtBQUFBLFlBQVIsR0FBUTs7QUFDMUMsWUFBSSxxQ0FBaUIsTUFBTSxLQUFOLElBQWUsRUFBaEMsQ0FBSjtBQUNBLGtCQUFVLFFBQVYsR0FBcUIsT0FBSyxvQkFBMUI7QUFDQSxZQUFJLFVBQVUsUUFBVixLQUF1QixVQUEzQixFQUF1QztBQUNuQyxnQkFBSSxNQUFNLE9BQU4sQ0FBYyxJQUFsQixFQUF3QjtBQUNwQixvQkFBSSxPQUFPLFVBQVUsR0FBakIsS0FBeUIsV0FBN0IsRUFBMEM7QUFDdEMsOEJBQVUsR0FBVixHQUFnQixPQUFLLElBQUwsQ0FBVSxTQUFWLEdBQXNCLElBQXRDO0FBQ0g7QUFDRCxvQkFBSSxPQUFPLFVBQVUsSUFBakIsS0FBMEIsV0FBOUIsRUFBMkM7QUFDdkMsOEJBQVUsSUFBVixHQUFpQixPQUFLLElBQUwsQ0FBVSxVQUFWLEdBQXVCLElBQXhDO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsWUFBSSxVQUFVLFFBQVYsS0FBdUIsT0FBM0IsRUFBb0M7QUFDaEMsbUJBQUssUUFBTCxHQUFnQixNQUFNLFdBQXRCO0FBQ0g7QUFDRCxlQUFLLFFBQUwsQ0FBYztBQUNWLHdCQUFZO0FBREYsU0FBZCxFQUVHLFlBQU07QUFDTCxtQkFBTyxLQUFQO0FBQ0gsU0FKRDtBQUtILEs7O1NBRUQsWSxHQUFlLFlBQXdCO0FBQUEsWUFBdkIsS0FBdUIseURBQWYsT0FBSyxLQUFVOztBQUNuQyxlQUFLLGFBQUwsR0FBcUIsRUFBckI7QUFDQSxZQUFNLGNBQWMsTUFBTSxPQUFOLENBQWMsSUFBbEM7QUFDQSxZQUFNLGdCQUFnQixNQUFNLE9BQU4sQ0FBYyxNQUFwQztBQUNBLGVBQU8sZ0JBQU0sUUFBTixDQUFlLEdBQWYsQ0FBbUIsTUFBTSxRQUF6QixFQUFtQyxVQUFDLEtBQUQsRUFBVztBQUNqRCxnQkFBSSxDQUFDLEtBQUQsSUFBVSxDQUFDLE1BQU0sSUFBckIsRUFBMkI7QUFDdkIsdUJBQU8sS0FBUDtBQUNIO0FBQ0Qsb0JBQVEsTUFBTSxJQUFkO0FBQ0kscUJBQUssV0FBTDtBQUNJLHdCQUFJLENBQUMsV0FBRCxJQUFnQixPQUFLLGFBQUwsQ0FBbUIsTUFBbkIsQ0FBcEIsRUFBZ0Q7QUFDNUMsK0JBQU8sS0FBUDtBQUNIO0FBQ0QsMkJBQUssYUFBTCxDQUFtQixNQUFuQixJQUE2QixJQUE3QjtBQUNBLDJCQUNJLDhEQUNTLE1BQU0sS0FBTixJQUFlLEVBRHhCO0FBRUksNkJBQUssYUFBQyxFQUFELEVBQVE7QUFDVCxtQ0FBSyxNQUFMLENBQVksSUFBWixHQUFtQixFQUFuQjtBQUNILHlCQUpMO0FBS0kscUNBQWEsT0FBSyxlQUx0QixJQURKOztBQVNKLHFCQUFLLGFBQUw7QUFDSSx3QkFBSSxDQUFDLGFBQUQsSUFBa0IsT0FBSyxhQUFMLENBQW1CLFFBQW5CLENBQXRCLEVBQW9EO0FBQ2hELCtCQUFPLEtBQVA7QUFDSDtBQUNELDJCQUFLLGFBQUwsQ0FBbUIsUUFBbkIsSUFBK0IsSUFBL0I7QUFDQSwyQkFDSSw4REFDUyxNQUFNLEtBQU4sSUFBZSxFQUR4QjtBQUVJLDZCQUFLLGFBQUMsRUFBRCxFQUFRO0FBQ1QsbUNBQUssTUFBTCxDQUFZLE1BQVosR0FBcUIsRUFBckI7QUFDSCx5QkFKTDtBQUtJLHFDQUFhLE9BQUssaUJBTHRCLElBREo7O0FBU0o7QUFDSSwyQkFBTyxLQUFQO0FBOUJSO0FBZ0NILFNBcENNLENBQVA7QUFxQ0gsSzs7U0FHRCxvQixHQUF1QixZQUF3QjtBQUFBLFlBQXZCLEtBQXVCLHlEQUFmLE9BQUssS0FBVTs7QUFDM0MsWUFBSSxZQUFZLE1BQU0sS0FBTixJQUFlLEVBQS9CO0FBQ0EsWUFBSSxZQUFZLFVBQWhCO0FBQ0EsWUFBSSxhQUFhLFVBQVUsUUFBVixJQUFzQixnQkFBTSxRQUFOLENBQWUsT0FBSyxJQUFwQixFQUEwQixVQUExQixDQUF2QztBQUNBLFlBQUksaUJBQWlCLFVBQWpCLENBQUosRUFBa0M7QUFDOUIsd0JBQVksVUFBWjtBQUNIOztBQUVELGVBQU8sU0FBUDtBQUNILEs7O1NBRUQsZSxHQUFrQixZQUFNO0FBQ3BCLFlBQUksV0FBVyxnQkFBTSxRQUFOLENBQWUsT0FBSyxJQUFwQixDQUFmO0FBQ0EsZUFBTztBQUNILGtCQUFNLGdCQUFNLE1BQU4sQ0FBYSxTQUFTLElBQXRCLENBREg7QUFFSCxpQkFBSyxnQkFBTSxNQUFOLENBQWEsU0FBUyxHQUF0QixDQUZGO0FBR0gsbUJBQU8sZ0JBQU0sTUFBTixDQUFhLFNBQVMsS0FBdEIsQ0FISjtBQUlILG9CQUFRLGdCQUFNLE1BQU4sQ0FBYSxTQUFTLE1BQXRCO0FBSkwsU0FBUDtBQU1ILEs7O1NBR0QsZ0IsR0FBbUIsWUFBd0I7QUFBQSxZQUF2QixLQUF1Qix5REFBZixPQUFLLEtBQVU7QUFBQSxZQUNsQyxRQURrQyxHQUNiLEtBRGEsQ0FDbEMsUUFEa0M7QUFBQSxZQUN4QixPQUR3QixHQUNiLEtBRGEsQ0FDeEIsT0FEd0I7O0FBRXZDLFlBQUksQ0FBQyxPQUFLLGFBQUwsQ0FBbUIsSUFBeEIsRUFBOEI7QUFDMUIsbUJBQUssTUFBTCxDQUFZLElBQVosR0FBb0IsWUFBWSxRQUFRLElBQXJCLEdBQTZCLE1BQTdCLEdBQXNDLElBQXpEO0FBQ0g7QUFDSixLOztTQUdELFcsR0FBYyxZQUF3QjtBQUFBLFlBQXZCLEtBQXVCLHlEQUFmLE9BQUssS0FBVTtBQUFBLFlBQzdCLE1BRDZCLEdBQ25CLEtBRG1CLENBQzdCLE1BRDZCOztBQUVsQyxZQUFJLG9CQUFvQixNQUFwQixxREFBb0IsTUFBcEIsQ0FBSjtBQUNBLGdCQUFRLFVBQVI7QUFDSSxpQkFBSyxTQUFMO0FBQ0ksdUJBQUssT0FBTCxHQUFlLE9BQUssT0FBTCxHQUFlLE9BQUssT0FBTCxHQUFlLE9BQUssT0FBTCxHQUFlLE1BQTVEO0FBQ0E7O0FBRUosaUJBQUssUUFBTDtBQUNJLHlCQUFTLE9BQU8sV0FBUCxFQUFUO0FBQ0EsdUJBQUssT0FBTCxHQUFlLFdBQVcsR0FBMUI7QUFDQSx1QkFBSyxPQUFMLEdBQWUsV0FBVyxHQUExQjtBQUNBLHVCQUFLLE9BQUwsR0FBZSxXQUFXLEdBQTFCO0FBQ0EsdUJBQUssT0FBTCxHQUFlLFdBQVcsR0FBMUI7QUFDQTs7QUFFSjtBQUNJLG9CQUFJLGdCQUFNLFFBQU4sQ0FBZSxNQUFmLENBQUosRUFBNEI7QUFDeEIsMkJBQUssT0FBTCxHQUFlLENBQUMsQ0FBQyxPQUFPLENBQXhCO0FBQ0EsMkJBQUssT0FBTCxHQUFlLENBQUMsQ0FBQyxPQUFPLENBQXhCO0FBQ0EsMkJBQUssT0FBTCxHQUFlLENBQUMsQ0FBQyxPQUFPLENBQXhCO0FBQ0EsMkJBQUssT0FBTCxHQUFlLENBQUMsQ0FBQyxPQUFPLENBQXhCO0FBQ0gsaUJBTEQsTUFNSztBQUNELDJCQUFLLE9BQUwsR0FBZSxPQUFLLE9BQUwsR0FBZSxPQUFLLE9BQUwsR0FBZSxPQUFLLE9BQUwsR0FBZSxLQUE1RDtBQUNIO0FBdEJUO0FBd0JBLGVBQUssWUFBTCxHQUFvQixPQUFLLE9BQUwsSUFBZ0IsT0FBSyxPQUF6QztBQUNBLGVBQUssVUFBTCxHQUFrQixPQUFLLE9BQUwsSUFBZ0IsT0FBSyxPQUF2QztBQUNILEs7O1NBR0QsUyxHQUFZLFlBQXdCO0FBQUEsWUFBdkIsS0FBdUIseURBQWYsT0FBSyxLQUFVO0FBQUEsWUFDM0IsSUFEMkIsR0FDbkIsS0FEbUIsQ0FDM0IsSUFEMkI7O0FBRWhDLFlBQUksSUFBSixFQUFVO0FBQ04sZ0JBQUksT0FBTyxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzFCLHVCQUFLLEtBQUwsR0FBYSxPQUFLLEtBQUwsR0FBYyxPQUFPLENBQVAsR0FBVyxJQUFYLEdBQWtCLEtBQTdDO0FBQ0gsYUFGRCxNQUdLLElBQUksZ0JBQU0sT0FBTixDQUFjLElBQWQsQ0FBSixFQUF5QjtBQUMxQix1QkFBSyxLQUFMLEdBQWEsS0FBSyxDQUFMLEtBQVcsS0FBeEI7QUFDQSx1QkFBSyxLQUFMLEdBQWEsS0FBSyxDQUFMLEtBQVcsS0FBeEI7QUFDSCxhQUhJLE1BSUE7QUFDRCx1QkFBSyxLQUFMLEdBQWEsT0FBSyxLQUFMLEdBQWEsS0FBMUI7QUFDSDtBQUNKLFNBWEQsTUFZSztBQUNELG1CQUFLLEtBQUwsR0FBYSxPQUFLLEtBQUwsR0FBYSxLQUExQjtBQUNIO0FBQ0QsZUFBSyxNQUFMLEdBQWUsT0FBSyxLQUFMLEtBQWUsT0FBSyxLQUFwQixJQUE2QixPQUFLLEtBQUwsS0FBZSxLQUEzRDtBQUNILEs7O1NBR0QsYyxHQUFpQixZQUF3QjtBQUFBLFlBQXZCLEtBQXVCLHlEQUFmLE9BQUssS0FBVTtBQUFBLFlBQ2hDLFNBRGdDLEdBQ25CLEtBRG1CLENBQ2hDLFNBRGdDOztBQUVyQyxZQUFJLFNBQVMsS0FBYjtBQUNBLFlBQUksU0FBUyxLQUFiO0FBQ0EsWUFBSSxTQUFKLEVBQWU7QUFDWCxnQkFBSSxVQUFVLENBQWQsRUFBaUI7QUFBQSw4REFDTSxVQUFVLENBRGhCOztBQUFBLG9CQUNSLElBRFE7QUFBQSxvQkFDRixJQURFOztBQUViLG9CQUFJLE9BQU8sSUFBUCxLQUFnQixRQUFoQixJQUE0QixPQUFPLENBQXZDLEVBQTBDO0FBQ3RDLDJCQUFPLENBQVA7QUFDSDtBQUNELG9CQUFJLE9BQU8sSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUMxQiwyQkFBTyxRQUFQO0FBQ0g7QUFDRCxvQkFBSSxRQUFRLElBQVosRUFBa0I7QUFDZCw2QkFBUyxDQUFDLElBQUQsRUFBTyxJQUFQLENBQVQ7QUFDSDtBQUNKO0FBQ0QsZ0JBQUksVUFBVSxDQUFkLEVBQWlCO0FBQUEsOERBQ00sVUFBVSxDQURoQjs7QUFBQSxvQkFDUixJQURRO0FBQUEsb0JBQ0YsSUFERTs7QUFFYixvQkFBSSxPQUFPLElBQVAsS0FBZ0IsUUFBaEIsSUFBNEIsT0FBTyxDQUF2QyxFQUEwQztBQUN0QywyQkFBTyxDQUFQO0FBQ0g7QUFDRCxvQkFBSSxPQUFPLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDMUIsMkJBQU8sUUFBUDtBQUNIO0FBQ0Qsb0JBQUksUUFBUSxJQUFaLEVBQWtCO0FBQ2QsNkJBQVMsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUFUO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsZUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGVBQUssTUFBTCxHQUFjLE1BQWQ7QUFDSCxLOztTQUdELFUsR0FBYSxZQUF3QjtBQUFBLFlBQXZCLEtBQXVCLHlEQUFmLE9BQUssS0FBVTtBQUFBLFlBQzVCLEtBRDRCLEdBQ25CLEtBRG1CLENBQzVCLEtBRDRCOztBQUVqQyxZQUFJLENBQUMsS0FBRCxJQUFVLENBQUMsT0FBSyxRQUFwQixFQUE4QjtBQUMxQixtQkFBTyxLQUFQO0FBQ0g7QUFDRCxZQUFJLHlCQUFKO0FBQ0EsWUFBSSwyQkFBSjtBQUNBLFlBQUksd0JBQUo7QUFDQSxZQUFJLDBCQUFKO0FBQ0EsZ0JBQVEsSUFBUjtBQUNJLGlCQUFLLFVBQVUsUUFBZjtBQUNJLG9DQUFvQjtBQUFBLDJCQUFPLE9BQUssSUFBTCxDQUFVLFVBQWpCO0FBQUEsaUJBQXBCO0FBQ0E7O0FBRUosaUJBQUssZ0JBQU0sTUFBTixDQUFhLEtBQWIsQ0FBTDtBQUNJLG9CQUFJLENBQUMsTUFBTSxRQUFOLENBQWUsT0FBSyxJQUFwQixDQUFMLEVBQWdDO0FBQzVCO0FBQ0g7QUFDRCxvQ0FBb0I7QUFBQSwyQkFBTyxLQUFQO0FBQUEsaUJBQXBCO0FBQ0E7O0FBRUosaUJBQUssT0FBSyxRQUFWO0FBQ0ksb0NBQW9CLDZCQUFNO0FBQ3RCLDJCQUFPLE1BQVA7QUFDSCxpQkFGRDtBQUdBO0FBaEJSO0FBa0JBLFlBQUksaUJBQUosRUFBdUI7QUFDbkIsOEJBQWtCLDJCQUFNO0FBQ3BCLG9CQUFJLGlCQUFpQixtQkFBckI7QUFDQSxvQkFBSSxVQUFVLE9BQUssV0FBTCxHQUFtQixrQkFDN0IsbUJBQVMsaUJBQVQsQ0FBMkIsY0FBM0IsRUFBMkMsT0FBSyxrQkFBaEQsRUFBb0UsT0FBSyxvQkFBekUsQ0FESjtBQUVBLG9CQUFJLE9BQUssUUFBVCxFQUFtQjtBQUNmLHdCQUFJLG1CQUFtQixPQUFLLFdBQUwsR0FBbUIsZ0JBQU0sWUFBTixFQUExQztBQUNBLDJCQUFLLE9BQUwsR0FBZSxnQkFBTSxVQUFOLENBQWlCLE9BQUssSUFBdEIsQ0FBZjtBQUNBLDRCQUFRLENBQVIsQ0FBVSxDQUFWLEtBQWdCLGlCQUFpQixJQUFqQztBQUNBLDRCQUFRLENBQVIsQ0FBVSxDQUFWLEtBQWdCLGlCQUFpQixJQUFqQztBQUNBLDRCQUFRLENBQVIsQ0FBVSxDQUFWLEtBQWdCLGlCQUFpQixHQUFqQztBQUNBLDRCQUFRLENBQVIsQ0FBVSxDQUFWLEtBQWdCLGlCQUFpQixHQUFqQztBQUNIO0FBQ0osYUFaRDs7QUFjQSwrQkFBbUIsMEJBQUMsUUFBRCxFQUFXLE9BQVgsRUFBdUI7QUFDdEMsb0JBQUksQ0FBQyxPQUFLLFdBQVYsRUFBdUI7QUFDbkIsMkJBQU8sT0FBUDtBQUNIOztBQUhxQyxnRUFJakIsT0FBSyxXQUFMLENBQWlCLENBSkE7O0FBQUEsb0JBSWpDLE1BSmlDO0FBQUEsb0JBSXpCLElBSnlCOztBQUFBLGdFQUtqQixPQUFLLFdBQUwsQ0FBaUIsQ0FMQTs7QUFBQSxvQkFLakMsTUFMaUM7QUFBQSxvQkFLekIsSUFMeUI7QUFBQSwrQkFNcEIsT0FOb0I7QUFBQSxvQkFNakMsSUFOaUMsWUFNakMsSUFOaUM7QUFBQSxvQkFNM0IsR0FOMkIsWUFNM0IsR0FOMkI7O0FBT3RDLG9CQUFJLFFBQVEsT0FBTyxRQUFRLEtBQTNCO0FBQ0Esb0JBQUksU0FBUyxNQUFNLFFBQVEsTUFBM0I7QUFDQSxvQkFBSSxPQUFPLE1BQVgsRUFBbUI7QUFDZiw0QkFBUSxJQUFSLEdBQWUsTUFBZjtBQUNILGlCQUZELE1BR0ssSUFBSSxRQUFRLElBQVosRUFBa0I7QUFDbkIsd0JBQUksWUFBWSxPQUFPLFFBQVEsS0FBL0I7QUFDQSx3QkFBSSxhQUFhLE1BQWpCLEVBQXlCO0FBQ3JCLGdDQUFRLElBQVIsR0FBZSxPQUFPLFFBQVEsS0FBOUI7QUFDSDtBQUNKO0FBQ0Qsb0JBQUksTUFBTSxNQUFWLEVBQWtCO0FBQ2QsNEJBQVEsR0FBUixHQUFjLE1BQWQ7QUFDSCxpQkFGRCxNQUdLLElBQUksU0FBUyxJQUFiLEVBQW1CO0FBQ3BCLHdCQUFJLFdBQVcsT0FBTyxRQUFRLE1BQTlCO0FBQ0Esd0JBQUksWUFBWSxNQUFoQixFQUF3QjtBQUNwQixnQ0FBUSxHQUFSLEdBQWMsT0FBTyxRQUFRLE1BQTdCO0FBQ0g7QUFDSjtBQUNELDBCQUFVLE9BQUssbUJBQUwsQ0FBeUIsT0FBekIsQ0FBVjtBQUNBLHVCQUFPLE9BQVA7QUFDSCxhQTdCRDtBQThCQSxpQ0FBcUIsNEJBQUMsUUFBRCxFQUFXLE9BQVgsRUFBdUI7QUFDeEMsb0JBQUksQ0FBQyxPQUFLLFdBQVYsRUFBdUI7QUFDbkIsMkJBQU8sT0FBUDtBQUNIOztBQUh1QyxpRUFJbkIsT0FBSyxXQUFMLENBQWlCLENBSkU7O0FBQUEsb0JBSW5DLE1BSm1DO0FBQUEsb0JBSTNCLElBSjJCOztBQUFBLGlFQUtuQixPQUFLLFdBQUwsQ0FBaUIsQ0FMRTs7QUFBQSxvQkFLbkMsTUFMbUM7QUFBQSxvQkFLM0IsSUFMMkI7QUFBQSxnQ0FNdEIsT0FOc0I7QUFBQSxvQkFNbkMsSUFObUMsYUFNbkMsSUFObUM7QUFBQSxvQkFNN0IsR0FONkIsYUFNN0IsR0FONkI7O0FBT3hDLG9CQUFJLFFBQVEsT0FBTyxRQUFRLEtBQTNCO0FBQ0Esb0JBQUksU0FBUyxNQUFNLFFBQVEsTUFBM0I7QUFDQSxvQkFBSSxPQUFPLE1BQVgsRUFBbUI7QUFDZiw0QkFBUSxLQUFSLEdBQWdCLFNBQVMsS0FBekI7QUFDSCxpQkFGRCxNQUdLLElBQUksUUFBUSxJQUFaLEVBQWtCO0FBQ25CLDRCQUFRLEtBQVIsR0FBZ0IsT0FBTyxJQUF2QjtBQUNIO0FBQ0Qsb0JBQUksTUFBTSxNQUFWLEVBQWtCO0FBQ2QsNEJBQVEsTUFBUixHQUFpQixTQUFTLE1BQTFCO0FBQ0gsaUJBRkQsTUFHSyxJQUFJLFNBQVMsSUFBYixFQUFtQjtBQUNwQiw0QkFBUSxNQUFSLEdBQWlCLE9BQU8sR0FBeEI7QUFDSDtBQUNELDBCQUFVLE9BQUsscUJBQUwsQ0FBMkIsT0FBM0IsQ0FBVjtBQUNBLHVCQUFPLE9BQVA7QUFDSCxhQXZCRDtBQXdCSCxTQXJFRCxNQXNFSztBQUNELCtCQUFtQiwwQkFBQyxRQUFELEVBQVcsT0FBWCxFQUF1QjtBQUN0Qyx1QkFBTyxPQUFQO0FBQ0gsYUFGRDtBQUdBLGlDQUFxQiw0QkFBQyxRQUFELEVBQVcsT0FBWCxFQUF1QjtBQUN4Qyx1QkFBTyxPQUFQO0FBQ0gsYUFGRDtBQUdBLDhCQUFrQiwyQkFBTSxDQUFFLENBQTFCO0FBQ0g7QUFDRCxlQUFLLGdCQUFMLEdBQXdCLGdCQUF4QjtBQUNBLGVBQUssa0JBQUwsR0FBMEIsa0JBQTFCO0FBQ0EsZUFBSyxlQUFMLEdBQXVCLGVBQXZCO0FBQ0gsSzs7U0FHRCxtQixHQUFzQixVQUFDLE9BQUQsRUFBYTtBQUMvQixZQUFJLENBQUMsT0FBSyxRQUFWLEVBQW9CO0FBQ2hCLG1CQUFPLE9BQVA7QUFDSDtBQUNELFlBQUksYUFBYSxnQkFBTSxZQUFOLEVBQWpCO0FBQ0EsWUFBSSxVQUFVLE9BQUssT0FBbkI7QUFDQSxZQUFJLFVBQVUsV0FBVyxJQUFYLEdBQWtCLE9BQUssV0FBTCxDQUFpQixJQUFqRDtBQUNBLFlBQUksVUFBVSxXQUFXLEdBQVgsR0FBaUIsT0FBSyxXQUFMLENBQWlCLEdBQWhEO0FBQ0EsZ0JBQVEsSUFBUixJQUFnQixPQUFoQjtBQUNBLGdCQUFRLEdBQVIsSUFBZSxPQUFmO0FBQ0EsWUFBSSxRQUFRLFFBQVEsSUFBUixHQUFlLFFBQVEsS0FBbkM7QUFDQSxZQUFJLFNBQVMsUUFBUSxHQUFSLEdBQWMsUUFBUSxNQUFuQztBQUNBLFlBQUksUUFBUSxHQUFSLEdBQWMsQ0FBbEIsRUFBcUI7QUFDakIsb0JBQVEsR0FBUixHQUFjLENBQWQ7QUFDSDtBQUNELFlBQUksUUFBUSxRQUFRLEtBQXBCLEVBQTJCO0FBQ3ZCLGdCQUFJLFVBQVUsUUFBUSxLQUFSLEdBQWdCLFFBQVEsS0FBdEM7QUFDQSxnQkFBSSxXQUFXLENBQWYsRUFBa0I7QUFDZCx3QkFBUSxJQUFSLEdBQWUsT0FBZjtBQUNIO0FBQ0o7QUFDRCxZQUFJLFFBQVEsSUFBUixHQUFlLENBQW5CLEVBQXNCO0FBQ2xCLG9CQUFRLElBQVIsR0FBZSxDQUFmO0FBQ0g7QUFDRCxZQUFJLFNBQVMsUUFBUSxNQUFyQixFQUE2QjtBQUN6QixnQkFBSSxTQUFTLFFBQVEsTUFBUixHQUFpQixRQUFRLE1BQXRDO0FBQ0EsZ0JBQUksVUFBVSxDQUFkLEVBQWlCO0FBQ2Isd0JBQVEsR0FBUixHQUFjLE1BQWQ7QUFDSDtBQUNKO0FBQ0QsZUFBTyxPQUFQO0FBQ0gsSzs7U0FFRCxxQixHQUF3QixVQUFDLE9BQUQsRUFBYTtBQUNqQyxZQUFJLENBQUMsT0FBSyxRQUFWLEVBQW9CO0FBQ2hCLG1CQUFPLE9BQVA7QUFDSDtBQUNELFlBQUksVUFBVSxPQUFLLE9BQW5CO0FBQ0EsWUFBSSxRQUFRLFFBQVEsSUFBUixHQUFlLFFBQVEsS0FBbkM7QUFDQSxZQUFJLFNBQVMsUUFBUSxHQUFSLEdBQWMsUUFBUSxNQUFuQztBQUNBLFlBQUksUUFBUSxRQUFRLEtBQXBCLEVBQTJCO0FBQ3ZCLGdCQUFJLE9BQU8sUUFBUSxLQUFSLEdBQWdCLFFBQVEsSUFBbkM7QUFDQSxnQkFBSSxTQUFTLE9BQUssTUFBTCxHQUFjLE9BQUssTUFBTCxDQUFZLENBQVosQ0FBZCxHQUErQixDQUF4QyxDQUFKLEVBQWdEO0FBQzVDLHdCQUFRLEtBQVIsR0FBZ0IsSUFBaEI7QUFDSDtBQUNKO0FBQ0QsWUFBSSxTQUFTLFFBQVEsTUFBckIsRUFBNkI7QUFDekIsZ0JBQUksT0FBTyxRQUFRLE1BQVIsR0FBaUIsUUFBUSxHQUFwQztBQUNBLGdCQUFJLFNBQVMsT0FBSyxNQUFMLEdBQWMsT0FBSyxNQUFMLENBQVksQ0FBWixDQUFkLEdBQStCLENBQXhDLENBQUosRUFBZ0Q7QUFDNUMsd0JBQVEsTUFBUixHQUFpQixJQUFqQjtBQUNIO0FBQ0o7QUFDRCxlQUFPLE9BQVA7QUFDSCxLOztTQUlELGUsR0FBa0IsWUFBTSxDQUFFLEM7O1NBRzFCLGdCLEdBQW1CLFVBQUMsUUFBRCxFQUFXLE9BQVgsRUFBdUI7QUFDdEMsZUFBTyxPQUFQO0FBQ0gsSzs7U0FHRCxrQixHQUFxQixVQUFDLFFBQUQsRUFBVyxPQUFYLEVBQXVCO0FBQ3hDLGVBQU8sT0FBUDtBQUNILEs7O1NBR0QsYSxHQUFnQixVQUFDLFFBQUQsRUFBVyxPQUFYLEVBQXVCO0FBQ25DLFlBQUksT0FBSyxPQUFULEVBQWtCO0FBQ2Qsb0JBQVEsSUFBUixHQUFlLFNBQVMsSUFBeEI7QUFDSDtBQUNELFlBQUksT0FBSyxPQUFULEVBQWtCO0FBQ2Qsb0JBQVEsR0FBUixHQUFjLFNBQVMsR0FBdkI7QUFDSDtBQUNELFlBQUksT0FBSyxPQUFULEVBQWtCO0FBQ2Qsb0JBQVEsS0FBUixHQUFnQixTQUFTLEtBQXpCO0FBQ0g7QUFDRCxZQUFJLE9BQUssT0FBVCxFQUFrQjtBQUNkLG9CQUFRLE1BQVIsR0FBaUIsU0FBUyxNQUExQjtBQUNIO0FBQ0QsZUFBTyxPQUFQO0FBQ0gsSzs7U0FHRCxlLEdBQWtCLFVBQUMsUUFBRCxFQUFXLE9BQVgsRUFBdUI7QUFDckMsWUFBSSxPQUFLLE1BQVQsRUFBaUI7QUFDYixtQkFBTyxPQUFQO0FBQ0g7QUFDRCxZQUFJLE9BQUssS0FBTCxLQUFlLEtBQW5CLEVBQTBCO0FBQ3RCLGdCQUFJLGFBQWEsUUFBUSxJQUFSLEdBQWUsU0FBUyxJQUF6QztBQUNBLGdCQUFJLFVBQUosRUFBZ0I7QUFDWixvQkFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLGFBQWEsT0FBSyxLQUE3QixDQUFaO0FBQ0Esd0JBQVEsSUFBUixHQUFlLFNBQVMsSUFBVCxHQUFnQixRQUFRLE9BQUssS0FBNUM7QUFDSDtBQUNKO0FBQ0QsWUFBSSxPQUFLLEtBQUwsS0FBZSxLQUFuQixFQUEwQjtBQUN0QixnQkFBSSxZQUFZLFFBQVEsR0FBUixHQUFjLFNBQVMsR0FBdkM7QUFDQSxnQkFBSSxTQUFKLEVBQWU7QUFDWCxvQkFBSSxTQUFRLEtBQUssS0FBTCxDQUFXLFlBQVksT0FBSyxLQUE1QixDQUFaO0FBQ0Esd0JBQVEsR0FBUixHQUFjLFNBQVMsR0FBVCxHQUFlLFNBQVEsT0FBSyxLQUExQztBQUNIO0FBQ0o7QUFDRCxlQUFPLE9BQVA7QUFDSCxLOztTQUdELGlCLEdBQW9CLFVBQUMsUUFBRCxFQUFXLE9BQVgsRUFBdUI7QUFDdkMsWUFBSSxPQUFLLE1BQVQsRUFBaUI7QUFDYixtQkFBTyxPQUFQO0FBQ0g7QUFDRCxZQUFJLE9BQUssS0FBTCxLQUFlLEtBQW5CLEVBQTBCO0FBQ3RCLGdCQUFJLGNBQWMsUUFBUSxLQUFSLEdBQWdCLFNBQVMsS0FBM0M7QUFDQSxnQkFBSSxXQUFKLEVBQWlCO0FBQ2Isb0JBQUksUUFBUSxLQUFLLEtBQUwsQ0FBVyxjQUFjLE9BQUssS0FBOUIsQ0FBWjtBQUNBLHdCQUFRLEtBQVIsR0FBZ0IsU0FBUyxLQUFULEdBQWlCLFFBQVEsT0FBSyxLQUE5QztBQUNIO0FBQ0o7QUFDRCxZQUFJLE9BQUssS0FBTCxLQUFlLEtBQW5CLEVBQTBCO0FBQ3RCLGdCQUFJLGVBQWUsUUFBUSxNQUFSLEdBQWlCLFNBQVMsTUFBN0M7QUFDQSxnQkFBSSxZQUFKLEVBQWtCO0FBQ2Qsb0JBQUksVUFBUSxLQUFLLEtBQUwsQ0FBVyxlQUFlLE9BQUssS0FBL0IsQ0FBWjtBQUNBLHdCQUFRLE1BQVIsR0FBaUIsU0FBUyxNQUFULEdBQWtCLFVBQVEsT0FBSyxLQUFoRDtBQUNIO0FBQ0o7QUFDRCxlQUFPLE9BQVA7QUFDSCxLOztTQUdELGdCLEdBQW1CLFVBQUMsUUFBRCxFQUFXLE9BQVgsRUFBdUI7QUFDdEMsWUFBSSxPQUFLLE1BQUwsS0FBZ0IsS0FBcEIsRUFBMkI7QUFBQSxxREFDSixPQUFLLE1BREQ7O0FBQUEsZ0JBQ2xCLElBRGtCO0FBQUEsZ0JBQ1osSUFEWTs7QUFFdkIsZ0JBQUksUUFBUSxLQUFSLEdBQWdCLElBQXBCLEVBQTBCO0FBQ3RCLHdCQUFRLEtBQVIsR0FBZ0IsSUFBaEI7QUFDSCxhQUZELE1BR0ssSUFBSSxRQUFRLEtBQVIsR0FBZ0IsSUFBcEIsRUFBMEI7QUFDM0Isd0JBQVEsS0FBUixHQUFnQixJQUFoQjtBQUNIO0FBQ0o7QUFDRCxZQUFJLE9BQUssTUFBTCxLQUFnQixLQUFwQixFQUEyQjtBQUFBLHFEQUNKLE9BQUssTUFERDs7QUFBQSxnQkFDbEIsSUFEa0I7QUFBQSxnQkFDWixJQURZOztBQUV2QixnQkFBSSxRQUFRLE1BQVIsR0FBaUIsSUFBckIsRUFBMkI7QUFDdkIsd0JBQVEsTUFBUixHQUFpQixJQUFqQjtBQUNILGFBRkQsTUFHSyxJQUFJLFFBQVEsTUFBUixHQUFpQixJQUFyQixFQUEyQjtBQUM1Qix3QkFBUSxNQUFSLEdBQWlCLElBQWpCO0FBQ0g7QUFDSjtBQUNELGVBQU8sT0FBUDtBQUNILEs7O1NBR0QsaUIsR0FBb0IsWUFBd0Q7QUFBQSxZQUF2RCxLQUF1RCx5REFBL0MsT0FBSyxLQUEwQztBQUFBLFlBQW5DLFdBQW1DLHlEQUFyQixPQUFLLFdBQWdCO0FBQUEsZ0NBQ2hELEtBRGdELENBQ25FLFVBRG1FO0FBQUEsWUFDbkUsVUFEbUUscUNBQ3RELEVBRHNEO0FBQUEsWUFFbkUsT0FGbUUsR0FFeEQsT0FBSyxLQUZtRCxDQUVuRSxPQUZtRTs7QUFHeEUsWUFBSSxXQUFXLFlBQVksV0FBWixFQUF5QixPQUF6QixDQUFmO0FBQ0EsOENBQWlCLFVBQWpCO0FBQ0EscUJBQWEsZ0JBQU0sS0FBTixDQUFZLFVBQVosRUFBd0IsUUFBeEIsQ0FBYjtBQUNBLG1CQUFXLFFBQVgsR0FBc0IsT0FBSyxvQkFBM0I7QUFDQSxlQUFPLFVBQVA7QUFDSCxLOztTQUdELHFCLEdBQXdCLFlBQU07QUFDMUIsWUFBSSxlQUFlLGdCQUFNLFFBQU4sQ0FBZSxPQUFLLElBQXBCLEVBQTBCLFVBQTFCLENBQW5CO0FBQ0EsWUFBSSxXQUFXLE9BQUssSUFBcEI7QUFDQTtBQUNBLFlBQUksaUJBQWlCLFVBQXJCLEVBQWlDO0FBQzdCLHVCQUFXLE9BQUssSUFBTCxDQUFVLFlBQXJCO0FBQ0gsU0FGRCxNQUdLO0FBQ0QsdUJBQVcsT0FBSyxJQUFMLENBQVUsVUFBckI7QUFDSDtBQUNELFlBQUksVUFBVSxTQUFTLFFBQVQsQ0FBZDtBQUNBLFlBQUksU0FBUyxnQkFBTSxrQkFBTixDQUF5QixRQUF6QixDQUFiOztBQUVBLGVBQU8sSUFBUCxJQUFlLFdBQVcsUUFBUSxlQUFSLElBQTJCLENBQXRDLEVBQXlDLEVBQXpDLENBQWY7QUFDQSxlQUFPLEdBQVAsSUFBYyxXQUFXLFFBQVEsY0FBUixJQUEwQixDQUFyQyxFQUF3QyxFQUF4QyxDQUFkO0FBQ0EsZUFBTyxNQUFQO0FBQ0gsSzs7U0FFRCxVLEdBQWEsWUFBd0I7QUFBQSxZQUF2QixLQUF1Qix5REFBZixPQUFLLEtBQVU7QUFBQSxZQUM1QixXQUQ0QixVQUM1QixXQUQ0Qjs7QUFFakMsZUFBSyxlQUFMLEdBQXVCLGdCQUFNLGtCQUFOLENBQXlCLE9BQUssSUFBOUIsQ0FBdkI7QUFDQSxlQUFLLGVBQUwsQ0FBcUIsSUFBckIsSUFBNkIsWUFBWSxJQUF6QztBQUNBLGVBQUssZUFBTCxDQUFxQixHQUFyQixJQUE0QixZQUFZLEdBQXhDO0FBQ0EsZUFBSyxrQkFBTCxHQUEwQixPQUFLLHFCQUFMLEVBQTFCO0FBQ0EsWUFBSSxPQUFLLG9CQUFMLEtBQThCLE9BQTlCLElBQXlDLE1BQU0sV0FBbkQsRUFBZ0U7QUFDNUQsbUJBQUssUUFBTCxHQUFnQixJQUFoQjtBQUNILFNBRkQsTUFHSztBQUNELG1CQUFLLFFBQUwsR0FBZ0IsS0FBaEI7QUFDSDtBQUNKLEs7O1NBRUQsVyxHQUFjLFVBQUMsQ0FBRCxFQUFJLEdBQUosRUFBUyxNQUFULEVBQW9CO0FBQzlCLFNBQUMsT0FBSyxLQUFMLENBQVcsYUFBWixJQUNJLGdCQUFNLFFBQU4sQ0FBZSxPQUFLLElBQUwsQ0FBVSxhQUFWLENBQXdCLElBQXZDLGlCQUEwRCxHQUExRCxDQURKO0FBRUEsZUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixDQUFuQixFQUFzQixHQUF0QixFQUEyQixNQUEzQjtBQUNILEs7O1NBRUQsYSxHQUFnQixVQUFDLENBQUQsRUFBSSxHQUFKLEVBQVMsTUFBVCxFQUFvQjtBQUNoQyxlQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLENBQXJCLEVBQXdCLEdBQXhCLEVBQTZCLE1BQTdCO0FBQ0gsSzs7U0FFRCxTLEdBQVksVUFBQyxDQUFELEVBQUksR0FBSixFQUFTLE1BQVQsRUFBb0I7QUFDNUIsU0FBQyxPQUFLLEtBQUwsQ0FBVyxhQUFaLElBQ0ksZ0JBQU0sV0FBTixDQUFrQixPQUFLLElBQUwsQ0FBVSxhQUFWLENBQXdCLElBQTFDLGlCQUE2RCxHQUE3RCxDQURKO0FBRUEsZUFBSyxnQkFBTCw0QkFBNEIsT0FBSyxXQUFqQztBQUNBLGVBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsQ0FBakIsRUFBb0IsR0FBcEIsRUFBeUIsTUFBekI7QUFDSCxLOztTQUVELGUsR0FBa0IsVUFBQyxDQUFELEVBQU87QUFDckIsWUFBSSxRQUFRLE9BQUssS0FBakI7QUFDQSxZQUFJLE1BQU0sTUFBTixLQUFpQixJQUFyQixFQUEyQjtBQUN2QjtBQUNIO0FBQ0QsWUFBSSxLQUFLLEVBQUUsTUFBWDtBQUNBO0FBQ0EsWUFBSSxPQUFLLE1BQUwsQ0FBWSxNQUFaLElBQXNCLE9BQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsUUFBbkIsQ0FBNEIsRUFBNUIsQ0FBMUIsRUFBMkQ7QUFDdkQ7QUFDSDs7QUFFRCxlQUFLLGVBQUw7QUFDQSxlQUFLLFVBQUw7QUFDQSxZQUFJLFNBQVMsZ0JBQU0sU0FBTixDQUFnQixDQUFoQixDQUFiO0FBQ0EsWUFBSSxRQUFRLE9BQUssS0FBakI7QUFkcUIsWUFlaEIsV0FmZ0IsVUFlaEIsV0FmZ0I7O0FBZ0JyQixZQUFJLGtCQUFrQixPQUFLLGVBQTNCO0FBQ0EsZUFBSyxZQUFMLEdBQW9CO0FBQ2hCLGVBQUcsT0FBTyxDQUFQLEdBQVcsZ0JBQWdCLElBQTNCLEdBQWtDLFlBQVksSUFEakM7QUFFaEIsZUFBRyxPQUFPLENBQVAsR0FBVyxnQkFBZ0IsR0FBM0IsR0FBaUMsWUFBWTtBQUZoQyxTQUFwQjs7QUFLQSx3QkFBTSxRQUFOLENBQWUsT0FBSyxJQUFMLENBQVUsYUFBekIsRUFBd0MsV0FBeEMsRUFBcUQsT0FBSyxnQkFBMUQ7QUFDQSx3QkFBTSxRQUFOLENBQWUsT0FBSyxJQUFMLENBQVUsYUFBekIsRUFBd0MsU0FBeEMsRUFBbUQsT0FBSyxhQUF4RDtBQUNBLGNBQU0sTUFBTixHQUFlLFFBQWY7QUFDQSxjQUFNLFVBQU4sR0FBbUIsT0FBSyxpQkFBTCxDQUF1QixLQUF2QixDQUFuQjtBQUNBLGVBQUssUUFBTCxDQUFjLEtBQWQsRUFBcUIsWUFBTTtBQUN2QixtQkFBSyxXQUFMLENBQWlCLENBQWpCLEVBQW9CLE1BQXBCLDJCQUFnQyxXQUFoQztBQUNILFNBRkQ7QUFHSCxLOztTQUdELGdCLEdBQW1CLFVBQUMsQ0FBRCxFQUFPO0FBQ3RCLFlBQUksQ0FBQyxPQUFLLFFBQVYsRUFBb0I7QUFDaEIsbUJBQUssUUFBTCxHQUFnQixXQUFXLFlBQU07QUFDN0IsdUJBQUssWUFBTCxDQUFrQixDQUFsQjtBQUNBLHVCQUFLLFFBQUwsR0FBZ0IsSUFBaEI7QUFDSCxhQUhlLEVBR2IsT0FBSyxLQUFMLENBQVcsUUFIRSxDQUFoQjtBQUlIO0FBQ0osSzs7U0FFRCxZLEdBQWUsVUFBQyxDQUFELEVBQU87QUFDbEIsWUFBSSxNQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsQ0FBaEIsQ0FBVjtBQUNBLFlBQUksa0JBQWtCLE9BQUssZUFBM0I7QUFDQSxZQUFJLGVBQWUsT0FBSyxZQUF4QjtBQUNBLFlBQUksUUFBUSxPQUFLLEtBQWpCO0FBQ0EsWUFBSSxrQkFBa0IsT0FBSyxXQUEzQjtBQUNBLFlBQUksaUJBQWlCO0FBQ2pCLGtCQUFNLElBQUksQ0FBSixHQUFRLGdCQUFnQixJQUF4QixHQUErQixhQUFhLENBRGpDO0FBRWpCLGlCQUFLLElBQUksQ0FBSixHQUFRLGdCQUFnQixHQUF4QixHQUE4QixhQUFhLENBRi9CO0FBR2pCLG1CQUFPLGdCQUFnQixLQUhOO0FBSWpCLG9CQUFRLGdCQUFnQjtBQUpQLFNBQXJCOztBQU9BLHlCQUFpQixPQUFLLGFBQUwsQ0FBbUIsZUFBbkIsRUFBb0MsY0FBcEMsQ0FBakI7QUFDQSx5QkFBaUIsT0FBSyxlQUFMLENBQXFCLGVBQXJCLEVBQXNDLGNBQXRDLENBQWpCO0FBQ0EseUJBQWlCLE9BQUssZ0JBQUwsQ0FBc0IsZUFBdEIsRUFBdUMsY0FBdkMsQ0FBakI7QUFDQSxlQUFLLFdBQUwsR0FBbUIsY0FBbkI7QUFDQSxjQUFNLFVBQU4sR0FBbUIsT0FBSyxpQkFBTCxDQUF1QixLQUF2QixDQUFuQjtBQUNBLGVBQUssUUFBTCxDQUFjLEtBQWQsRUFBcUIsWUFBTTtBQUN2QixtQkFBSyxhQUFMLENBQW1CLENBQW5CLEVBQXNCLE1BQXRCLDJCQUFrQyxPQUFLLFdBQXZDO0FBQ0gsU0FGRDtBQUdILEs7O1NBRUQsYSxHQUFnQixVQUFDLENBQUQsRUFBTztBQUNuQix3QkFBTSxXQUFOLENBQWtCLE9BQUssSUFBTCxDQUFVLGFBQTVCLEVBQTJDLFdBQTNDLEVBQXdELE9BQUssZ0JBQTdEO0FBQ0Esd0JBQU0sV0FBTixDQUFrQixPQUFLLElBQUwsQ0FBVSxhQUE1QixFQUEyQyxTQUEzQyxFQUFzRCxPQUFLLGFBQTNEO0FBQ0EsWUFBSSxjQUFjLE9BQUssV0FBdkI7QUFDQSxZQUFJLFlBQVksT0FBSyxLQUFMLENBQVcsU0FBM0I7QUFDQSxZQUFJLHVDQUFrQixXQUFsQixDQUFKO0FBQ0EsWUFBSSxZQUFZLElBQWhCO0FBQ0EsWUFBSSxPQUFPLFNBQVAsS0FBcUIsVUFBekIsRUFBcUM7QUFDakMsZ0JBQUksZUFBZSxnQkFBTSxrQkFBTixDQUF5QixPQUFLLElBQTlCLENBQW5CO0FBQ0Esd0JBQVksVUFBVSxDQUFWLEVBQWEsTUFBYiwyQkFBeUIsV0FBekIsR0FBdUMsWUFBdkMsTUFBeUQsS0FBckU7QUFDSCxTQUhELE1BSUs7QUFDRCx3QkFBWSxjQUFjLEtBQTFCO0FBQ0g7QUFDRCxZQUFJLENBQUMsU0FBTCxFQUFnQjtBQUNaLG1CQUFLLGFBQUwsQ0FBbUIsWUFBTTtBQUNyQix1QkFBSyxTQUFMLENBQWUsQ0FBZixFQUFrQixNQUFsQixFQUEwQixXQUExQjtBQUNILGFBRkQ7QUFHQTtBQUNIOztBQUVELFlBQUksUUFBUSxPQUFLLEtBQWpCO0FBQ0EsY0FBTSxNQUFOLEdBQWUsTUFBZjtBQUNBLGVBQUssUUFBTCxDQUFjLEtBQWQsRUFBcUIsWUFBTTtBQUN2QixtQkFBSyxTQUFMLENBQWUsQ0FBZixFQUFrQixNQUFsQixFQUEwQixXQUExQjtBQUNILFNBRkQ7QUFHSCxLOztTQUVELGlCLEdBQW9CLFVBQUMsQ0FBRCxFQUFPO0FBQ3ZCLFVBQUUsZUFBRjtBQUNBLFlBQUksUUFBUSxPQUFLLEtBQWpCO0FBQ0EsWUFBSSxNQUFNLE1BQU4sS0FBaUIsSUFBckIsRUFBMkI7QUFDdkI7QUFDSDs7QUFFRCxlQUFLLGVBQUw7QUFDQSxlQUFLLFVBQUw7QUFDQSxZQUFJLFNBQVMsZ0JBQU0sU0FBTixDQUFnQixDQUFoQixDQUFiO0FBQ0EsWUFBSSxRQUFRLE9BQUssS0FBakI7QUFWdUIsWUFXbEIsV0FYa0IsVUFXbEIsV0FYa0I7O0FBWXZCLFlBQUksa0JBQWtCLE9BQUssZUFBM0I7QUFDQSxlQUFLLFlBQUwsR0FBb0I7QUFDaEIsZUFBSSxnQkFBZ0IsS0FBaEIsR0FBd0IsZ0JBQWdCLElBQXpDLEdBQWlELE9BQU8sQ0FEM0M7QUFFaEIsZUFBSSxnQkFBZ0IsTUFBaEIsR0FBeUIsZ0JBQWdCLEdBQTFDLEdBQWlELE9BQU87QUFGM0MsU0FBcEI7QUFJQSx3QkFBTSxRQUFOLENBQWUsT0FBSyxJQUFMLENBQVUsYUFBekIsRUFBd0MsV0FBeEMsRUFBcUQsT0FBSyxrQkFBMUQ7QUFDQSx3QkFBTSxRQUFOLENBQWUsT0FBSyxJQUFMLENBQVUsYUFBekIsRUFBd0MsU0FBeEMsRUFBbUQsT0FBSyxlQUF4RDtBQUNBLGNBQU0sTUFBTixHQUFlLFFBQWY7QUFDQSxjQUFNLFVBQU4sR0FBbUIsT0FBSyxpQkFBTCxDQUF1QixLQUF2QixDQUFuQjtBQUNBLGVBQUssUUFBTCxDQUFjLEtBQWQsRUFBcUIsWUFBTTtBQUN2QixtQkFBSyxXQUFMLENBQWlCLENBQWpCLEVBQW9CLFFBQXBCLDJCQUFrQyxXQUFsQztBQUNILFNBRkQ7QUFHSCxLOztTQUdELGtCLEdBQXFCLFVBQUMsQ0FBRCxFQUFPO0FBQ3hCLFlBQUksQ0FBQyxPQUFLLFFBQVYsRUFBb0I7QUFDaEIsbUJBQUssUUFBTCxHQUFnQixXQUFXLFlBQU07QUFDN0IsdUJBQUssY0FBTCxDQUFvQixDQUFwQjtBQUNBLHVCQUFLLFFBQUwsR0FBZ0IsSUFBaEI7QUFDSCxhQUhlLEVBR2IsT0FBSyxLQUFMLENBQVcsUUFIRSxDQUFoQjtBQUlIO0FBQ0osSzs7U0FFRCxjLEdBQWlCLFVBQUMsQ0FBRCxFQUFPO0FBQ3BCLFlBQUksTUFBTSxnQkFBTSxTQUFOLENBQWdCLENBQWhCLENBQVY7QUFDQSxZQUFJLGtCQUFrQixPQUFLLGVBQTNCO0FBQ0EsWUFBSSxlQUFlLE9BQUssWUFBeEI7QUFDQSxZQUFJLFFBQVEsT0FBSyxLQUFqQjtBQUNBLFlBQUksa0JBQWtCLE9BQUssV0FBM0I7QUFDQSxZQUFJLGlCQUFpQjtBQUNqQixrQkFBTSxnQkFBZ0IsSUFETDtBQUVqQixpQkFBSyxnQkFBZ0IsR0FGSjtBQUdqQixtQkFBTyxJQUFJLENBQUosR0FBUSxnQkFBZ0IsSUFBeEIsR0FBK0IsYUFBYSxDQUhsQztBQUlqQixvQkFBUSxJQUFJLENBQUosR0FBUSxnQkFBZ0IsR0FBeEIsR0FBOEIsYUFBYTtBQUpsQyxTQUFyQjs7QUFPQSx5QkFBaUIsT0FBSyxhQUFMLENBQW1CLGVBQW5CLEVBQW9DLGNBQXBDLENBQWpCO0FBQ0EseUJBQWlCLE9BQUssZ0JBQUwsQ0FBc0IsZUFBdEIsRUFBdUMsY0FBdkMsQ0FBakI7QUFDQSx5QkFBaUIsT0FBSyxpQkFBTCxDQUF1QixlQUF2QixFQUF3QyxjQUF4QyxDQUFqQjtBQUNBLHlCQUFpQixPQUFLLGtCQUFMLENBQXdCLGVBQXhCLEVBQXlDLGNBQXpDLENBQWpCO0FBQ0EsZUFBSyxXQUFMLEdBQW1CLGNBQW5CO0FBQ0EsY0FBTSxVQUFOLEdBQW1CLE9BQUssaUJBQUwsQ0FBdUIsS0FBdkIsQ0FBbkI7QUFDQSxlQUFLLFFBQUwsQ0FBYyxLQUFkLEVBQXFCLFlBQU07QUFDdkIsbUJBQUssYUFBTCxDQUFtQixDQUFuQixFQUFzQixRQUF0QiwyQkFBb0MsT0FBSyxXQUF6QztBQUNILFNBRkQ7QUFHSCxLOztTQUVELGUsR0FBa0IsVUFBQyxDQUFELEVBQU87QUFDckIsd0JBQU0sV0FBTixDQUFrQixPQUFLLElBQUwsQ0FBVSxhQUE1QixFQUEyQyxXQUEzQyxFQUF3RCxPQUFLLGtCQUE3RDtBQUNBLHdCQUFNLFdBQU4sQ0FBa0IsT0FBSyxJQUFMLENBQVUsYUFBNUIsRUFBMkMsU0FBM0MsRUFBc0QsT0FBSyxlQUEzRDtBQUNBLFlBQUksY0FBYyxPQUFLLFdBQXZCO0FBQ0EsWUFBSSx1Q0FBa0IsV0FBbEIsQ0FBSjtBQUNBLFlBQUksWUFBWSxPQUFLLEtBQUwsQ0FBVyxTQUEzQjtBQUNBLFlBQUksWUFBWSxJQUFoQjtBQUNBLFlBQUksT0FBTyxTQUFQLEtBQXFCLFVBQXpCLEVBQXFDO0FBQ2pDLGdCQUFJLGVBQWUsZ0JBQU0sa0JBQU4sQ0FBeUIsT0FBSyxJQUE5QixDQUFuQjtBQUNBLHdCQUFZLFVBQVUsQ0FBVixFQUFhLFFBQWIsMkJBQTJCLFdBQTNCLEdBQXlDLFlBQXpDLE1BQTJELEtBQXZFO0FBQ0gsU0FIRCxNQUlLO0FBQ0Qsd0JBQVksY0FBYyxLQUExQjtBQUNIO0FBQ0QsWUFBSSxDQUFDLFNBQUwsRUFBZ0I7QUFDWixtQkFBSyxhQUFMLENBQW1CLFlBQU07QUFDckIsdUJBQUssU0FBTCxDQUFlLENBQWYsRUFBa0IsUUFBbEIsRUFBNEIsV0FBNUI7QUFDSCxhQUZEO0FBR0E7QUFDSDs7QUFFRCxZQUFJLFFBQVEsT0FBSyxLQUFqQjtBQUNBLGNBQU0sTUFBTixHQUFlLE1BQWY7QUFDQSxlQUFLLFFBQUwsQ0FBYyxLQUFkLEVBQXFCLFlBQU07QUFDdkIsbUJBQUssU0FBTCxDQUFlLENBQWYsRUFBa0IsUUFBbEIsRUFBNEIsV0FBNUI7QUFDSCxTQUZEO0FBR0gsSzs7O0FBZ0NMLFdBQVcsV0FBWCxHQUF5QixXQUF6QjtBQUNBLFdBQVcsYUFBWCxHQUEyQixhQUEzQjtrQkFDZSxVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICog5aSE55CG6L6555WMXG4gKi9cbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgZ2V0U3R5bGUgPSB1dGlscy5nZXRTdHlsZTtcblxuLy8g6K6h566X5Y+v5L2/55So55qE5Yy65Z+fXG5jb25zdCBjYWxjQXZhaWxhYmxlWm9uZSA9IChuZCwgcmVsYXRpdmVQYXJlbnRJbmZvLCB3cmFwcGVyUG9zVmFsKSA9PiB7XG4gICAgbGV0IG5kU3R5bGU7XG4gICAgbGV0IG5kSW5mbztcbiAgICBpZiAodXRpbHMuaXNOb2RlKG5kKSkge1xuICAgICAgICBuZFN0eWxlID0gZ2V0U3R5bGUobmQpO1xuICAgICAgICBuZEluZm8gPSB1dGlscy5nZXREb21BYnNvbHV0ZUluZm8obmQpO1xuICAgIH1cbiAgICBlbHNlIGlmICh1dGlscy5pc1dpbmRvdyhuZCkpIHtcbiAgICAgICAgbGV0IHdpblNpemUgPSB1dGlscy5nZXRXaW5TaXplKG5kLmRvY3VtZW50LmJvZHkpO1xuICAgICAgICBuZFN0eWxlID0ge1xuICAgICAgICAgICAgYm9yZGVyTGVmdFdpZHRoOiAwLFxuICAgICAgICAgICAgYm9yZGVyUmlnaHRXaWR0aDogMCxcbiAgICAgICAgICAgIGJvcmRlclRvcFdpZHRoOiAwLFxuICAgICAgICAgICAgYm9yZGVyQm90dG9tV2lkdGg6IDAsXG4gICAgICAgICAgICBwYWRkaW5nTGVmdDogMCxcbiAgICAgICAgICAgIHBhZGRpbmdSaWdodDogMCxcbiAgICAgICAgICAgIHBhZGRpbmdUb3A6IDAsXG4gICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAwXG4gICAgICAgIH07XG4gICAgICAgIG5kSW5mbyA9IHtcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICB3aWR0aDogd2luU2l6ZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogd2luU2l6ZS5oZWlnaHRcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8g5q2k5aSE55Sx5LqObmRJbmZv5piv5Z+65LqO5Yid5aeL5pe25L2N572u6K6h566X55qE77yM5Zug5q2k55u05o6l5L2/55So5Y2z5Y+vXG4gICAgbGV0IGJkTCA9IHBhcnNlRmxvYXQobmRTdHlsZS5ib3JkZXJMZWZ0V2lkdGgsIDEwKTtcbiAgICBsZXQgYmRSID0gcGFyc2VGbG9hdChuZFN0eWxlLmJvcmRlclJpZ2h0V2lkdGgsIDEwKTtcbiAgICBsZXQgYmRUID0gcGFyc2VGbG9hdChuZFN0eWxlLmJvcmRlclRvcFdpZHRoLCAxMCk7XG4gICAgbGV0IGJkQiA9IHBhcnNlRmxvYXQobmRTdHlsZS5ib3JkZXJCb3R0b21XaWR0aCwgMTApO1xuICAgIGxldCBicEwgPSBiZEwgKyBwYXJzZUZsb2F0KG5kU3R5bGUucGFkZGluZ0xlZnQsIDEwKTtcbiAgICBsZXQgYnBSID0gYmRSICsgcGFyc2VGbG9hdChuZFN0eWxlLnBhZGRpbmdSaWdodCwgMTApO1xuICAgIGxldCBicFQgPSBiZFQgKyBwYXJzZUZsb2F0KG5kU3R5bGUucGFkZGluZ1RvcCwgMTApO1xuICAgIGxldCBicEIgPSBiZEIgKyBwYXJzZUZsb2F0KG5kU3R5bGUucGFkZGluZ0JvdHRvbSwgMTApO1xuXG4gICAgbGV0IHN0YXJ0WCA9IDA7XG4gICAgbGV0IGVuZFggPSAwO1xuICAgIGxldCBzdGFydFkgPSAwO1xuICAgIGxldCBlbmRZID0gMDtcbiAgICAvLyDnm7jlr7nlj4LmlbDnmoTovrnnlYzmnaHku7bnibnmrorlpITnkIbvvIzlhbblhYPntKDlrprkvY3kuI7lhoXovrnot53mnInlhbNcbiAgICBpZiAod3JhcHBlclBvc1ZhbCA9PT0gJ3JlbGF0aXZlJykge1xuICAgICAgICBzdGFydFggPSBuZEluZm8ubGVmdCAtIHJlbGF0aXZlUGFyZW50SW5mby5sZWZ0ICsgYmRMO1xuICAgICAgICBlbmRYID0gc3RhcnRYICsgbmRJbmZvLndpZHRoIC0gYnBMIC0gYnBSO1xuICAgICAgICBzdGFydFkgPSBuZEluZm8udG9wIC0gcmVsYXRpdmVQYXJlbnRJbmZvLnRvcCArIGJkVDtcbiAgICAgICAgZW5kWSA9IHN0YXJ0WSArIG5kSW5mby5oZWlnaHQgLSBicFQgLSBicEI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzdGFydFggPSBuZEluZm8ubGVmdCAtIHJlbGF0aXZlUGFyZW50SW5mby5sZWZ0ICsgYnBMO1xuICAgICAgICBlbmRYID0gc3RhcnRYICsgbmRJbmZvLndpZHRoIC0gYnBMIC0gYnBSO1xuICAgICAgICBzdGFydFkgPSBuZEluZm8udG9wIC0gcmVsYXRpdmVQYXJlbnRJbmZvLnRvcCArIGJwVDtcbiAgICAgICAgZW5kWSA9IHN0YXJ0WSArIG5kSW5mby5oZWlnaHQgLSBicFQgLSBicEI7XG4gICAgfVxuICAgIGxldCByYW5nZSA9IHtcbiAgICAgICAgeDogW3N0YXJ0WCwgZW5kWF0sXG4gICAgICAgIHk6IFtzdGFydFksIGVuZFldXG4gICAgfTtcbiAgICByZXR1cm4gcmFuZ2U7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY2FsY0F2YWlsYWJsZVpvbmVcbn07XG4iLCIvKipcbiAqIOaJi+afhOaooeWdl1xuICovXG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBEcmFnSGFuZGxlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcmVuZGVyICgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG59XG5cbmNsYXNzIFJlc2l6ZUhhbmRsZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7RHJhZ0hhbmRsZXIsIFJlc2l6ZUhhbmRsZXJ9O1xuIiwiLyoqXG4gKiDmi5bmi73ljaDkvY3mqKHlnZdcbiAqL1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFBsYWNlaG9sZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB0b3A6IDBcbiAgICB9O1xuXG4gICAgYnVpbGRTdHlsZSA9ICgpID0+IHtcbiAgICAgICAgbGV0IHByb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgbGV0IHtwcmV2UGFyYW19ID0gcHJvcHM7XG4gICAgICAgIGxldCBzdHlsZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiBwcm9wcy53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcHJvcHMuaGVpZ2h0LFxuICAgICAgICAgICAgbGVmdDogLXBhcnNlRmxvYXQocHJldlBhcmFtLmxlZnQgfHwgMCwgMTApICsgcGFyc2VGbG9hdChwcm9wcy5sZWZ0IHx8IDAsIDEwKSArICdweCcsXG4gICAgICAgICAgICB0b3A6IC1wYXJzZUZsb2F0KHByZXZQYXJhbS50b3AgfHwgMCwgMTApICsgcGFyc2VGbG9hdChwcm9wcy50b3AgfHwgMCwgMTApICsgJ3B4J1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICB9O1xuXG4gICAgcmVuZGVyICgpIHtcbiAgICAgICAgbGV0IHN0eWxlID0gdGhpcy5idWlsZFN0eWxlKCk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRnLXBoXCIgc3R5bGU9e3N0eWxlfT48L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQbGFjZWhvbGRlcjtcbiIsImNvbnN0IHV0aWxzID0ge1xuICAgIGdldE51bSAodmFsKSB7XG4gICAgICAgIGxldCB0bXBWYWwgPSBwYXJzZUZsb2F0KHZhbCwgMTApO1xuICAgICAgICBpZiAoIWlzTmFOKHRtcFZhbCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0bXBWYWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfSxcbiAgICBnZXRBdmFpbGFibGVTaXplIChuZCkge1xuICAgICAgICBsZXQgcm9vdCA9IChuZCA/IG5kLm93bmVyRG9jdW1lbnQgOiBkb2N1bWVudClbJ2JvZHknXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlaWdodDogcm9vdC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogcm9vdC5jbGllbnRXaWR0aFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0V2luU2l6ZSAobmQpIHtcbiAgICAgICAgbGV0IHJvb3QgPSAobmQgPyBuZC5vd25lckRvY3VtZW50IDogZG9jdW1lbnQpWydkb2N1bWVudEVsZW1lbnQnXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlaWdodDogcm9vdC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogcm9vdC5jbGllbnRXaWR0aFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0U3R5bGUgKG5kLCBzdHlsZU5hbWUgPSBmYWxzZSkge1xuICAgICAgICBsZXQgc3R5bGU7XG4gICAgICAgIGlmIChuZC5jdXJyZW50U3R5bGUpIHtcbiAgICAgICAgICAgIHN0eWxlID0gbmQuY3VycmVudFN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuZCwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0eWxlTmFtZSA/IHN0eWxlW3N0eWxlTmFtZV0gOiBzdHlsZTtcbiAgICB9LFxuICAgIGlzTm9kZSAobmQpIHtcbiAgICAgICAgcmV0dXJuICEhKG5kICYmIG5kLm5vZGVUeXBlID09PSAxKTtcbiAgICB9LFxuICAgIG1lcmdlIChyb290T2JqID0ge30sIG5ld09iaiA9IHt9KSB7XG4gICAgICAgIGZvciAobGV0IGkgaW4gbmV3T2JqKSB7XG4gICAgICAgICAgICBpZiAobmV3T2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgcm9vdE9ialtpXSA9IG5ld09ialtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByb290T2JqO1xuICAgIH0sXG5cbiAgICBpc0FycmF5IChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtIGluc3RhbmNlb2YgQXJyYXk7XG4gICAgfSxcblxuICAgIGlzT2JqZWN0IChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtIGluc3RhbmNlb2YgT2JqZWN0O1xuICAgIH0sXG5cbiAgICBpc1dpbmRvdyAoaXRlbSkge1xuICAgICAgICByZXR1cm4gIShpdGVtICYmIChpdGVtLmNvbnN0cnVjdG9yLnRvU3RyaW5nKCkuaW5kZXhPZignV2luZG93JykgIT09IC0xKSk7XG4gICAgfSxcblxuICAgIGdldEV2dFBvcyAoZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogZS5wYWdlWCxcbiAgICAgICAgICAgIHk6IGUucGFnZVlcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgZ2V0U2Nyb2xsUG9zIChuZCkge1xuICAgICAgICBpZiAobmQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdG9wOiBuZC5zY3JvbGxUb3AsXG4gICAgICAgICAgICAgICAgbGVmdDogbmQuc2Nyb2xsTGVmdFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wOiBNYXRoLm1heCh3aW5kb3cucGFnZVlPZmZzZXQgfHwgMCwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCksXG4gICAgICAgICAgICBsZWZ0OiBNYXRoLm1heCh3aW5kb3cucGFnZVhPZmZzZXQgfHwgMCwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0KVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZXREb21QYWdlSW5mbyAobmQpIHtcbiAgICAgICAgaWYgKG5kLmdldEJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIG5kLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHdpblNjcm9sbFBvcyA9IHRoaXMuZ2V0U2Nyb2xsUG9zKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IG5kLm9mZnNldFRvcCAtIHdpblNjcm9sbFBvcy50b3AsXG4gICAgICAgICAgICBsZWZ0OiBuZC5vZmZzZXRMZWZ0IC0gd2luU2Nyb2xsUG9zLmxlZnQsXG4gICAgICAgICAgICB3aWR0aDogbmQub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG5kLm9mZnNldEhlaWdodFxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZXREb21BYnNvbHV0ZUluZm8gKG5kKSB7XG4gICAgICAgIGxldCB3aW5TY3JvbGxQb3MgPSB0aGlzLmdldFNjcm9sbFBvcygpO1xuICAgICAgICBsZXQgcmVhY3RJbmZvID0gbmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogcmVhY3RJbmZvLnRvcCArIHdpblNjcm9sbFBvcy50b3AsXG4gICAgICAgICAgICBsZWZ0OiByZWFjdEluZm8ubGVmdCArIHdpblNjcm9sbFBvcy5sZWZ0LFxuICAgICAgICAgICAgd2lkdGg6IG5kLm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBuZC5vZmZzZXRIZWlnaHRcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgYWRkQ2xhc3MgKG5kLCBjbGFzc1N0cikge1xuICAgICAgICBpZiAobmQuY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICBuZC5jbGFzc0xpc3QuYWRkKGNsYXNzU3RyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjbGFzc0FyciA9IG5kLmNsYXNzTmFtZS5yZXBsYWNlKC9cXHN7Mix9L2csICcgJykuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgIGlmIChjbGFzc0Fyci5pbmRleE9mKGNsYXNzU3RyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjbGFzc0Fyci5wdXNoKGNsYXNzU3RyKTtcbiAgICAgICAgICAgICAgICBuZC5jbGFzc05hbWUgPSBjbGFzc0Fyci5qb2luKCcgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5kO1xuICAgIH0sXG5cbiAgICByZW1vdmVDbGFzcyAobmQsIGNsYXNzU3RyKSB7XG4gICAgICAgIGlmIChuZC5jbGFzc0xpc3QpIHtcbiAgICAgICAgICAgIG5kLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NTdHIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNsYXNzQXJyID0gbmQuY2xhc3NOYW1lLnJlcGxhY2UoL1xcc3syLH0vZywgJyAnKS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgbGV0IG15UG9zID0gY2xhc3NBcnIuaW5kZXhPZihjbGFzc1N0cik7XG4gICAgICAgICAgICBpZiAobXlQb3MgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NBcnIuc3BsaWNlKG15UG9zLCAxKTtcbiAgICAgICAgICAgICAgICBuZC5jbGFzc05hbWUgPSBjbGFzc0Fyci5qb2luKCcgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5kO1xuICAgIH0sXG5cbiAgICBhZGRFdmVudCAobmQsIGV2dFR5cGUsIGNiaykge1xuICAgICAgICBpZiAobmQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgISFuZC5hZGRFdmVudExpc3RlbmVyOlxuICAgICAgICAgICAgICAgICAgICBuZC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGNiaywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICEhbmQuYXR0YWNoRXZlbnQ6XG4gICAgICAgICAgICAgICAgICAgIG5kLmF0dGFjaEV2ZW50KGV2dFR5cGUsIGNiayk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIG5kWydvbicgKyBldnRUeXBlXSA9IGNiaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmQ7XG4gICAgfSxcblxuICAgIHJlbW92ZUV2ZW50IChuZCwgZXZ0VHlwZSwgY2JrKSB7XG4gICAgICAgIGlmIChuZCkge1xuICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAhIW5kLnJlbW92ZUV2ZW50TGlzdGVuZXI6XG4gICAgICAgICAgICAgICAgICAgIG5kLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgY2JrLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgISFuZC5kZXRhY2hFdmVudDpcbiAgICAgICAgICAgICAgICAgICAgbmQuZGV0YWNoRXZlbnQoZXZ0VHlwZSwgY2JrKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgbmRbJ29uJyArIGV2dFR5cGVdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmQ7XG4gICAgfSxcblxuICAgIHVuaWtleSAobGVuID0gMTYpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICBmb3IgKDsgcmVzdWx0Lmxlbmd0aCA8IGxlbjsgcmVzdWx0ICs9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQuc3Vic3RyKDAsIGxlbik7XG4gICAgfSxcblxuICAgIGtleUNyZWF0b3IgKHByZWZpeCA9ICdkJykge1xuICAgICAgICBsZXQga2V5QXJyID0gdGhpcy51bmlrZXkoOSkubWF0Y2goLy57MSwzfS9nKTtcbiAgICAgICAga2V5QXJyLnVuc2hpZnQocHJlZml4KTtcbiAgICAgICAgcmV0dXJuIGtleUFyci5qb2luKCctJyk7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgdXRpbHM7XG4iLCIvKipcbiAqIGRyYWctcmVzaXpl5Z+656GA5Y2V5YWDXG4gKi9cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgYm91bmRhcnkgZnJvbSAnLi9ib3VuZGFyeSc7XG5pbXBvcnQgUGxhY2Vob2xkZXIgZnJvbSAnLi9wbGFjZWhvbGRlcic7XG5pbXBvcnQgSGFuZGxlciBmcm9tICcuL2hhbmRsZXInO1xuXG5jb25zdCB7RHJhZ0hhbmRsZXIsIFJlc2l6ZUhhbmRsZXJ9ID0gSGFuZGxlcjtcbmNvbnN0IHZhbGlkUG9zaXRpb25WYWwgPSB7XG4gICAgcmVsYXRpdmU6IHRydWUsXG4gICAgYWJzb2x1dGU6IHRydWUsXG4gICAgZml4ZWQ6IHRydWVcbn07XG5jb25zdCB7Z2V0U3R5bGV9ID0gdXRpbHM7XG5cbmNvbnN0IGluZm9Ub1N0eWxlID0gKGN1cnJlbnRJbmZvID0ge30sIGVuYWJsZWRNYXAgPSB7fSkgPT4ge1xuICAgIGxldCBwYXJhbSA9IHt9O1xuICAgIGlmIChlbmFibGVkTWFwLmRyYWcpIHtcbiAgICAgICAgbGV0IHtsZWZ0LCB0b3B9ID0gY3VycmVudEluZm87XG4gICAgICAgIGlmIChsZWZ0IHx8IGxlZnQgPT09IDApIHtcbiAgICAgICAgICAgIHBhcmFtLmxlZnQgPSAobGVmdCB8fCAwKSArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvcCB8fCB0b3AgPT09IDApIHtcbiAgICAgICAgICAgIHBhcmFtLnRvcCA9ICh0b3AgfHwgMCkgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChlbmFibGVkTWFwLnJlc2l6ZSkge1xuICAgICAgICBsZXQge3dpZHRoLCBoZWlnaHR9ID0gY3VycmVudEluZm87XG4gICAgICAgIGlmICh3aWR0aCB8fCB3aWR0aCA9PT0gMCkge1xuICAgICAgICAgICAgcGFyYW0ud2lkdGggPSAod2lkdGggfHwgMCkgKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoZWlnaHQgfHwgaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICBwYXJhbS5oZWlnaHQgPSAoaGVpZ2h0IHx8IDApICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGFyYW07XG59O1xuXG5jbGFzcyBEcmFnUmVzaXplIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICAvLyDlrrnlmahwb3NpdGlvbuWxnuaAp1xuICAgICAgICB0aGlzLndyYXBwZXJQb3NpdGlvblN0eWxlID0gJ3JlbGF0aXZlJztcbiAgICAgICAgLy8g54K55Ye75pe277yM5Li75L2T5LiO54K55Ye75L2N572u55qE5beu5YC8XG4gICAgICAgIHRoaXMuaGFuZGxlT2Zmc2V0ID0ge3g6IDAsIHk6IDB9O1xuICAgICAgICAvLyDnqLPlrprmgIHnm5LlrZDlsLrlr7jkv6Hmga9cbiAgICAgICAgdGhpcy5zdGFibGVTb3VyZUluZm8gPSB7bGVmdDogMCwgdG9wOiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwfTtcbiAgICAgICAgLy8g5b2T5YmN5L+h5oGvXG4gICAgICAgIHRoaXMuY3VycmVudEluZm8gPSB7fTtcbiAgICAgICAgdGhpcy5jdXJyZW50SW5mb0NhY2hlID0ge307XG4gICAgICAgIHRoaXMubm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuaGFuZGxlID0ge307XG4gICAgICAgIC8vIOeItue6p+mmluS4quebuOWvueWumuS9jeeahOiKgueCue+8jOWcqOS9v+eUqOS6hue7neWvueWumuS9jeaOp+WItuaXtuS9v+eUqFxuICAgICAgICB0aGlzLnJlbGF0aXZlUGFyZW50SW5mbyA9IG51bGw7XG4gICAgICAgIC8vIOWGu+e7k1xuICAgICAgICB0aGlzLmZyb3plblggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mcm96ZW5ZID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZnJvemVuVyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZyb3plbkggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mcm96ZW5SZXNpemUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mcm96ZW5EcmFnID0gZmFsc2U7XG4gICAgICAgIC8vIOe9keagvFxuICAgICAgICB0aGlzLmdyaWRYID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ3JpZFkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub0dyaWQgPSB0cnVlO1xuICAgICAgICAvLyDlsLrlr7jpmZDliLZcbiAgICAgICAgdGhpcy53UmFuZ2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oUmFuZ2UgPSBmYWxzZTtcbiAgICAgICAgLy8g6L6555WM5qOA5rWL5Y+C5pWwXG4gICAgICAgIHRoaXMuYm91bmRQYXJhbXMgPSBudWxsO1xuICAgICAgICAvLyDnlKjlrprml7blmajoioLmtYFcbiAgICAgICAgdGhpcy5pbmdUaW1lciA9IG51bGw7XG4gICAgICAgIC8vIOi+heWKqWZpeGVk6IqC54K55LiN6LaF5Ye656qX5Y+jXG4gICAgICAgIHRoaXMubGltaXRXaW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy53aW5TaXplID0gbnVsbDtcbiAgICAgICAgdGhpcy5zY3JvbGxDYWNoZSA9IG51bGw7XG4gICAgICAgIHRoaXMubmVlZFJlZnJlc2hJbml0SW5mbyA9IGZhbHNlO1xuICAgICAgICAvLyDnlKjkuo7miYvmn4TnmoTljaDnlKjlhrLnqoHlpITnkIZcbiAgICAgICAgdGhpcy5zZWxmT2NjdXBpZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oYW5kbGVJbnN0TWFwID0ge307XG4gICAgfTtcblxuICAgIHN0YXRlID0ge1xuICAgICAgICBzdGF0dXM6ICdpZGxlJyxcbiAgICAgICAgY3VycmVudEluZm86IHt9LFxuICAgICAgICBzdHlsZToge31cbiAgICB9O1xuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLy8g5ouW5ou955qE5omL5p+E77yM5Y+v6YCJ5Li66IqC54K55oiW6ICF566A5Y2V55qE6YCJ5oup5ZmoXG4gICAgICAgIGRyYWdIYW5kbGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMubm9kZSwgUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgICAgICAgcmVzaXplSGFuZGxlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLm5vZGUsIFByb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gICAgICAgIC8vIOaLluaLveaXtueahOiKgua1gemXtOmameaXtumVv++8jOWNleS9jeS4um1zXG4gICAgICAgIGRlYm91bmNlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAvLyDovrnnlYzlj4LmlbDvvIzlj6/pgInkuLrvvJpcbiAgICAgICAgLy8g6IqC54K577ya6KGo56S65Zyo6K+l6IqC54K56IyD5Zu05YaF56e75Yqo77yMJ3BhcmVudCflhbPplK7or43vvJrooajnpLrlj6rog73lnKjlhbbniLboioLngrnlhoXnp7vliqhcbiAgICAgICAgYm91bmQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ub2RlLCBQcm9wVHlwZXMuc3RyaW5nXSksXG4gICAgICAgIC8vIOaLluaLveatpei/m++8jOWmgmdyaWQ6IFs1MCwgMTAwXeihqOekuuaLluaLvXjmlrnlkJHku6U1MOS4uuatpei/m++8jHnmlrnlkJHku6UxMDDkuLrmraXov5tcbiAgICAgICAgZ3JpZDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlciksXG4gICAgICAgIC8vIOWGu+e7k+aTjeS9nO+8jHR1cmXooajnpLrpg73lhrvnu5PvvIx46KGo56S65Ya757uTeOaWueWQke+8jHnooajnpLrlhrvnu5N55pa55ZCRXG4gICAgICAgIGZyb3plbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5vYmplY3RdKSxcbiAgICAgICAgc2l6ZVJhbmdlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAvLyDmmK/lkKblj5bmtojmi5bmi73vvIzlnKjmi5bmi73nu5PmnZ/ml7bmiafooYzvvIzlj6/pgInkuLp0cnVlKOebtOaOpei/lOWbninvvIxmdW5jdGlvbijliKTmlq3lkI7ov5Tlm550cnVl5pe25YiZ6L+U5ZueKVxuICAgICAgICBiZWZvcmVFbmQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ib29sLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgICAgICAvLyDmmK/lkKblvIDlkK9wbGFjZWhvbGRlcuaooeW8j++8jOivpeaooeW8j+S4i++8jOaLluaLvei/h+eoi+S4reS9v+eUqOeahOaYr+S4gOS4qui+heWKqeWdl++8jOe7k+adn+S5i+WQjuaJjeabtOaWsOS4u+S9k+S9jee9rlxuICAgICAgICBlbmFibGVQbGFjZWhvbGRlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIC8vIOi/m+ihjOaXtu+8jOS4jeWcqGJvZHnkuIrmt7vliqDovoXliqnnmoRjbGFzc1xuICAgICAgICBub0dsb2JhbENsYXNzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgLy8gcG9zaXRpb27kuLpmaXhlZOaXtuiHquWKqOmZkOWumuS4jei2heWHuueql+WPo1xuICAgICAgICBiZXR0ZXJGaXhlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIC8vIOS7peS4i+S4ieS4quWIhuWIq+S4uuaLluaLveW8gOWni++8jOaLluaLveS4re+8jOaLluaLvee7k+adn+eahOWbnuiwg++8jOaOpeaUtuS4ieS4quWPguaVsO+8mmV2ZW50LCDlvZPliY3kvY3nva7lj4LmlbDvvIzlnKjpobXpnaLkuIrnmoTkvY3nva5cbiAgICAgICAgb25TdGFydDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uUHJvY2VzczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRW5kOiBQcm9wVHlwZXMuZnVuY1xuICAgIH07XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBmcm96ZW46IGZhbHNlLFxuICAgICAgICBkZWJvdW5jZTogMTcsXG4gICAgICAgIGdyaWQ6IFtdLFxuICAgICAgICBiZXR0ZXJGaXhlZDogdHJ1ZSxcbiAgICAgICAgZW5hYmxlUGxhY2Vob2xkZXI6IGZhbHNlLFxuICAgICAgICBlbmFibGVkOiB7ZHJhZzogdHJ1ZSwgcmVzaXplOiB0cnVlfSxcbiAgICAgICAgb25TdGFydCAoKSB7fSxcbiAgICAgICAgb25Qcm9jZXNzICgpIHt9LFxuICAgICAgICBvbkVuZCAoKSB7fVxuICAgIH07XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQgKCkge1xuICAgICAgICB0aGlzLnBhcnNlRnJvemVuKCk7XG4gICAgICAgIHRoaXMucGFyc2VHcmlkKCk7XG4gICAgICAgIHRoaXMucGFyc2VTaXplUmFuZ2UoKTtcbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgICAgICB0aGlzLndyYXBwZXJQb3NpdGlvblN0eWxlID0gdGhpcy5wYXJzZU5kU3R5bGVQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLnBhcnNlSW5pdFN0eWxlKHRoaXMucHJvcHMsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEN1cnJlbnRJbmZvKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5mcmVzaFBhcmFtKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBhcnNlSGFuZGxlUGFyYW0oKTtcbiAgICAgICAgdGhpcy5wYXJzZUJvdW5kKCk7XG4gICAgfTtcblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95RXZ0KCk7XG4gICAgfTtcblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuICAgICAgICB0aGlzLm5lZWRSZWZyZXNoSW5pdEluZm8gPSB0cnVlO1xuICAgICAgICB0aGlzLmRlc3Ryb3lFdnQoKTtcbiAgICAgICAgdGhpcy53cmFwcGVyUG9zaXRpb25TdHlsZSA9IHRoaXMucGFyc2VOZFN0eWxlUG9zaXRpb24obmV4dFByb3BzKTtcbiAgICAgICAgdGhpcy5wYXJzZUZyb3plbihuZXh0UHJvcHMpO1xuICAgICAgICB0aGlzLnBhcnNlR3JpZChuZXh0UHJvcHMpO1xuICAgICAgICB0aGlzLnBhcnNlU2l6ZVJhbmdlKG5leHRQcm9wcyk7XG4gICAgICAgIHRoaXMucGFyc2VIYW5kbGVQYXJhbShuZXh0UHJvcHMpO1xuICAgICAgICB0aGlzLnBhcnNlQm91bmQoKTtcbiAgICAgICAgdGhpcy5wYXJzZUluaXRTdHlsZShuZXh0UHJvcHMsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEN1cnJlbnRJbmZvKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZGVzdHJveUV2dCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlLmRyYWcpIHtcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUV2ZW50KHRoaXMubm9kZS5vd25lckRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5sYXp5SGFuZGxlRHJhZ0luKTtcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUV2ZW50KHRoaXMubm9kZS5vd25lckRvY3VtZW50LCAnbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlLnJlc2l6ZSkge1xuICAgICAgICAgICAgdXRpbHMucmVtb3ZlRXZlbnQodGhpcy5ub2RlLm93bmVyRG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLmxhenlIYW5kbGVSZXNpemVJbik7XG4gICAgICAgICAgICB1dGlscy5yZW1vdmVFdmVudCh0aGlzLm5vZGUub3duZXJEb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLmhhbmRsZVJlc2l6ZUVuZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbmdUaW1lciAmJiBjbGVhclRpbWVvdXQodGhpcy5pbmdUaW1lcik7XG4gICAgICAgIHRoaXMuaW5nVGltZXIgPSBudWxsO1xuICAgIH07XG5cbiAgICBnZXRXcmFwcGVyTmQgPSAoY29tcCkgPT4ge1xuICAgICAgICB0aGlzLm5vZGUgPSBjb21wO1xuICAgIH07XG5cbiAgICAvLyDov5Tlm57liLDkuIrkuIDkuKrnqLPlrprmgIHkvY3nva5cbiAgICBiYWNrVG9QcmV2UG9zID0gKGNiaykgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnRJbmZvID0gdGhpcy5jdXJyZW50SW5mb0NhY2hlO1xuICAgICAgICBsZXQgc3R5bGVQYXJhbSA9IHRoaXMuYnVpbGRTdHlsZUJ5U3RhdGUodGhpcy5zdGF0ZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc3R5bGVQYXJhbSxcbiAgICAgICAgICAgIHN0YXR1czogJ2lkbGUnXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGNiayAmJiBjYmsoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIOWIneWni+WMlmN1cnJlbnRJbmZvXG4gICAgaW5pdEN1cnJlbnRJbmZvID0gKGZvcmNlID0gZmFsc2UpID0+IHtcbiAgICAgICAgaWYgKGZvcmNlIHx8IHRoaXMubmVlZFJlZnJlc2hJbml0SW5mbykge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5mbyA9IHRoaXMucGFyc2VTdHlsZVBhcmFtKCk7XG4gICAgICAgICAgICAvLyDliJ3lp4vnvJPlrZhcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZm9DYWNoZSA9IHsuLi50aGlzLmN1cnJlbnRJbmZvfTtcbiAgICAgICAgICAgIHRoaXMubmVlZFJlZnJlc2hJbml0SW5mbyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBwYXJzZUluaXRTdHlsZSA9IChwcm9wcyA9IHRoaXMucHJvcHMsIGNiaykgPT4ge1xuICAgICAgICBsZXQgc3R5bGVPcHRzID0gey4uLihwcm9wcy5zdHlsZSB8fCB7fSl9O1xuICAgICAgICBzdHlsZU9wdHMucG9zaXRpb24gPSB0aGlzLndyYXBwZXJQb3NpdGlvblN0eWxlO1xuICAgICAgICBpZiAoc3R5bGVPcHRzLnBvc2l0aW9uID09PSAnYWJzb2x1dGUnKSB7XG4gICAgICAgICAgICBpZiAocHJvcHMuZW5hYmxlZC5kcmFnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHlsZU9wdHMudG9wID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZU9wdHMudG9wID0gdGhpcy5ub2RlLm9mZnNldFRvcCArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3R5bGVPcHRzLmxlZnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlT3B0cy5sZWZ0ID0gdGhpcy5ub2RlLm9mZnNldExlZnQgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3R5bGVPcHRzLnBvc2l0aW9uID09PSAnZml4ZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmxpbWl0V2luID0gcHJvcHMuYmV0dGVyRml4ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzdHlsZVBhcmFtOiBzdHlsZU9wdHNcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgY2JrICYmIGNiaygpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcGFyc2VDb250ZW50ID0gKHByb3BzID0gdGhpcy5wcm9wcykgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZUluc3RNYXAgPSB7fTtcbiAgICAgICAgY29uc3QgZW5hYmxlZERyYWcgPSBwcm9wcy5lbmFibGVkLmRyYWc7XG4gICAgICAgIGNvbnN0IGVuYWJsZWRSZXNpemUgPSBwcm9wcy5lbmFibGVkLnJlc2l6ZTtcbiAgICAgICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcChwcm9wcy5jaGlsZHJlbiwgKENoaWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoIUNoaWxkIHx8ICFDaGlsZC50eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIENoaWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChDaGlsZC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBEcmFnSGFuZGxlcjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlbmFibGVkRHJhZyB8fCB0aGlzLmhhbmRsZUluc3RNYXBbJ2RyYWcnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENoaWxkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlSW5zdE1hcFsnZHJhZyddID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4uKENoaWxkLnByb3BzIHx8IHt9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9eyhuZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZS5kcmFnID0gbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVEcmFnU3RhcnR9Lz5cbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGNhc2UgUmVzaXplSGFuZGxlcjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlbmFibGVkUmVzaXplIHx8IHRoaXMuaGFuZGxlSW5zdE1hcFsncmVzaXplJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBDaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUluc3RNYXBbJ3Jlc2l6ZSddID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4uKENoaWxkLnByb3BzIHx8IHt9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9eyhuZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZS5yZXNpemUgPSBuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZVJlc2l6ZVN0YXJ0fS8+XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ2hpbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBzdHlsZeWPguaVsOmihOWkhOeQhlxuICAgIHBhcnNlTmRTdHlsZVBvc2l0aW9uID0gKHByb3BzID0gdGhpcy5wcm9wcykgPT4ge1xuICAgICAgICBsZXQgc3R5bGVPcHRzID0gcHJvcHMuc3R5bGUgfHwge307XG4gICAgICAgIGxldCB0YXJnZXRWYWwgPSAncmVsYXRpdmUnO1xuICAgICAgICBsZXQgbmRQb3NpdGlvbiA9IHN0eWxlT3B0cy5wb3NpdGlvbiB8fCB1dGlscy5nZXRTdHlsZSh0aGlzLm5vZGUsICdwb3NpdGlvbicpO1xuICAgICAgICBpZiAodmFsaWRQb3NpdGlvblZhbFtuZFBvc2l0aW9uXSkge1xuICAgICAgICAgICAgdGFyZ2V0VmFsID0gbmRQb3NpdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXRWYWw7XG4gICAgfTtcblxuICAgIHBhcnNlU3R5bGVQYXJhbSA9ICgpID0+IHtcbiAgICAgICAgbGV0IG1vZFN0eWxlID0gdXRpbHMuZ2V0U3R5bGUodGhpcy5ub2RlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IHV0aWxzLmdldE51bShtb2RTdHlsZS5sZWZ0KSxcbiAgICAgICAgICAgIHRvcDogdXRpbHMuZ2V0TnVtKG1vZFN0eWxlLnRvcCksXG4gICAgICAgICAgICB3aWR0aDogdXRpbHMuZ2V0TnVtKG1vZFN0eWxlLndpZHRoKSxcbiAgICAgICAgICAgIGhlaWdodDogdXRpbHMuZ2V0TnVtKG1vZFN0eWxlLmhlaWdodClcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLy8g6Kej5p6Q5omL5p+E5Y+C5pWwXG4gICAgcGFyc2VIYW5kbGVQYXJhbSA9IChwcm9wcyA9IHRoaXMucHJvcHMpID0+IHtcbiAgICAgICAgbGV0IHtkcmFnU2VsZiwgZW5hYmxlZH0gPSBwcm9wcztcbiAgICAgICAgaWYgKCF0aGlzLmhhbmRsZUluc3RNYXAuZHJhZykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGUuZHJhZyA9IChkcmFnU2VsZiAmJiBlbmFibGVkLmRyYWcpID8gJ3NlbGYnIDogbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyDop6PmnpDlhrvnu5Plj4LmlbBcbiAgICBwYXJzZUZyb3plbiA9IChwcm9wcyA9IHRoaXMucHJvcHMpID0+IHtcbiAgICAgICAgbGV0IHtmcm96ZW59ID0gcHJvcHM7XG4gICAgICAgIGxldCBmcm96ZW5UeXBlID0gdHlwZW9mIGZyb3plbjtcbiAgICAgICAgc3dpdGNoIChmcm96ZW5UeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICB0aGlzLmZyb3plblggPSB0aGlzLmZyb3plblkgPSB0aGlzLmZyb3plblcgPSB0aGlzLmZyb3plbkggPSBmcm96ZW47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgZnJvemVuID0gZnJvemVuLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5YID0gZnJvemVuID09PSAneCc7XG4gICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5ZID0gZnJvemVuID09PSAneSc7XG4gICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5XID0gZnJvemVuID09PSAndyc7XG4gICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5IID0gZnJvemVuID09PSAnaCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzT2JqZWN0KGZyb3plbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5YID0gISFmcm96ZW4ueDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5ZID0gISFmcm96ZW4ueTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5XID0gISFmcm96ZW4udztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5IID0gISFmcm96ZW4uaDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuWCA9IHRoaXMuZnJvemVuWSA9IHRoaXMuZnJvemVuVyA9IHRoaXMuZnJvemVuSCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZyb3plblJlc2l6ZSA9IHRoaXMuZnJvemVuVyAmJiB0aGlzLmZyb3plbkg7XG4gICAgICAgIHRoaXMuZnJvemVuRHJhZyA9IHRoaXMuZnJvemVuWCAmJiB0aGlzLmZyb3plblk7XG4gICAgfTtcblxuICAgIC8vIOino+aekOe9keagvOWPguaVsFxuICAgIHBhcnNlR3JpZCA9IChwcm9wcyA9IHRoaXMucHJvcHMpID0+IHtcbiAgICAgICAgbGV0IHtncmlkfSA9IHByb3BzO1xuICAgICAgICBpZiAoZ3JpZCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBncmlkID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFggPSB0aGlzLmdyaWRZID0gKGdyaWQgPiAwID8gZ3JpZCA6IGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoZ3JpZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRYID0gZ3JpZFswXSB8fCBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRZID0gZ3JpZFsxXSB8fCBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFggPSB0aGlzLmdyaWRZID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdyaWRYID0gdGhpcy5ncmlkWSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9HcmlkID0gKHRoaXMuZ3JpZFggPT09IHRoaXMuZ3JpZFkgJiYgdGhpcy5naXJkWCA9PT0gZmFsc2UpO1xuICAgIH07XG5cbiAgICAvLyDop6PmnpDlsLrlr7jpmZDliLZcbiAgICBwYXJzZVNpemVSYW5nZSA9IChwcm9wcyA9IHRoaXMucHJvcHMpID0+IHtcbiAgICAgICAgbGV0IHtzaXplUmFuZ2V9ID0gcHJvcHM7XG4gICAgICAgIGxldCB3UmFuZ2UgPSBmYWxzZTtcbiAgICAgICAgbGV0IGhSYW5nZSA9IGZhbHNlO1xuICAgICAgICBpZiAoc2l6ZVJhbmdlKSB7XG4gICAgICAgICAgICBpZiAoc2l6ZVJhbmdlLncpIHtcbiAgICAgICAgICAgICAgICBsZXQgW3dNaW4sIHdNYXhdID0gc2l6ZVJhbmdlLnc7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3TWluICE9PSAnbnVtYmVyJyB8fCB3TWluIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB3TWluID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3TWF4ICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB3TWF4ID0gSW5maW5pdHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh3TWluIDw9IHdNYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgd1JhbmdlID0gW3dNaW4sIHdNYXhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaXplUmFuZ2UuaCkge1xuICAgICAgICAgICAgICAgIGxldCBbaE1pbiwgaE1heF0gPSBzaXplUmFuZ2UuaDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGhNaW4gIT09ICdudW1iZXInIHx8IGhNaW4gPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGhNaW4gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGhNYXggIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGhNYXggPSBJbmZpbml0eTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGhNaW4gPD0gaE1heCkge1xuICAgICAgICAgICAgICAgICAgICBoUmFuZ2UgPSBbaE1pbiwgaE1heF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMud1JhbmdlID0gd1JhbmdlO1xuICAgICAgICB0aGlzLmhSYW5nZSA9IGhSYW5nZTtcbiAgICB9O1xuXG4gICAgLy8g6Kej5p6Q6L6555WM57qm5p2fXG4gICAgcGFyc2VCb3VuZCA9IChwcm9wcyA9IHRoaXMucHJvcHMpID0+IHtcbiAgICAgICAgbGV0IHtib3VuZH0gPSBwcm9wcztcbiAgICAgICAgaWYgKCFib3VuZCAmJiAhdGhpcy5saW1pdFdpbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXNvbHZlRHJhZ0JvdW5kO1xuICAgICAgICBsZXQgcmVzb2x2ZVJlc2l6ZUJvdW5kO1xuICAgICAgICBsZXQgcHJlUmVzb2x2ZUJvdW5kO1xuICAgICAgICBsZXQgZ2V0QXZhaWxhYmxlUGFyYW07XG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgICAgY2FzZSBib3VuZCA9PT0gJ3BhcmVudCc6XG4gICAgICAgICAgICAgICAgZ2V0QXZhaWxhYmxlUGFyYW0gPSAoKSA9PiAodGhpcy5ub2RlLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIHV0aWxzLmlzTm9kZShib3VuZCk6XG4gICAgICAgICAgICAgICAgaWYgKCFib3VuZC5jb250YWlucyh0aGlzLm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBnZXRBdmFpbGFibGVQYXJhbSA9ICgpID0+IChib3VuZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgdGhpcy5saW1pdFdpbjpcbiAgICAgICAgICAgICAgICBnZXRBdmFpbGFibGVQYXJhbSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnZXRBdmFpbGFibGVQYXJhbSkge1xuICAgICAgICAgICAgcHJlUmVzb2x2ZUJvdW5kID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhdmFpbGFibGVQYXJhbSA9IGdldEF2YWlsYWJsZVBhcmFtKCk7XG4gICAgICAgICAgICAgICAgbGV0IGJQYXJhbXMgPSB0aGlzLmJvdW5kUGFyYW1zID0gYXZhaWxhYmxlUGFyYW0gJiZcbiAgICAgICAgICAgICAgICAgICAgYm91bmRhcnkuY2FsY0F2YWlsYWJsZVpvbmUoYXZhaWxhYmxlUGFyYW0sIHRoaXMucmVsYXRpdmVQYXJlbnRJbmZvLCB0aGlzLndyYXBwZXJQb3NpdGlvblN0eWxlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5saW1pdFdpbikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFNjcm9sbFBvcyA9IHRoaXMuc2Nyb2xsQ2FjaGUgPSB1dGlscy5nZXRTY3JvbGxQb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5TaXplID0gdXRpbHMuZ2V0V2luU2l6ZSh0aGlzLm5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBiUGFyYW1zLnhbMF0gLT0gY3VycmVudFNjcm9sbFBvcy5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICBiUGFyYW1zLnhbMV0gLT0gY3VycmVudFNjcm9sbFBvcy5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICBiUGFyYW1zLnlbMF0gLT0gY3VycmVudFNjcm9sbFBvcy50b3A7XG4gICAgICAgICAgICAgICAgICAgIGJQYXJhbXMueVsxXSAtPSBjdXJyZW50U2Nyb2xsUG9zLnRvcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXNvbHZlRHJhZ0JvdW5kID0gKHByZXZJbmZvLCBuZXdJbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmJvdW5kUGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdJbmZvO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgW3N0YXJ0WCwgZW5kWF0gPSB0aGlzLmJvdW5kUGFyYW1zLng7XG4gICAgICAgICAgICAgICAgbGV0IFtzdGFydFksIGVuZFldID0gdGhpcy5ib3VuZFBhcmFtcy55O1xuICAgICAgICAgICAgICAgIGxldCB7bGVmdCwgdG9wfSA9IG5ld0luZm87XG4gICAgICAgICAgICAgICAgbGV0IHJpZ2h0ID0gbGVmdCArIG5ld0luZm8ud2lkdGg7XG4gICAgICAgICAgICAgICAgbGV0IGJvdHRvbSA9IHRvcCArIG5ld0luZm8uaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGlmIChsZWZ0IDwgc3RhcnRYKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0luZm8ubGVmdCA9IHN0YXJ0WDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmlnaHQgPiBlbmRYKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXhlZExlZnQgPSBlbmRYIC0gbmV3SW5mby53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpeGVkTGVmdCA+PSBzdGFydFgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0luZm8ubGVmdCA9IGVuZFggLSBuZXdJbmZvLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0b3AgPCBzdGFydFkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3SW5mby50b3AgPSBzdGFydFk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGJvdHRvbSA+IGVuZFkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpeGVkVG9wID0gZW5kWSAtIG5ld0luZm8uaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZml4ZWRUb3AgPj0gc3RhcnRZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJbmZvLnRvcCA9IGVuZFkgLSBuZXdJbmZvLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdJbmZvID0gdGhpcy5yZXNvbHZlRHJhZ1dpbkxpbWl0KG5ld0luZm8pO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdJbmZvO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlc29sdmVSZXNpemVCb3VuZCA9IChwcmV2SW5mbywgbmV3SW5mbykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5ib3VuZFBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3SW5mbztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IFtzdGFydFgsIGVuZFhdID0gdGhpcy5ib3VuZFBhcmFtcy54O1xuICAgICAgICAgICAgICAgIGxldCBbc3RhcnRZLCBlbmRZXSA9IHRoaXMuYm91bmRQYXJhbXMueTtcbiAgICAgICAgICAgICAgICBsZXQge2xlZnQsIHRvcH0gPSBuZXdJbmZvO1xuICAgICAgICAgICAgICAgIGxldCByaWdodCA9IGxlZnQgKyBuZXdJbmZvLndpZHRoO1xuICAgICAgICAgICAgICAgIGxldCBib3R0b20gPSB0b3AgKyBuZXdJbmZvLmhlaWdodDtcbiAgICAgICAgICAgICAgICBpZiAobGVmdCA8IHN0YXJ0WCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdJbmZvLndpZHRoID0gcHJldkluZm8ud2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJpZ2h0ID4gZW5kWCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdJbmZvLndpZHRoID0gZW5kWCAtIGxlZnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0b3AgPCBzdGFydFkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3SW5mby5oZWlnaHQgPSBwcmV2SW5mby5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGJvdHRvbSA+IGVuZFkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3SW5mby5oZWlnaHQgPSBlbmRZIC0gdG9wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdJbmZvID0gdGhpcy5yZXNvbHZlUmVzaXplV2luTGltaXQobmV3SW5mbyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld0luZm87XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZURyYWdCb3VuZCA9IChwcmV2SW5mbywgbmV3SW5mbykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdJbmZvO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlc29sdmVSZXNpemVCb3VuZCA9IChwcmV2SW5mbywgbmV3SW5mbykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdJbmZvO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHByZVJlc29sdmVCb3VuZCA9ICgpID0+IHt9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzb2x2ZURyYWdCb3VuZCA9IHJlc29sdmVEcmFnQm91bmQ7XG4gICAgICAgIHRoaXMucmVzb2x2ZVJlc2l6ZUJvdW5kID0gcmVzb2x2ZVJlc2l6ZUJvdW5kO1xuICAgICAgICB0aGlzLnByZVJlc29sdmVCb3VuZCA9IHByZVJlc29sdmVCb3VuZDtcbiAgICB9O1xuXG4gICAgLy8gYmV0dGVyRml4ZWRcbiAgICByZXNvbHZlRHJhZ1dpbkxpbWl0ID0gKG5ld0luZm8pID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmxpbWl0V2luKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3SW5mbztcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2Nyb2xsU2l6ZSA9IHV0aWxzLmdldFNjcm9sbFBvcygpO1xuICAgICAgICBsZXQgd2luU2l6ZSA9IHRoaXMud2luU2l6ZTtcbiAgICAgICAgbGV0IG9mZnNldEwgPSBzY3JvbGxTaXplLmxlZnQgLSB0aGlzLnNjcm9sbENhY2hlLmxlZnQ7XG4gICAgICAgIGxldCBvZmZzZXRWID0gc2Nyb2xsU2l6ZS50b3AgLSB0aGlzLnNjcm9sbENhY2hlLnRvcDtcbiAgICAgICAgbmV3SW5mby5sZWZ0IC09IG9mZnNldEw7XG4gICAgICAgIG5ld0luZm8udG9wIC09IG9mZnNldFY7XG4gICAgICAgIGxldCByaWdodCA9IG5ld0luZm8ubGVmdCArIG5ld0luZm8ud2lkdGg7XG4gICAgICAgIGxldCBib3R0b20gPSBuZXdJbmZvLnRvcCArIG5ld0luZm8uaGVpZ2h0O1xuICAgICAgICBpZiAobmV3SW5mby50b3AgPCAwKSB7XG4gICAgICAgICAgICBuZXdJbmZvLnRvcCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJpZ2h0ID4gd2luU2l6ZS53aWR0aCkge1xuICAgICAgICAgICAgbGV0IG5ld0xlZnQgPSB3aW5TaXplLndpZHRoIC0gbmV3SW5mby53aWR0aDtcbiAgICAgICAgICAgIGlmIChuZXdMZWZ0ID49IDApIHtcbiAgICAgICAgICAgICAgICBuZXdJbmZvLmxlZnQgPSBuZXdMZWZ0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdJbmZvLmxlZnQgPCAwKSB7XG4gICAgICAgICAgICBuZXdJbmZvLmxlZnQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib3R0b20gPiB3aW5TaXplLmhlaWdodCkge1xuICAgICAgICAgICAgbGV0IG5ld1RvcCA9IHdpblNpemUuaGVpZ2h0IC0gbmV3SW5mby5oZWlnaHQ7XG4gICAgICAgICAgICBpZiAobmV3VG9wID49IDApIHtcbiAgICAgICAgICAgICAgICBuZXdJbmZvLnRvcCA9IG5ld1RvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3SW5mbztcbiAgICB9O1xuXG4gICAgcmVzb2x2ZVJlc2l6ZVdpbkxpbWl0ID0gKG5ld0luZm8pID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmxpbWl0V2luKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3SW5mbztcbiAgICAgICAgfVxuICAgICAgICBsZXQgd2luU2l6ZSA9IHRoaXMud2luU2l6ZTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gbmV3SW5mby5sZWZ0ICsgbmV3SW5mby53aWR0aDtcbiAgICAgICAgbGV0IGJvdHRvbSA9IG5ld0luZm8udG9wICsgbmV3SW5mby5oZWlnaHQ7XG4gICAgICAgIGlmIChyaWdodCA+IHdpblNpemUud2lkdGgpIHtcbiAgICAgICAgICAgIGxldCBuZXdXID0gd2luU2l6ZS53aWR0aCAtIG5ld0luZm8ubGVmdDtcbiAgICAgICAgICAgIGlmIChuZXdXID49ICh0aGlzLndSYW5nZSA/IHRoaXMud1JhbmdlWzBdIDogMCkpIHtcbiAgICAgICAgICAgICAgICBuZXdJbmZvLndpZHRoID0gbmV3VztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYm90dG9tID4gd2luU2l6ZS5oZWlnaHQpIHtcbiAgICAgICAgICAgIGxldCBuZXdIID0gd2luU2l6ZS5oZWlnaHQgLSBuZXdJbmZvLnRvcDtcbiAgICAgICAgICAgIGlmIChuZXdIID49ICh0aGlzLmhSYW5nZSA/IHRoaXMuaFJhbmdlWzBdIDogMCkpIHtcbiAgICAgICAgICAgICAgICBuZXdJbmZvLmhlaWdodCA9IG5ld0g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0luZm87XG4gICAgfTtcblxuICAgIC8vIOmihOino+aekOi+ueeVjO+8jOWcqGFjdGlvbuW8gOWni+aXtuiwg+eUqFxuICAgIC8vIOeUn+aIkOWunuaXtuino+aekOi+ueeVjOWPguaVsOS4reS+nei1lueahOWAvFxuICAgIHByZVJlc29sdmVCb3VuZCA9ICgpID0+IHt9O1xuXG4gICAgLy8g5a6e5pe26Kej5p6Q6L6555WM5Y+C5pWwXG4gICAgcmVzb2x2ZURyYWdCb3VuZCA9IChwcmV2SW5mbywgbmV3SW5mbykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3SW5mbztcbiAgICB9O1xuXG4gICAgLy8g5a6e5pe26Kej5p6Q6L6555WM5Y+C5pWwXG4gICAgcmVzb2x2ZVJlc2l6ZUJvdW5kID0gKHByZXZJbmZvLCBuZXdJbmZvKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXdJbmZvO1xuICAgIH07XG5cbiAgICAvLyDlrp7ml7bop6PmnpDlhrvnu5Plj4LmlbBcbiAgICByZXNvbHZlRnJvemVuID0gKHByZXZJbmZvLCBuZXdJbmZvKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmZyb3plblgpIHtcbiAgICAgICAgICAgIG5ld0luZm8ubGVmdCA9IHByZXZJbmZvLmxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZnJvemVuWSkge1xuICAgICAgICAgICAgbmV3SW5mby50b3AgPSBwcmV2SW5mby50b3A7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZnJvemVuVykge1xuICAgICAgICAgICAgbmV3SW5mby53aWR0aCA9IHByZXZJbmZvLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZyb3plbkgpIHtcbiAgICAgICAgICAgIG5ld0luZm8uaGVpZ2h0ID0gcHJldkluZm8uaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdJbmZvO1xuICAgIH07XG5cbiAgICAvLyDlrp7ml7bop6PmnpDnvZHmoLzmi5bmi71cbiAgICByZXNvbHZlRHJhZ0dyaWQgPSAocHJldkluZm8sIG5ld0luZm8pID0+IHtcbiAgICAgICAgaWYgKHRoaXMubm9HcmlkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3SW5mbztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ncmlkWCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGxldCBvZmZzZXRMZWZ0ID0gbmV3SW5mby5sZWZ0IC0gcHJldkluZm8ubGVmdDtcbiAgICAgICAgICAgIGlmIChvZmZzZXRMZWZ0KSB7XG4gICAgICAgICAgICAgICAgbGV0IGdyaWROID0gTWF0aC5yb3VuZChvZmZzZXRMZWZ0IC8gdGhpcy5ncmlkWCk7XG4gICAgICAgICAgICAgICAgbmV3SW5mby5sZWZ0ID0gcHJldkluZm8ubGVmdCArIGdyaWROICogdGhpcy5ncmlkWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ncmlkWSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGxldCBvZmZzZXRUb3AgPSBuZXdJbmZvLnRvcCAtIHByZXZJbmZvLnRvcDtcbiAgICAgICAgICAgIGlmIChvZmZzZXRUb3ApIHtcbiAgICAgICAgICAgICAgICBsZXQgZ3JpZE4gPSBNYXRoLnJvdW5kKG9mZnNldFRvcCAvIHRoaXMuZ3JpZFkpO1xuICAgICAgICAgICAgICAgIG5ld0luZm8udG9wID0gcHJldkluZm8udG9wICsgZ3JpZE4gKiB0aGlzLmdyaWRZO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdJbmZvO1xuICAgIH07XG5cbiAgICAvLyDlrp7ml7bop6PmnpDnvZHmoLxyZXNpemVcbiAgICByZXNvbHZlUmVzaXplR3JpZCA9IChwcmV2SW5mbywgbmV3SW5mbykgPT4ge1xuICAgICAgICBpZiAodGhpcy5ub0dyaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXdJbmZvO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmdyaWRYICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgbGV0IG9mZnNldFdpZHRoID0gbmV3SW5mby53aWR0aCAtIHByZXZJbmZvLndpZHRoO1xuICAgICAgICAgICAgaWYgKG9mZnNldFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGdyaWROID0gTWF0aC5yb3VuZChvZmZzZXRXaWR0aCAvIHRoaXMuZ3JpZFgpO1xuICAgICAgICAgICAgICAgIG5ld0luZm8ud2lkdGggPSBwcmV2SW5mby53aWR0aCArIGdyaWROICogdGhpcy5ncmlkWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ncmlkWSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGxldCBvZmZzZXRIZWlnaHQgPSBuZXdJbmZvLmhlaWdodCAtIHByZXZJbmZvLmhlaWdodDtcbiAgICAgICAgICAgIGlmIChvZmZzZXRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBsZXQgZ3JpZE4gPSBNYXRoLnJvdW5kKG9mZnNldEhlaWdodCAvIHRoaXMuZ3JpZFkpO1xuICAgICAgICAgICAgICAgIG5ld0luZm8uaGVpZ2h0ID0gcHJldkluZm8uaGVpZ2h0ICsgZ3JpZE4gKiB0aGlzLmdyaWRZO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdJbmZvO1xuICAgIH07XG5cbiAgICAvLyDlrp7ml7bop6PmnpDlsLrlr7jpmZDliLZcbiAgICByZXNvbHZlU2l6ZVJhbmdlID0gKHByZXZJbmZvLCBuZXdJbmZvKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLndSYW5nZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGxldCBbd01pbiwgd01heF0gPSB0aGlzLndSYW5nZTtcbiAgICAgICAgICAgIGlmIChuZXdJbmZvLndpZHRoID4gd01heCkge1xuICAgICAgICAgICAgICAgIG5ld0luZm8ud2lkdGggPSB3TWF4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3SW5mby53aWR0aCA8IHdNaW4pIHtcbiAgICAgICAgICAgICAgICBuZXdJbmZvLndpZHRoID0gd01pbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oUmFuZ2UgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBsZXQgW2hNaW4sIGhNYXhdID0gdGhpcy5oUmFuZ2U7XG4gICAgICAgICAgICBpZiAobmV3SW5mby5oZWlnaHQgPiBoTWF4KSB7XG4gICAgICAgICAgICAgICAgbmV3SW5mby5oZWlnaHQgPSBoTWF4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3SW5mby5oZWlnaHQgPCBoTWluKSB7XG4gICAgICAgICAgICAgICAgbmV3SW5mby5oZWlnaHQgPSBoTWluO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdJbmZvO1xuICAgIH07XG5cbiAgICAvLyDku450aGlzLmN1cnJlbnRJbmZv5Y+C5pWw5ZKMc3RhdGXkuK3op6PmnpDlh7rmi5bmi73kvZPnmoTmoLflvI9cbiAgICBidWlsZFN0eWxlQnlTdGF0ZSA9IChzdGF0ZSA9IHRoaXMuc3RhdGUsIGN1cnJlbnRJbmZvID0gdGhpcy5jdXJyZW50SW5mbykgPT4ge1xuICAgICAgICBsZXQge3N0eWxlUGFyYW0gPSB7fX0gPSBzdGF0ZTtcbiAgICAgICAgbGV0IHtlbmFibGVkfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGxldCBwb3NTdHlsZSA9IGluZm9Ub1N0eWxlKGN1cnJlbnRJbmZvLCBlbmFibGVkKTtcbiAgICAgICAgc3R5bGVQYXJhbSA9IHsuLi5zdHlsZVBhcmFtfTtcbiAgICAgICAgc3R5bGVQYXJhbSA9IHV0aWxzLm1lcmdlKHN0eWxlUGFyYW0sIHBvc1N0eWxlKTtcbiAgICAgICAgc3R5bGVQYXJhbS5wb3NpdGlvbiA9IHRoaXMud3JhcHBlclBvc2l0aW9uU3R5bGU7XG4gICAgICAgIHJldHVybiBzdHlsZVBhcmFtO1xuICAgIH07XG5cbiAgICAvLyDojrflj5bmnIDov5HkuIDkuKpyZWxhdGl2ZeeahOeItue6p+iKgueCuSjoh6rouqvkuLpyZWxhdGl2ZeaXtu+8jOWwhuWfuuS6jueItue6p+iKgueCuSlcbiAgICBnZXRSZWxhdGl2ZVBhcmVudEluZm8gPSAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlUG9zaXRpb24gPSB1dGlscy5nZXRTdHlsZSh0aGlzLm5vZGUsICdwb3NpdGlvbicpO1xuICAgICAgICBsZXQgcGFyZW50TmQgPSB0aGlzLm5vZGU7XG4gICAgICAgIC8vICjoh6rouqvkuLpyZWxhdGl2ZeaXtu+8jOWwhuWfuuS6jueItue6p+iKgueCuSlcbiAgICAgICAgaWYgKG5vZGVQb3NpdGlvbiAhPT0gJ3JlbGF0aXZlJykge1xuICAgICAgICAgICAgcGFyZW50TmQgPSB0aGlzLm5vZGUub2Zmc2V0UGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50TmQgPSB0aGlzLm5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmRTdHlsZSA9IGdldFN0eWxlKHBhcmVudE5kKTtcbiAgICAgICAgbGV0IG5kSW5mbyA9IHV0aWxzLmdldERvbUFic29sdXRlSW5mbyhwYXJlbnROZCk7XG5cbiAgICAgICAgbmRJbmZvLmxlZnQgKz0gcGFyc2VGbG9hdChuZFN0eWxlLmJvcmRlckxlZnRXaWR0aCB8fCAwLCAxMCk7XG4gICAgICAgIG5kSW5mby50b3AgKz0gcGFyc2VGbG9hdChuZFN0eWxlLmJvcmRlclRvcFdpZHRoIHx8IDAsIDEwKTtcbiAgICAgICAgcmV0dXJuIG5kSW5mbztcbiAgICB9O1xuXG4gICAgZnJlc2hQYXJhbSA9IChwcm9wcyA9IHRoaXMucHJvcHMpID0+IHtcbiAgICAgICAgbGV0IHtjdXJyZW50SW5mb30gPSB0aGlzO1xuICAgICAgICB0aGlzLnN0YWJsZVNvdXJlSW5mbyA9IHV0aWxzLmdldERvbUFic29sdXRlSW5mbyh0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLnN0YWJsZVNvdXJlSW5mby5sZWZ0IC09IGN1cnJlbnRJbmZvLmxlZnQ7XG4gICAgICAgIHRoaXMuc3RhYmxlU291cmVJbmZvLnRvcCAtPSBjdXJyZW50SW5mby50b3A7XG4gICAgICAgIHRoaXMucmVsYXRpdmVQYXJlbnRJbmZvID0gdGhpcy5nZXRSZWxhdGl2ZVBhcmVudEluZm8oKTtcbiAgICAgICAgaWYgKHRoaXMud3JhcHBlclBvc2l0aW9uU3R5bGUgPT09ICdmaXhlZCcgJiYgcHJvcHMuYmV0dGVyRml4ZWQpIHtcbiAgICAgICAgICAgIHRoaXMubGltaXRXaW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5saW1pdFdpbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGhhbmRsZVN0YXJ0ID0gKGUsIGFjdCwgcGFyYW1zKSA9PiB7XG4gICAgICAgICF0aGlzLnByb3BzLm5vR2xvYmFsQ2xhc3MgJiZcbiAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKHRoaXMubm9kZS5vd25lckRvY3VtZW50LmJvZHksIGBkZy1hY3RpdmUtJHthY3R9YCk7XG4gICAgICAgIHRoaXMucHJvcHMub25TdGFydChlLCBhY3QsIHBhcmFtcyk7XG4gICAgfTtcblxuICAgIGhhbmRsZVByb2Nlc3MgPSAoZSwgYWN0LCBwYXJhbXMpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblByb2Nlc3MoZSwgYWN0LCBwYXJhbXMpO1xuICAgIH07XG5cbiAgICBoYW5kbGVFbmQgPSAoZSwgYWN0LCBwYXJhbXMpID0+IHtcbiAgICAgICAgIXRoaXMucHJvcHMubm9HbG9iYWxDbGFzcyAmJlxuICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3ModGhpcy5ub2RlLm93bmVyRG9jdW1lbnQuYm9keSwgYGRnLWFjdGl2ZS0ke2FjdH1gKTtcbiAgICAgICAgdGhpcy5jdXJyZW50SW5mb0NhY2hlID0gey4uLnRoaXMuY3VycmVudEluZm99O1xuICAgICAgICB0aGlzLnByb3BzLm9uRW5kKGUsIGFjdCwgcGFyYW1zKTtcbiAgICB9O1xuXG4gICAgaGFuZGxlRHJhZ1N0YXJ0ID0gKGUpID0+IHtcbiAgICAgICAgbGV0IHByb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgaWYgKHByb3BzLmZyb3plbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBlbCA9IGUudGFyZ2V0O1xuICAgICAgICAvLyDkuKTmk43kvZzlhrLnqoFcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlLnJlc2l6ZSAmJiB0aGlzLmhhbmRsZS5yZXNpemUuY29udGFpbnMoZWwpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZVJlc29sdmVCb3VuZCgpO1xuICAgICAgICB0aGlzLmZyZXNoUGFyYW0oKTtcbiAgICAgICAgbGV0IGV2dFBvcyA9IHV0aWxzLmdldEV2dFBvcyhlKTtcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgbGV0IHtjdXJyZW50SW5mb30gPSB0aGlzO1xuICAgICAgICBsZXQgc3RhYmxlU291cmVJbmZvID0gdGhpcy5zdGFibGVTb3VyZUluZm87XG4gICAgICAgIHRoaXMuaGFuZGxlT2Zmc2V0ID0ge1xuICAgICAgICAgICAgeDogZXZ0UG9zLnggLSBzdGFibGVTb3VyZUluZm8ubGVmdCAtIGN1cnJlbnRJbmZvLmxlZnQsXG4gICAgICAgICAgICB5OiBldnRQb3MueSAtIHN0YWJsZVNvdXJlSW5mby50b3AgLSBjdXJyZW50SW5mby50b3BcbiAgICAgICAgfTtcblxuICAgICAgICB1dGlscy5hZGRFdmVudCh0aGlzLm5vZGUub3duZXJEb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMubGF6eUhhbmRsZURyYWdJbik7XG4gICAgICAgIHV0aWxzLmFkZEV2ZW50KHRoaXMubm9kZS5vd25lckRvY3VtZW50LCAnbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCk7XG4gICAgICAgIHN0YXRlLnN0YXR1cyA9ICdhY3RpdmUnO1xuICAgICAgICBzdGF0ZS5zdHlsZVBhcmFtID0gdGhpcy5idWlsZFN0eWxlQnlTdGF0ZShzdGF0ZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU3RhcnQoZSwgJ2RyYWcnLCB7Li4uY3VycmVudEluZm99KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIOiKgua1gVxuICAgIGxhenlIYW5kbGVEcmFnSW4gPSAoZSkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5nVGltZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaW5nVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZURyYWdJbihlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluZ1RpbWVyID0gbnVsbDtcbiAgICAgICAgICAgIH0sIHRoaXMucHJvcHMuZGVib3VuY2UpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGhhbmRsZURyYWdJbiA9IChlKSA9PiB7XG4gICAgICAgIGxldCBwb3MgPSB1dGlscy5nZXRFdnRQb3MoZSk7XG4gICAgICAgIGxldCBzdGFibGVTb3VyZUluZm8gPSB0aGlzLnN0YWJsZVNvdXJlSW5mbztcbiAgICAgICAgbGV0IGhhbmRsZU9mZnNldCA9IHRoaXMuaGFuZGxlT2Zmc2V0O1xuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBsZXQgcHJldkN1cnJlbnRJbmZvID0gdGhpcy5jdXJyZW50SW5mbztcbiAgICAgICAgbGV0IG5ld0N1cnJlbnRJbmZvID0ge1xuICAgICAgICAgICAgbGVmdDogcG9zLnggLSBzdGFibGVTb3VyZUluZm8ubGVmdCAtIGhhbmRsZU9mZnNldC54LFxuICAgICAgICAgICAgdG9wOiBwb3MueSAtIHN0YWJsZVNvdXJlSW5mby50b3AgLSBoYW5kbGVPZmZzZXQueSxcbiAgICAgICAgICAgIHdpZHRoOiBwcmV2Q3VycmVudEluZm8ud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHByZXZDdXJyZW50SW5mby5oZWlnaHRcbiAgICAgICAgfTtcblxuICAgICAgICBuZXdDdXJyZW50SW5mbyA9IHRoaXMucmVzb2x2ZUZyb3plbihwcmV2Q3VycmVudEluZm8sIG5ld0N1cnJlbnRJbmZvKTtcbiAgICAgICAgbmV3Q3VycmVudEluZm8gPSB0aGlzLnJlc29sdmVEcmFnR3JpZChwcmV2Q3VycmVudEluZm8sIG5ld0N1cnJlbnRJbmZvKTtcbiAgICAgICAgbmV3Q3VycmVudEluZm8gPSB0aGlzLnJlc29sdmVEcmFnQm91bmQocHJldkN1cnJlbnRJbmZvLCBuZXdDdXJyZW50SW5mbyk7XG4gICAgICAgIHRoaXMuY3VycmVudEluZm8gPSBuZXdDdXJyZW50SW5mbztcbiAgICAgICAgc3RhdGUuc3R5bGVQYXJhbSA9IHRoaXMuYnVpbGRTdHlsZUJ5U3RhdGUoc3RhdGUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVByb2Nlc3MoZSwgJ2RyYWcnLCB7Li4udGhpcy5jdXJyZW50SW5mb30pO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaGFuZGxlRHJhZ0VuZCA9IChlKSA9PiB7XG4gICAgICAgIHV0aWxzLnJlbW92ZUV2ZW50KHRoaXMubm9kZS5vd25lckRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5sYXp5SGFuZGxlRHJhZ0luKTtcbiAgICAgICAgdXRpbHMucmVtb3ZlRXZlbnQodGhpcy5ub2RlLm93bmVyRG9jdW1lbnQsICdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kKTtcbiAgICAgICAgbGV0IGN1cnJlbnRJbmZvID0gdGhpcy5jdXJyZW50SW5mbztcbiAgICAgICAgbGV0IGJlZm9yZUVuZCA9IHRoaXMucHJvcHMuYmVmb3JlRW5kO1xuICAgICAgICBsZXQgZW5kQ29weUluZm8gPSB7Li4uY3VycmVudEluZm99O1xuICAgICAgICBsZXQgdmFsaWRGbGFnID0gdHJ1ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBiZWZvcmVFbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBhYnNvbHV0ZUluZm8gPSB1dGlscy5nZXREb21BYnNvbHV0ZUluZm8odGhpcy5ub2RlKTtcbiAgICAgICAgICAgIHZhbGlkRmxhZyA9IGJlZm9yZUVuZChlLCAnZHJhZycsIHsuLi5jdXJyZW50SW5mb30sIGFic29sdXRlSW5mbykgIT09IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFsaWRGbGFnID0gYmVmb3JlRW5kICE9PSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXZhbGlkRmxhZykge1xuICAgICAgICAgICAgdGhpcy5iYWNrVG9QcmV2UG9zKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUVuZChlLCAnZHJhZycsIGVuZENvcHlJbmZvKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgc3RhdGUuc3RhdHVzID0gJ2lkbGUnO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVuZChlLCAnZHJhZycsIGVuZENvcHlJbmZvKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGhhbmRsZVJlc2l6ZVN0YXJ0ID0gKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgbGV0IHByb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgaWYgKHByb3BzLmZyb3plbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmVSZXNvbHZlQm91bmQoKTtcbiAgICAgICAgdGhpcy5mcmVzaFBhcmFtKCk7XG4gICAgICAgIGxldCBldnRQb3MgPSB1dGlscy5nZXRFdnRQb3MoZSk7XG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGxldCB7Y3VycmVudEluZm99ID0gdGhpcztcbiAgICAgICAgbGV0IHN0YWJsZVNvdXJlSW5mbyA9IHRoaXMuc3RhYmxlU291cmVJbmZvO1xuICAgICAgICB0aGlzLmhhbmRsZU9mZnNldCA9IHtcbiAgICAgICAgICAgIHg6IChzdGFibGVTb3VyZUluZm8ud2lkdGggKyBzdGFibGVTb3VyZUluZm8ubGVmdCkgLSBldnRQb3MueCxcbiAgICAgICAgICAgIHk6IChzdGFibGVTb3VyZUluZm8uaGVpZ2h0ICsgc3RhYmxlU291cmVJbmZvLnRvcCkgLSBldnRQb3MueVxuICAgICAgICB9O1xuICAgICAgICB1dGlscy5hZGRFdmVudCh0aGlzLm5vZGUub3duZXJEb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMubGF6eUhhbmRsZVJlc2l6ZUluKTtcbiAgICAgICAgdXRpbHMuYWRkRXZlbnQodGhpcy5ub2RlLm93bmVyRG9jdW1lbnQsICdtb3VzZXVwJywgdGhpcy5oYW5kbGVSZXNpemVFbmQpO1xuICAgICAgICBzdGF0ZS5zdGF0dXMgPSAnYWN0aXZlJztcbiAgICAgICAgc3RhdGUuc3R5bGVQYXJhbSA9IHRoaXMuYnVpbGRTdHlsZUJ5U3RhdGUoc3RhdGUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVN0YXJ0KGUsICdyZXNpemUnLCB7Li4uY3VycmVudEluZm99KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIOiKgua1gVxuICAgIGxhenlIYW5kbGVSZXNpemVJbiA9IChlKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbmdUaW1lcikge1xuICAgICAgICAgICAgdGhpcy5pbmdUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlUmVzaXplSW4oZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmdUaW1lciA9IG51bGw7XG4gICAgICAgICAgICB9LCB0aGlzLnByb3BzLmRlYm91bmNlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBoYW5kbGVSZXNpemVJbiA9IChlKSA9PiB7XG4gICAgICAgIGxldCBwb3MgPSB1dGlscy5nZXRFdnRQb3MoZSk7XG4gICAgICAgIGxldCBzdGFibGVTb3VyZUluZm8gPSB0aGlzLnN0YWJsZVNvdXJlSW5mbztcbiAgICAgICAgbGV0IGhhbmRsZU9mZnNldCA9IHRoaXMuaGFuZGxlT2Zmc2V0O1xuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBsZXQgcHJldkN1cnJlbnRJbmZvID0gdGhpcy5jdXJyZW50SW5mbztcbiAgICAgICAgbGV0IG5ld0N1cnJlbnRJbmZvID0ge1xuICAgICAgICAgICAgbGVmdDogcHJldkN1cnJlbnRJbmZvLmxlZnQsXG4gICAgICAgICAgICB0b3A6IHByZXZDdXJyZW50SW5mby50b3AsXG4gICAgICAgICAgICB3aWR0aDogcG9zLnggLSBzdGFibGVTb3VyZUluZm8ubGVmdCArIGhhbmRsZU9mZnNldC54LFxuICAgICAgICAgICAgaGVpZ2h0OiBwb3MueSAtIHN0YWJsZVNvdXJlSW5mby50b3AgKyBoYW5kbGVPZmZzZXQueVxuICAgICAgICB9O1xuXG4gICAgICAgIG5ld0N1cnJlbnRJbmZvID0gdGhpcy5yZXNvbHZlRnJvemVuKHByZXZDdXJyZW50SW5mbywgbmV3Q3VycmVudEluZm8pO1xuICAgICAgICBuZXdDdXJyZW50SW5mbyA9IHRoaXMucmVzb2x2ZVNpemVSYW5nZShwcmV2Q3VycmVudEluZm8sIG5ld0N1cnJlbnRJbmZvKTtcbiAgICAgICAgbmV3Q3VycmVudEluZm8gPSB0aGlzLnJlc29sdmVSZXNpemVHcmlkKHByZXZDdXJyZW50SW5mbywgbmV3Q3VycmVudEluZm8pO1xuICAgICAgICBuZXdDdXJyZW50SW5mbyA9IHRoaXMucmVzb2x2ZVJlc2l6ZUJvdW5kKHByZXZDdXJyZW50SW5mbywgbmV3Q3VycmVudEluZm8pO1xuICAgICAgICB0aGlzLmN1cnJlbnRJbmZvID0gbmV3Q3VycmVudEluZm87XG4gICAgICAgIHN0YXRlLnN0eWxlUGFyYW0gPSB0aGlzLmJ1aWxkU3R5bGVCeVN0YXRlKHN0YXRlKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVQcm9jZXNzKGUsICdyZXNpemUnLCB7Li4udGhpcy5jdXJyZW50SW5mb30pO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaGFuZGxlUmVzaXplRW5kID0gKGUpID0+IHtcbiAgICAgICAgdXRpbHMucmVtb3ZlRXZlbnQodGhpcy5ub2RlLm93bmVyRG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLmxhenlIYW5kbGVSZXNpemVJbik7XG4gICAgICAgIHV0aWxzLnJlbW92ZUV2ZW50KHRoaXMubm9kZS5vd25lckRvY3VtZW50LCAnbW91c2V1cCcsIHRoaXMuaGFuZGxlUmVzaXplRW5kKTtcbiAgICAgICAgbGV0IGN1cnJlbnRJbmZvID0gdGhpcy5jdXJyZW50SW5mbztcbiAgICAgICAgbGV0IGVuZENvcHlJbmZvID0gey4uLmN1cnJlbnRJbmZvfTtcbiAgICAgICAgbGV0IGJlZm9yZUVuZCA9IHRoaXMucHJvcHMuYmVmb3JlRW5kO1xuICAgICAgICBsZXQgdmFsaWRGbGFnID0gdHJ1ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBiZWZvcmVFbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBhYnNvbHV0ZUluZm8gPSB1dGlscy5nZXREb21BYnNvbHV0ZUluZm8odGhpcy5ub2RlKTtcbiAgICAgICAgICAgIHZhbGlkRmxhZyA9IGJlZm9yZUVuZChlLCAncmVzaXplJywgey4uLmN1cnJlbnRJbmZvfSwgYWJzb2x1dGVJbmZvKSAhPT0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YWxpZEZsYWcgPSBiZWZvcmVFbmQgIT09IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsaWRGbGFnKSB7XG4gICAgICAgICAgICB0aGlzLmJhY2tUb1ByZXZQb3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRW5kKGUsICdyZXNpemUnLCBlbmRDb3B5SW5mbyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHN0YXRlLnN0YXR1cyA9ICdpZGxlJztcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVFbmQoZSwgJ3Jlc2l6ZScsIGVuZENvcHlJbmZvKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIGxldCB7c3R5bGVQYXJhbSwgc3RhdHVzfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGxldCBwbGFjZWhvbGRlciA9IGZhbHNlO1xuICAgICAgICBsZXQgZXh0cmFQcm9wcyA9IHt9O1xuICAgICAgICAvLyDnibnmrorlpITnkIZzZWxmXG4gICAgICAgIGlmICh0aGlzLmhhbmRsZS5kcmFnID09PSAnc2VsZicpIHtcbiAgICAgICAgICAgIGV4dHJhUHJvcHMub25Nb3VzZURvd24gPSB0aGlzLmhhbmRsZURyYWdTdGFydDtcbiAgICAgICAgfVxuICAgICAgICAvLyDlpITnkIbljaDkvY3lhYPntKBcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlUGxhY2Vob2xkZXIgJiYgc3RhdHVzICE9PSAnaWRsZScpIHtcbiAgICAgICAgICAgIGxldCBwcmV2U3RhYmxlUGFyYW0gPSB0aGlzLmJ1aWxkU3R5bGVCeVN0YXRlKHRoaXMuc3RhdGUsIHRoaXMuY3VycmVudEluZm9DYWNoZSk7XG4gICAgICAgICAgICBwbGFjZWhvbGRlciA9IChcbiAgICAgICAgICAgICAgICA8UGxhY2Vob2xkZXIgey4uLnN0eWxlUGFyYW19IHByZXZQYXJhbT17cHJldlN0YWJsZVBhcmFtfS8+XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3R5bGVQYXJhbSA9IHByZXZTdGFibGVQYXJhbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZHJhZy11bml0XCJcbiAgICAgICAgICAgICAgICByZWY9e3RoaXMuZ2V0V3JhcHBlck5kfVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZVBhcmFtfVxuICAgICAgICAgICAgICAgIHsuLi5leHRyYVByb3BzfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wYXJzZUNvbnRlbnQoKX1cbiAgICAgICAgICAgICAgICB7cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9O1xufVxuXG5EcmFnUmVzaXplLkRyYWdIYW5kbGVyID0gRHJhZ0hhbmRsZXI7XG5EcmFnUmVzaXplLlJlc2l6ZUhhbmRsZXIgPSBSZXNpemVIYW5kbGVyO1xuZXhwb3J0IGRlZmF1bHQgRHJhZ1Jlc2l6ZTtcbiJdfQ==
