/**
 * 拖拽占位模块
 */
import React, {Component} from 'react';

class Placeholder extends Component {
    static defaultProps = {
        left: 0,
        top: 0
    };

    buildStyle = () => {
        let props = this.props;
        let {prevParam} = props;
        let style = {
            width: props.width,
            height: props.height,
            left: -parseFloat(prevParam.left || 0, 10) + parseFloat(props.left || 0, 10) + 'px',
            top: -parseFloat(prevParam.top || 0, 10) + parseFloat(props.top || 0, 10) + 'px'
        };

        return style;
    };

    render () {
        let style = this.buildStyle();
        return (
            <div className="dg-ph" style={style}></div>
        );
    };
}

export default Placeholder;
