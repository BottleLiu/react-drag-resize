import React from 'react';
import ReactDOM from 'react-dom';
import DragResize from './drag/drag-resize';

const debugFlag = false;
const handleStart = (e, act, param) => {
    debugFlag && console.log('Start', act, param);
};
const handleProcess = (e, act, param) => {
    debugFlag && console.log('Process', act, param);
};
const handleEnd = (e, act, param) => {
    debugFlag && console.log('End', act, param);
};

const handleBeforeEnd = (e, act, param, info) => {
    return true;
};
const Root = (
    <div className="dg-wrapper">
        <div className="demo-group">
            <div className="group-title">1. Grid</div>
            <div className="group-content">
                <DragResize
                    onStart={handleStart}
                    onProcess={handleProcess}
                    onEnd={handleEnd}
                    beforeEnd={handleBeforeEnd}
                    dragHandler=".handle"
                    resizeHandler=".resize-handle"
                    enablePlaceholder={true}
                    sizeRange={{w: [100], h: [100]}}
                    grid={[50, 50]}
                    style={{height: '100px', width: '100px'}}>
                    <div className="demo-box">
                        <div className="handle">|||</div>
                        <div className="resize-handle">⇲</div>
                        Box 1
                    </div>
                </DragResize>
            </div>
        </div>
        <div className="demo-group">
            <div className="group-title">2. Boundary</div>
            <div className="dg-bound">
                <DragResize
                    bound="parent"
                    onStart={handleStart}
                    onProcess={handleProcess}
                    onEnd={handleEnd}
                    dragHandler=".handle"
                    resizeHandler=".resize-handle"
                    enablePlaceholder={true}
                    sizeRange={{w: [100], h: [100]}}
                    style={{height: '100px', width: '100px'}}>
                    <div className="demo-box">
                        <div className="handle">|||</div>
                        <div className="resize-handle">⇲</div>
                        Box 2
                    </div>
                </DragResize>
            </div>
        </div>
        <div className="demo-group">
            <div className="group-title">3. Disable Drag / Disable Resize</div>
            <div className="dg-bound">
                <DragResize
                    bound="parent"
                    enabled={{drag: true}}
                    onStart={handleStart}
                    onProcess={handleProcess}
                    onEnd={handleEnd}
                    dragHandler=".handle"
                    resizeHandler=".resize-handle"
                    enablePlaceholder={true}
                    sizeRange={{w: [100], h: [100]}}
                    style={{height: '100px', width: '100px'}}>
                    <div className="demo-box">
                        <div className="handle">|||</div>
                        <div className="resize-handle">⇲</div>
                        Only Drag
                    </div>
                </DragResize>
            </div>
            <div className="dg-bound">
                <DragResize
                    bound="parent"
                    enabled={{resize: true}}
                    onStart={handleStart}
                    onProcess={handleProcess}
                    onEnd={handleEnd}
                    dragHandler=".handle"
                    resizeHandler=".resize-handle"
                    enablePlaceholder={true}
                    sizeRange={{w: [100], h: [100]}}
                    style={{height: '100px', width: '100px'}}>
                    <div className="demo-box">
                        <div className="handle">|||</div>
                        <div className="resize-handle">⇲</div>
                        Only Resize
                    </div>
                </DragResize>
            </div>
        </div>
    </div>
);

ReactDOM.render(Root, document.getElementById('root'));
