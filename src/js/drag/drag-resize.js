/**
 * drag-resize基础单元
 */
import React, {Component, PropTypes} from 'react';
import utils from './utils';
import boundary from './boundary';
import Placeholder from './placeholder';
import Handler from './handler';

const {DragHandler, ResizeHandler} = Handler;
const validPositionVal = {
    relative: true,
    absolute: true,
    fixed: true
};
const {getStyle} = utils;

const infoToStyle = (currentInfo = {}, enabledMap = {}) => {
    let param = {};
    if (enabledMap.drag) {
        let {left, top} = currentInfo;
        if (left || left === 0) {
            param.left = (left || 0) + 'px';
        }
        if (top || top === 0) {
            param.top = (top || 0) + 'px';
        }
    }
    if (enabledMap.resize) {
        let {width, height} = currentInfo;
        if (width || width === 0) {
            param.width = (width || 0) + 'px';
        }
        if (height || height === 0) {
            param.height = (height || 0) + 'px';
        }
    }
    return param;
};

class DragResize extends Component {
    constructor (props) {
        super(props);
        // 容器position属性
        this.wrapperPositionStyle = 'relative';
        // 点击时，主体与点击位置的差值
        this.handleOffset = {x: 0, y: 0};
        // 稳定态盒子尺寸信息
        this.stableSoureInfo = {left: 0, top: 0, width: 0, height: 0};
        // 当前信息
        this.currentInfo = {};
        this.currentInfoCache = {};
        this.node = null;
        this.handle = {};
        // 父级首个相对定位的节点，在使用了绝对定位控制时使用
        this.relativeParentInfo = null;
        // 冻结
        this.frozenX = false;
        this.frozenY = false;
        this.frozenW = false;
        this.frozenH = false;
        this.frozenResize = false;
        this.frozenDrag = false;
        // 网格
        this.gridX = false;
        this.gridY = false;
        this.noGrid = true;
        // 尺寸限制
        this.wRange = false;
        this.hRange = false;
        // 边界检测参数
        this.boundParams = null;
        // 用定时器节流
        this.ingTimer = null;
        // 辅助fixed节点不超出窗口
        this.limitWin = false;
        this.winSize = null;
        this.scrollCache = null;
        this.needRefreshInitInfo = false;
        // 用于手柄的占用冲突处理
        this.selfOccupied = false;
        this.handleInstMap = {};
    };

    state = {
        status: 'idle',
        currentInfo: {},
        style: {}
    };

