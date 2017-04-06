import React, {Component} from 'react';

class Message extends Component {
  render() {
    const textColor = {
      color: this.props.color
    };
    if (new RegExp('(http:\/\/|https:\/\/)+.+(.jpg|.png|.jpeg|.svg)', 'g').test(this.props.content)) {
      return (
        <div className="message">
          <span className="message-username" style={textColor}>{this.props.username}</span>
          <span className="message-content">{this.props.content}
            <br/>
            <img src={this.props.content}/></span>
        </div>
      );
    } else {
      return (
        <div className="message">
          <span className="message-username" style={textColor}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    }
  }
}
export default Message;
