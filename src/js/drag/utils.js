const NUM_REG = /^\-?(\d)*(\.(\d)*)?$/;
const utils = {
    isNumeric (val) {
        try {
            val = val.toString();
            return NUM_REG.test(val);
        }
        catch (e) {
            return false;
        }
    },
    // 转化为数字形式，与getNum的区别在于其转化的是数字形式的字符串
    transToNum (val) {
        if (utils.isNumeric(val)) {
            return parseFloat(val, 10);
        }
        return 0;
    },
    // 获取输入的数字部分
    getNum (val) {
        let tmpVal = parseFloat(val, 10);
        if (!isNaN(tmpVal)) {
            return tmpVal;
        }
        return 0;
    },
    find (selector, range) {
        if (!utils.isNode(range)) {
            range = document.documentElement || document.body;
        }
        let result = [];
        if (range.querySelectorAll) {
            result = range.querySelectorAll(selector);
        }
        return Array.prototype.slice.call(result, 0);
    },
    getAvailableSize (nd) {
        let root = (nd ? nd.ownerDocument : document)['body'];
        return {
            height: root.clientHeight,
            width: root.clientWidth
        };
    },
    getWinSize (nd) {
        let root = (nd ? nd.ownerDocument : document)['documentElement'];
        return {
            height: root.clientHeight,
            width: root.clientWidth
        };
    },
    getStyle (nd, styleName = false) {
        let style;
        if (nd.currentStyle) {
            style = nd.currentStyle;
        }
        else {
            style = window.getComputedStyle(nd, null);
        }
        return styleName ? style[styleName] : style;
    },

    isNode (nd) {
        return !!(nd && nd.nodeType === 1);
    },

    merge (rootObj = {}, newObj = {}) {
        for (let i in newObj) {
            if (newObj.hasOwnProperty(i)) {
                rootObj[i] = newObj[i];
            }
        }

        return rootObj;
    },

    // 以源的key为依据，进行合并
    smartyMerge (rootObj, newObj = {}) {
        let tempObj = {};
        for (let i in rootObj) {
            if (rootObj.hasOwnProperty(i)) {
                tempObj[i] = rootObj[i];

                if (i in newObj) {
                    tempObj[i] = newObj[i];
                }
            }
        }
        return tempObj;
    },

    isArray (item) {
        return item instanceof Array;
    },

    isObject (item) {
        return item instanceof Object;
    },

    isWindow (item) {
        return !(item && (item.constructor.toString().indexOf('Window') !== -1));
    },

    unikey (len = 16) {
        let result = '';
        for (; result.length < len; result += Math.random().toString(36).substr(2));
        return result.substr(0, len);
    },

    keyCreator (prefix = 'd') {
        let keyArr = this.unikey(9).match(/.{3}/g);
        keyArr.unshift(prefix);
        return keyArr.join('-');
    },

    getEvtPos (e) {
        return {
            x: e.pageX,
            y: e.pageY
        };
    },

    getScrollPos (nd) {
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

    getDomPageInfo (nd) {
        if (nd.getBoundingClientRect) {
            return nd.getBoundingClientRect();
        }

        let winScrollPos = this.getScrollPos();
        return {
            top: nd.offsetTop - winScrollPos.top,
            left: nd.offsetLeft - winScrollPos.left,
            width: nd.offsetWidth,
            height: nd.offsetHeight
        };
    },

    getDomAbsoluteInfo (nd) {
        let winScrollPos = this.getScrollPos();
        let reactInfo = nd.getBoundingClientRect();

        return {
            top: reactInfo.top + winScrollPos.top,
            left: reactInfo.left + winScrollPos.left,
            width: nd.offsetWidth,
            height: nd.offsetHeight
        };
    },

    addClass (nd, classStr) {
        if (nd.classList) {
            nd.classList.add(classStr);
        }
        else {
            let classArr = nd.className.replace(/\s{2,}/g, ' ').split(' ');
            if (classArr.indexOf(classStr) === -1) {
                classArr.push(classStr);
                nd.className = classArr.join(' ');
            }
        }
        return nd;
    },

    removeClass (nd, classStr) {
        if (nd.classList) {
            nd.classList.remove(classStr);
        }
        else {
            let classArr = nd.className.replace(/\s{2,}/g, ' ').split(' ');
            let myPos = classArr.indexOf(classStr);
            if (myPos !== -1) {
                classArr.splice(myPos, 1);
                nd.className = classArr.join(' ');
            }
        }
        return nd;
    },

    addEvent (nd, evtType, cbk) {
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

    removeEvent (nd, evtType, cbk) {
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

    fixGridVal (val, grid, range = [-Infinity, Infinity], floorFirst = true) {
        let step = val / grid;
        let valFloorStep = Math.floor(step);
        let valCeilStep = Math.ceil(step);
        let floorVal = valFloorStep * grid;
        let ceilVal = valCeilStep * grid;
        let fixedVal;
        if (floorVal > range[1]) {
            fixedVal = Math.floor(range[1] / grid) * grid;
        }
        else if (ceilVal < range[0]) {
            fixedVal = Math.ceil(range[0] / grid) * grid;
        }
        else {
            if (floorVal < range[0]) {
                fixedVal = ceilVal;
            }
            else if (ceilVal > range[1]) {
                fixedVal = floorVal;
            }
            else {
                fixedVal = floorFirst ? floorVal : ceilVal;
            }
        }

        return fixedVal;
    }
};

export default utils;
