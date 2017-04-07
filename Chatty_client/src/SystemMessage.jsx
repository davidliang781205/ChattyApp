import React, {Component} from 'react';

class SystemMessage extends Component {
    render() {
        const textColor = {
            color: this.props.color
        };
        return (
            <div className="message system" style={textColor}>
                {this.props.content}
            </div>

        );
    }
}
export default SystemMessage;
