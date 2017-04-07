import React, {Component} from 'react';

class ChatBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: '',
            username: this.props.currentUser
                ? this.props.currentUser
                : "Anonymous",
            content: ''
        };
        this.inputEnter = this
            .inputEnter
            .bind(this);
        this.onChangeContent = this
            .onChangeContent
            .bind(this);
        this.onChangeUsername = this
            .onChangeUsername
            .bind(this);
    }

    inputEnter(event) {
        if (event.key === "Enter") {
            if (this.state.type) {
                this
                    .props
                    .handleKeyPress(this.state.type, this.state.username, this.state.content, this.state.color);
                this.setState({content: ''});
            } else {
                alert('You didn\'t change anything');
            }
        }
    }

    onChangeContent(event) {
        this.setState({type: 'postMessage', content: event.target.value});
    }

    onChangeUsername(event) {
        this.setState({type: 'postNotification', username: event.target.value});
    }

    render() {

        const textColor = {
            color: this.props.color
        };
        return (
            <footer className="chatbar" onKeyPress={this.inputEnter}>
                <input
                    className="chatbar-username"
                    placeholder="Name"
                    defaultValue={this.state.username}
                    onChange={this.onChangeUsername}
                    style={textColor}/>
                <input
                    className="chatbar-message"
                    placeholder="Type a message and hit ENTER"
                    onChange={this.onChangeContent}
                    value={this.state.content}/>
            </footer>
        );
    }
}
export default ChatBar;
