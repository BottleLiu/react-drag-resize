## Drag-Resize By React

__Main File__:`src/js/drag/drag-resize.js`

### API
---

参数      | 说明          | 类型               | 默认参数
---------|--------------|--------------------|-----------
|enabled|开启/关闭Drag或Resize|Object|`{drag: true, resize: true}`
|grid|网格步进，配置后，将按照设置的步进值为单元进行变更，如：`[50, 100]`表征水平方向以50步进，垂直方向以100步进|Array|[]
|frozen|冻结操作，如：`true`表征完全冻结，`x`/`y`分别表征对x方向和y方向冻结|Boolean/String|无
|enablePlaceholder|占位元素控制|Boolean|true
|bound|拖拽边界，可选节点/`parent`关键词|Node/String|无
|dragHandler|拖拽手柄，建议放在最靠近外层，同时标识唯一标识符key|Node/Element/String|无
|resizeHandler|拖拽手柄，建议放在最靠近外层，同时标识唯一标识符key|Node/Element/String|无
|betterFixed|开启后，在元素fixed的情况，将控制其不被拖出窗口|Boolean|true
|beforeEnd|操作结束时的回调，返回`false`时将取消此次操作|Boolean/Function|无
|onStart|操作开始时的回调，接收参数`e, actType, params`|Function|无
|onProcess|操作进行时的回调，接收参数`e, actType, params`|Function|无
|onEnd|操作结束时的回调，接收参数`e, actType, params`|Function|无