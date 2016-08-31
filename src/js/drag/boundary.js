/**
 * 处理边界
 */
import utils from './utils';

const getStyle = utils.getStyle;

// 计算可使用的区域
const calcAvailableZone = (nd, relativeParentInfo, wrapperPosVal) => {
    let ndStyle;
    let ndInfo;
    if (utils.isNode(nd)) {
        ndStyle = getStyle(nd);
        ndInfo = utils.getDomAbsoluteInfo(nd);
    }
    else if (utils.isWindow(nd)) {
        let winSize = utils.getWinSize(nd.document.body);
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
    }
    else {
        return false;
    }
    // 此处由于ndInfo是基于初始时位置计算的，因此直接使用即可
    let bdL = parseFloat(ndStyle.borderLeftWidth, 10);
    let bdR = parseFloat(ndStyle.borderRightWidth, 10);
    let bdT = parseFloat(ndStyle.borderTopWidth, 10);
    let bdB = parseFloat(ndStyle.borderBottomWidth, 10);
    let bpL = bdL + parseFloat(ndStyle.paddingLeft, 10);
    let bpR = bdR + parseFloat(ndStyle.paddingRight, 10);
    let bpT = bdT + parseFloat(ndStyle.paddingTop, 10);
    let bpB = bdB + parseFloat(ndStyle.paddingBottom, 10);

    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;
    // 相对参数的边界条件特殊处理，其元素定位与内边距有关
    if (wrapperPosVal === 'relative') {
        startX = ndInfo.left - relativeParentInfo.left + bdL;
        endX = startX + ndInfo.width - bpL - bpR;
        startY = ndInfo.top - relativeParentInfo.top + bdT;
        endY = startY + ndInfo.height - bpT - bpB;
    }
    else {
        startX = ndInfo.left - relativeParentInfo.left + bpL;
        endX = startX + ndInfo.width - bpL - bpR;
        startY = ndInfo.top - relativeParentInfo.top + bpT;
        endY = startY + ndInfo.height - bpT - bpB;
    }
    let range = {
        x: [startX, endX],
        y: [startY, endY]
    };
    return range;
};

export default {
    calcAvailableZone
};
