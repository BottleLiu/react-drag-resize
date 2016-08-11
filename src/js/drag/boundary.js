/**
 * 处理边界
 */
import utils from './utils';

const getStyle = utils.getStyle;

// 计算可使用的区域
const calcAvailableZone = (nd, relativeParentInfo) => {
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
    let bpL = parseFloat(ndStyle.borderLeftWidth, 10) + parseFloat(ndStyle.paddingLeft, 10);
    let bpR = parseFloat(ndStyle.borderRightWidth, 10) + parseFloat(ndStyle.paddingRight, 10);
    let startX = ndInfo.left - relativeParentInfo.left + bpL;
    let endX = startX + ndInfo.width - bpL - bpR;

    let bpT = parseFloat(ndStyle.borderTopWidth, 10) + parseFloat(ndStyle.paddingTop, 10);
    let bpB = parseFloat(ndStyle.borderBottomWidth, 10) + parseFloat(ndStyle.paddingBottom, 10);
    let startY = ndInfo.top - relativeParentInfo.top + bpT;
    let endY = startY + ndInfo.height - bpT - bpB;
    let range = {
        x: [startX, endX],
        y: [startY, endY]
    };
    return range;
};

export default {
    calcAvailableZone
};