    static propTypes = {
        // 拖拽的手柄，可选为节点或者简单的选择器
        dragHandler: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.element]),
        resizeHandler: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.element]),
        // 拖拽时的节流间隙时长，单位为ms
        debounce: PropTypes.number,
        // 边界参数，可选为：
        // 节点：表示在该节点范围内移动，'parent'关键词：表示只能在其父节点内移动
        bound: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        // 拖拽步进，如grid: [50, 100]表示拖拽x方向以50为步进，y方向以100为步进
        grid: PropTypes.arrayOf(PropTypes.number),
        // 冻结操作，ture表示都冻结，x表示冻结x方向，y表示冻结y方向
        frozen: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object]),
        sizeRange: PropTypes.object,
        // 是否取消拖拽，在拖拽结束时执行，可选为true(直接返回)，function(判断后返回true时则返回)
        beforeEnd: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        // 是否开启placeholder模式，该模式下，拖拽过程中使用的是一个辅助块，结束之后才更新主体位置
        enablePlaceholder: PropTypes.bool,
        // 进行时，不在body上添加辅助的class
        noGlobalClass: PropTypes.bool,
        // position为fixed时自动限定不超出窗口
        betterFixed: PropTypes.bool,
        // 以下三个分别为拖拽开始，拖拽中，拖拽结束的回调，接收三个参数：event, 当前位置参数，在页面上的位置
        onStart: PropTypes.func,
        onProcess: PropTypes.func,
        onEnd: PropTypes.func
    };

    static defaultProps = {
        frozen: false,
        debounce: 17,
        grid: [],
        betterFixed: true,
        enablePlaceholder: false,
        enabled: {drag: true, resize: true},
        onStart () {},
        onProcess () {},
        onEnd () {}
    };

    componentWillMount () {
        this.parseFrozen();
        this.parseGrid();
        this.parseSizeRange();
    };

    componentDidMount () {
        this.wrapperPositionStyle = this.parseNdStylePosition();
        this.parseInitStyle(this.props, () => {
            this.initCurrentInfo(true);
            this.freshParam();
        });
        this.parseHandleParam();
        this.parseBound();
    };

    componentWillUnmount () {
        this.destroyEvt();
    };

    componentWillReceiveProps (nextProps) {
        this.needRefreshInitInfo = true;
        this.destroyEvt();
        this.wrapperPositionStyle = this.parseNdStylePosition(nextProps);
        this.parseFrozen(nextProps);
        this.parseGrid(nextProps);
        this.parseSizeRange(nextProps);
        this.parseHandleParam(nextProps);
        this.parseBound();
        this.parseInitStyle(nextProps, () => {
            this.initCurrentInfo(true);
        });
    };

    destroyEvt = () => {
        if (this.handle.drag) {
            utils.removeEvent(this.node.ownerDocument, 'mousemove', this.lazyHandleDragIn);
            utils.removeEvent(this.node.ownerDocument, 'mouseup', this.handleDragEnd);
        }
        if (this.handle.resize) {
            utils.removeEvent(this.node.ownerDocument, 'mousemove', this.lazyHandleResizeIn);
            utils.removeEvent(this.node.ownerDocument, 'mouseup', this.handleResizeEnd);
        }
        this.ingTimer && clearTimeout(this.ingTimer);
        this.ingTimer = null;
    };

    getWrapperNd = (comp) => {
        this.node = comp;
    };

    // 返回到上一个稳定态位置
    backToPrevPos = (cbk) => {
        this.currentInfo = this.currentInfoCache;
        let styleParam = this.buildStyleByState(this.state);
        this.setState({
            styleParam,
            status: 'idle'
        }, () => {
            cbk && cbk();
        });
    };

    // 初始化currentInfo
    initCurrentInfo = (force = false) => {
        if (force || this.needRefreshInitInfo) {
            this.currentInfo = this.parseStyleParam();
            // 初始缓存
            this.currentInfoCache = {...this.currentInfo};
            this.needRefreshInitInfo = false;
            return true;
        }
        return false;
    };

    parseInitStyle = (props = this.props, cbk) => {
        let styleOpts = {...(props.style || {})};
        styleOpts.position = this.wrapperPositionStyle;
        if (styleOpts.position === 'absolute') {
            if (props.enabled.drag) {
                if (typeof styleOpts.top === 'undefined') {
                    styleOpts.top = this.node.offsetTop + 'px';
                }
                if (typeof styleOpts.left === 'undefined') {
                    styleOpts.left = this.node.offsetLeft + 'px';
                }
            }
        }
        if (styleOpts.position === 'fixed') {
            this.limitWin = props.betterFixed;
        }
        this.setState({
            styleParam: styleOpts
        }, () => {
            cbk && cbk();
        });
    };

    parseContent = (props = this.props) => {
        this.handleInstMap = {};
        const enabledDrag = props.enabled.drag;
        const enabledResize = props.enabled.resize;
        return React.Children.map(props.children, (Child) => {
            if (!Child || !Child.type) {
                return Child;
            }
            switch (Child.type) {
                case DragHandler:
                    if (!enabledDrag || this.handleInstMap['drag']) {
                        return Child;
                    }
                    this.handleInstMap['drag'] = true;
                    return (
                        <div
                            {...(Child.props || {})}
                            ref={(nd) => {
                                this.handle.drag = nd;
                            }}
                            onMouseDown={this.handleDragStart}/>
                    );

                case ResizeHandler:
                    if (!enabledResize || this.handleInstMap['resize']) {
                        return Child;
                    }
                    this.handleInstMap['resize'] = true;
                    return (
                        <div
                            {...(Child.props || {})}
                            ref={(nd) => {
                                this.handle.resize = nd;
                            }}
                            onMouseDown={this.handleResizeStart}/>
                    );

                default:
                    return Child;
            }
        });
    };

    // style参数预处理
    parseNdStylePosition = (props = this.props) => {
        let styleOpts = props.style || {};
        let targetVal = 'relative';
        let ndPosition = styleOpts.position || utils.getStyle(this.node, 'position');
        if (validPositionVal[ndPosition]) {
            targetVal = ndPosition;
        }

        return targetVal;
    };

    parseStyleParam = () => {
        let modStyle = utils.getStyle(this.node);
        return {
            left: utils.getNum(modStyle.left),
            top: utils.getNum(modStyle.top),
            width: utils.getNum(modStyle.width),
            height: utils.getNum(modStyle.height)
        };
    };

    // 解析手柄参数
    parseHandleParam = (props = this.props) => {
        let {dragSelf, enabled} = props;
        if (!this.handleInstMap.drag) {
            this.handle.drag = (dragSelf && enabled.drag) ? 'self' : null;
        }
    };

    // 解析冻结参数
    parseFrozen = (props = this.props) => {
        let {frozen} = props;
        let frozenType = typeof frozen;
        switch (frozenType) {
            case 'boolean':
                this.frozenX = this.frozenY = this.frozenW = this.frozenH = frozen;
                break;

            case 'string':
                frozen = frozen.toLowerCase();
                this.frozenX = frozen === 'x';
                this.frozenY = frozen === 'y';
                this.frozenW = frozen === 'w';
                this.frozenH = frozen === 'h';
                break;

            default:
                if (utils.isObject(frozen)) {
                    this.frozenX = !!frozen.x;
                    this.frozenY = !!frozen.y;
                    this.frozenW = !!frozen.w;
                    this.frozenH = !!frozen.h;
                }
                else {
                    this.frozenX = this.frozenY = this.frozenW = this.frozenH = false;
                }
        }
        this.frozenResize = this.frozenW && this.frozenH;
        this.frozenDrag = this.frozenX && this.frozenY;
    };

    // 解析网格参数
    parseGrid = (props = this.props) => {
        let {grid} = props;
        if (grid) {
            if (typeof grid === 'number') {
                this.gridX = this.gridY = (grid > 0 ? grid : false);
            }
            else if (utils.isArray(grid)) {
                this.gridX = grid[0] || false;
                this.gridY = grid[1] || false;
            }
            else {
                this.gridX = this.gridY = false;
            }
        }
        else {
            this.gridX = this.gridY = false;
        }
        this.noGrid = (this.gridX === this.gridY && this.girdX === false);
    };

    // 解析尺寸限制
    parseSizeRange = (props = this.props) => {
        let {sizeRange} = props;
        let wRange = false;
        let hRange = false;
        if (sizeRange) {
            if (sizeRange.w) {
                let [wMin, wMax] = sizeRange.w;
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
                let [hMin, hMax] = sizeRange.h;
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
        this.wRange = wRange;
        this.hRange = hRange;
    };

    // 解析边界约束
    parseBound = (props = this.props) => {
        let {bound} = props;
        if (!bound && !this.limitWin) {
            return false;
        }
        let resolveDragBound;
        let resolveResizeBound;
        let preResolveBound;
        let getAvailableParam;
        switch (true) {
            case bound === 'parent':
                getAvailableParam = () => (this.node.parentNode);
                break;

            case utils.isNode(bound):
                if (!bound.contains(this.node)) {
                    break;
                }
                getAvailableParam = () => (bound);
                break;

            case this.limitWin:
                getAvailableParam = () => {
                    return window;
                };
                break;
        }
        if (getAvailableParam) {
            preResolveBound = () => {
                let availableParam = getAvailableParam();
                let bParams = this.boundParams = availableParam &&
                    boundary.calcAvailableZone(availableParam, this.relativeParentInfo, this.wrapperPositionStyle);
                if (this.limitWin) {
                    let currentScrollPos = this.scrollCache = utils.getScrollPos();
                    this.winSize = utils.getWinSize(this.node);
                    bParams.x[0] -= currentScrollPos.left;
                    bParams.x[1] -= currentScrollPos.left;
                    bParams.y[0] -= currentScrollPos.top;
                    bParams.y[1] -= currentScrollPos.top;
                }
            };

            resolveDragBound = (prevInfo, newInfo) => {
                if (!this.boundParams) {
                    return newInfo;
                }
                let [startX, endX] = this.boundParams.x;
                let [startY, endY] = this.boundParams.y;
                let {left, top} = newInfo;
                let right = left + newInfo.width;
                let bottom = top + newInfo.height;
                if (left < startX) {
                    newInfo.left = startX;
                }
                else if (right > endX) {
                    let fixedLeft = endX - newInfo.width;
                    if (fixedLeft >= startX) {
                        newInfo.left = endX - newInfo.width;
                    }
                }
                if (top < startY) {
                    newInfo.top = startY;
                }
                else if (bottom > endY) {
                    let fixedTop = endY - newInfo.height;
                    if (fixedTop >= startY) {
                        newInfo.top = endY - newInfo.height;
                    }
                }
                newInfo = this.resolveDragWinLimit(newInfo);
                return newInfo;
            };
            resolveResizeBound = (prevInfo, newInfo) => {
                if (!this.boundParams) {
                    return newInfo;
                }
                let [startX, endX] = this.boundParams.x;
                let [startY, endY] = this.boundParams.y;
                let {left, top} = newInfo;
                let right = left + newInfo.width;
                let bottom = top + newInfo.height;
                if (left < startX) {
                    newInfo.width = prevInfo.width;
                }
                else if (right > endX) {
                    newInfo.width = endX - left;
                }
                if (top < startY) {
                    newInfo.height = prevInfo.height;
                }
                else if (bottom > endY) {
                    newInfo.height = endY - top;
                }
                newInfo = this.resolveResizeWinLimit(newInfo);
                return newInfo;
            };
        }
        else {
            resolveDragBound = (prevInfo, newInfo) => {
                return newInfo;
            };
            resolveResizeBound = (prevInfo, newInfo) => {
                return newInfo;
            };
            preResolveBound = () => {};
        }
        this.resolveDragBound = resolveDragBound;
        this.resolveResizeBound = resolveResizeBound;
        this.preResolveBound = preResolveBound;
    };

    // betterFixed
    resolveDragWinLimit = (newInfo) => {
        if (!this.limitWin) {
            return newInfo;
        }
        let scrollSize = utils.getScrollPos();
        let winSize = this.winSize;
        let offsetL = scrollSize.left - this.scrollCache.left;
        let offsetV = scrollSize.top - this.scrollCache.top;
        newInfo.left -= offsetL;
        newInfo.top -= offsetV;
        let right = newInfo.left + newInfo.width;
        let bottom = newInfo.top + newInfo.height;
        if (newInfo.top < 0) {
            newInfo.top = 0;
        }
        if (right > winSize.width) {
            let newLeft = winSize.width - newInfo.width;
            if (newLeft >= 0) {
                newInfo.left = newLeft;
            }
        }
        if (newInfo.left < 0) {
            newInfo.left = 0;
        }
        if (bottom > winSize.height) {
            let newTop = winSize.height - newInfo.height;
            if (newTop >= 0) {
                newInfo.top = newTop;
            }
        }
        return newInfo;
    };

    resolveResizeWinLimit = (newInfo) => {
        if (!this.limitWin) {
            return newInfo;
        }
        let winSize = this.winSize;
        let right = newInfo.left + newInfo.width;
        let bottom = newInfo.top + newInfo.height;
        if (right > winSize.width) {
            let newW = winSize.width - newInfo.left;
            if (newW >= (this.wRange ? this.wRange[0] : 0)) {
                newInfo.width = newW;
            }
        }
        if (bottom > winSize.height) {
            let newH = winSize.height - newInfo.top;
            if (newH >= (this.hRange ? this.hRange[0] : 0)) {
                newInfo.height = newH;
            }
        }
        return newInfo;
    };

    // 预解析边界，在action开始时调用
    // 生成实时解析边界参数中依赖的值
    preResolveBound = () => {};

    // 实时解析边界参数
    resolveDragBound = (prevInfo, newInfo) => {
        return newInfo;
    };

    // 实时解析边界参数
    resolveResizeBound = (prevInfo, newInfo) => {
        return newInfo;
    };

    // 实时解析冻结参数
    resolveFrozen = (prevInfo, newInfo) => {
        if (this.frozenX) {
            newInfo.left = prevInfo.left;
        }
        if (this.frozenY) {
            newInfo.top = prevInfo.top;
        }
        if (this.frozenW) {
            newInfo.width = prevInfo.width;
        }
        if (this.frozenH) {
            newInfo.height = prevInfo.height;
        }
        return newInfo;
    };

    // 实时解析网格拖拽
    resolveDragGrid = (prevInfo, newInfo) => {
        if (this.noGrid) {
            return newInfo;
        }
        if (this.gridX !== false) {
            let offsetLeft = newInfo.left - prevInfo.left;
            if (offsetLeft) {
                let gridN = Math.round(offsetLeft / this.gridX);
                newInfo.left = prevInfo.left + gridN * this.gridX;
            }
        }
        if (this.gridY !== false) {
            let offsetTop = newInfo.top - prevInfo.top;
            if (offsetTop) {
                let gridN = Math.round(offsetTop / this.gridY);
                newInfo.top = prevInfo.top + gridN * this.gridY;
            }
        }
        return newInfo;
    };

    // 实时解析网格resize
    resolveResizeGrid = (prevInfo, newInfo) => {
        if (this.noGrid) {
            return newInfo;
        }
        if (this.gridX !== false) {
            let offsetWidth = newInfo.width - prevInfo.width;
            if (offsetWidth) {
                let gridN = Math.round(offsetWidth / this.gridX);
                newInfo.width = prevInfo.width + gridN * this.gridX;
            }
        }
        if (this.gridY !== false) {
            let offsetHeight = newInfo.height - prevInfo.height;
            if (offsetHeight) {
                let gridN = Math.round(offsetHeight / this.gridY);
                newInfo.height = prevInfo.height + gridN * this.gridY;
            }
        }
        return newInfo;
    };

    // 实时解析尺寸限制
    resolveSizeRange = (prevInfo, newInfo) => {
        if (this.wRange !== false) {
            let [wMin, wMax] = this.wRange;
            if (newInfo.width > wMax) {
                newInfo.width = wMax;
            }
            else if (newInfo.width < wMin) {
                newInfo.width = wMin;
            }
        }
        if (this.hRange !== false) {
            let [hMin, hMax] = this.hRange;
            if (newInfo.height > hMax) {
                newInfo.height = hMax;
            }
            else if (newInfo.height < hMin) {
                newInfo.height = hMin;
            }
        }
        return newInfo;
    };

    // 从this.currentInfo参数和state中解析出拖拽体的样式
    buildStyleByState = (state = this.state, currentInfo = this.currentInfo) => {
        let {styleParam = {}} = state;
        let {enabled} = this.props;
        let posStyle = infoToStyle(currentInfo, enabled);
        styleParam = {...styleParam};
        styleParam = utils.merge(styleParam, posStyle);
        styleParam.position = this.wrapperPositionStyle;
        return styleParam;
    };

    // 获取最近一个relative的父级节点(自身为relative时，将基于父级节点)
    getRelativeParentInfo = () => {
        let nodePosition = utils.getStyle(this.node, 'position');
        let parentNd = this.node;
        // (自身为relative时，将基于父级节点)
        if (nodePosition !== 'relative') {
            parentNd = this.node.offsetParent;
        }
        else {
            parentNd = this.node.parentNode;
        }
        let ndStyle = getStyle(parentNd);
        let ndInfo = utils.getDomAbsoluteInfo(parentNd);

        ndInfo.left += parseFloat(ndStyle.borderLeftWidth || 0, 10);
        ndInfo.top += parseFloat(ndStyle.borderTopWidth || 0, 10);
        return ndInfo;
    };

    freshParam = (props = this.props) => {
        let {currentInfo} = this;
        this.stableSoureInfo = utils.getDomAbsoluteInfo(this.node);
        this.stableSoureInfo.left -= currentInfo.left;
        this.stableSoureInfo.top -= currentInfo.top;
        this.relativeParentInfo = this.getRelativeParentInfo();
        if (this.wrapperPositionStyle === 'fixed' && props.betterFixed) {
            this.limitWin = true;
        }
        else {
            this.limitWin = false;
        }
    };

    handleStart = (e, act, params) => {
        !this.props.noGlobalClass &&
            utils.addClass(this.node.ownerDocument.body, `dg-active-${act}`);
        this.props.onStart(e, act, params);
    };

    handleProcess = (e, act, params) => {
        this.props.onProcess(e, act, params);
    };

    handleEnd = (e, act, params) => {
        !this.props.noGlobalClass &&
            utils.removeClass(this.node.ownerDocument.body, `dg-active-${act}`);
        this.currentInfoCache = {...this.currentInfo};
        this.props.onEnd(e, act, params);
    };

    handleDragStart = (e) => {
        let props = this.props;
        if (props.frozen === true) {
            return;
        }
        let el = e.target;
        // 两操作冲突
        if (this.handle.resize && this.handle.resize.contains(el)) {
            return;
        }

        this.preResolveBound();
        this.freshParam();
        let evtPos = utils.getEvtPos(e);
        let state = this.state;
        let {currentInfo} = this;
        let stableSoureInfo = this.stableSoureInfo;
        this.handleOffset = {
            x: evtPos.x - stableSoureInfo.left - currentInfo.left,
            y: evtPos.y - stableSoureInfo.top - currentInfo.top
        };

        utils.addEvent(this.node.ownerDocument, 'mousemove', this.lazyHandleDragIn);
        utils.addEvent(this.node.ownerDocument, 'mouseup', this.handleDragEnd);
        state.status = 'active';
        state.styleParam = this.buildStyleByState(state);
        this.setState(state, () => {
            this.handleStart(e, 'drag', {...currentInfo});
        });
    };

    // 节流
    lazyHandleDragIn = (e) => {
        if (!this.ingTimer) {
            this.ingTimer = setTimeout(() => {
                this.handleDragIn(e);
                this.ingTimer = null;
            }, this.props.debounce);
        }
    };

    handleDragIn = (e) => {
        let pos = utils.getEvtPos(e);
        let stableSoureInfo = this.stableSoureInfo;
        let handleOffset = this.handleOffset;
        let state = this.state;
        let prevCurrentInfo = this.currentInfo;
        let newCurrentInfo = {
            left: pos.x - stableSoureInfo.left - handleOffset.x,
            top: pos.y - stableSoureInfo.top - handleOffset.y,
            width: prevCurrentInfo.width,
            height: prevCurrentInfo.height
        };

        newCurrentInfo = this.resolveFrozen(prevCurrentInfo, newCurrentInfo);
        newCurrentInfo = this.resolveDragGrid(prevCurrentInfo, newCurrentInfo);
        newCurrentInfo = this.resolveDragBound(prevCurrentInfo, newCurrentInfo);
        this.currentInfo = newCurrentInfo;
        state.styleParam = this.buildStyleByState(state);
        this.setState(state, () => {
            this.handleProcess(e, 'drag', {...this.currentInfo});
        });
    };

    handleDragEnd = (e) => {
        utils.removeEvent(this.node.ownerDocument, 'mousemove', this.lazyHandleDragIn);
        utils.removeEvent(this.node.ownerDocument, 'mouseup', this.handleDragEnd);
        let currentInfo = this.currentInfo;
        let beforeEnd = this.props.beforeEnd;
        let endCopyInfo = {...currentInfo};
        let validFlag = true;
        if (typeof beforeEnd === 'function') {
            let absoluteInfo = utils.getDomAbsoluteInfo(this.node);
            validFlag = beforeEnd(e, 'drag', {...currentInfo}, absoluteInfo) !== false;
        }
        else {
            validFlag = beforeEnd !== false;
        }
        if (!validFlag) {
            this.backToPrevPos(() => {
                this.handleEnd(e, 'drag', endCopyInfo);
            });
            return;
        }

        let state = this.state;
        state.status = 'idle';
        this.setState(state, () => {
            this.handleEnd(e, 'drag', endCopyInfo);
        });
    };

    handleResizeStart = (e) => {
        e.stopPropagation();
        let props = this.props;
        if (props.frozen === true) {
            return;
        }

        this.preResolveBound();
        this.freshParam();
        let evtPos = utils.getEvtPos(e);
        let state = this.state;
        let {currentInfo} = this;
        let stableSoureInfo = this.stableSoureInfo;
        this.handleOffset = {
            x: (stableSoureInfo.width + stableSoureInfo.left) - evtPos.x,
            y: (stableSoureInfo.height + stableSoureInfo.top) - evtPos.y
        };
        utils.addEvent(this.node.ownerDocument, 'mousemove', this.lazyHandleResizeIn);
        utils.addEvent(this.node.ownerDocument, 'mouseup', this.handleResizeEnd);
        state.status = 'active';
        state.styleParam = this.buildStyleByState(state);
        this.setState(state, () => {
            this.handleStart(e, 'resize', {...currentInfo});
        });
    };

    // 节流
    lazyHandleResizeIn = (e) => {
        if (!this.ingTimer) {
            this.ingTimer = setTimeout(() => {
                this.handleResizeIn(e);
                this.ingTimer = null;
            }, this.props.debounce);
        }
    };

    handleResizeIn = (e) => {
        let pos = utils.getEvtPos(e);
        let stableSoureInfo = this.stableSoureInfo;
        let handleOffset = this.handleOffset;
        let state = this.state;
        let prevCurrentInfo = this.currentInfo;
        let newCurrentInfo = {
            left: prevCurrentInfo.left,
            top: prevCurrentInfo.top,
            width: pos.x - stableSoureInfo.left + handleOffset.x,
            height: pos.y - stableSoureInfo.top + handleOffset.y
        };

        newCurrentInfo = this.resolveFrozen(prevCurrentInfo, newCurrentInfo);
        newCurrentInfo = this.resolveSizeRange(prevCurrentInfo, newCurrentInfo);
        newCurrentInfo = this.resolveResizeGrid(prevCurrentInfo, newCurrentInfo);
        newCurrentInfo = this.resolveResizeBound(prevCurrentInfo, newCurrentInfo);
        this.currentInfo = newCurrentInfo;
        state.styleParam = this.buildStyleByState(state);
        this.setState(state, () => {
            this.handleProcess(e, 'resize', {...this.currentInfo});
        });
    };

    handleResizeEnd = (e) => {
        utils.removeEvent(this.node.ownerDocument, 'mousemove', this.lazyHandleResizeIn);
        utils.removeEvent(this.node.ownerDocument, 'mouseup', this.handleResizeEnd);
        let currentInfo = this.currentInfo;
        let endCopyInfo = {...currentInfo};
        let beforeEnd = this.props.beforeEnd;
        let validFlag = true;
        if (typeof beforeEnd === 'function') {
            let absoluteInfo = utils.getDomAbsoluteInfo(this.node);
            validFlag = beforeEnd(e, 'resize', {...currentInfo}, absoluteInfo) !== false;
        }
        else {
            validFlag = beforeEnd !== false;
        }
        if (!validFlag) {
            this.backToPrevPos(() => {
                this.handleEnd(e, 'resize', endCopyInfo);
            });
            return;
        }

        let state = this.state;
        state.status = 'idle';
        this.setState(state, () => {
            this.handleEnd(e, 'resize', endCopyInfo);
        });
    };

    render () {
        let {styleParam, status} = this.state;
        let placeholder = false;
        let extraProps = {};
        // 特殊处理self
        if (this.handle.drag === 'self') {
            extraProps.onMouseDown = this.handleDragStart;
        }
        // 处理占位元素
        if (this.props.enablePlaceholder && status !== 'idle') {
            let prevStableParam = this.buildStyleByState(this.state, this.currentInfoCache);
            placeholder = (
                <Placeholder {...styleParam} prevParam={prevStableParam}/>
            );
            styleParam = prevStableParam;
        }

        return (
            <div
                className="drag-unit"
                ref={this.getWrapperNd}
                style={styleParam}
                {...extraProps}>
                {this.parseContent()}
                {placeholder}
            </div>
        );
    };
}

DragResize.DragHandler = DragHandler;
DragResize.ResizeHandler = ResizeHandler;
export default DragResize;
