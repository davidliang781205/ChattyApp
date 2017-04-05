import React, {Component} from 'react';

class ChatBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
    }

    inputEnter(event) {
        if (event.key === "Enter") {
            this
                .props
                .handleKeyPress(this.state.username, this.state.content);
            this.setState({content: ''});
        }
    }

    onChangeContent(event) {
        this.setState({content: event.target.value});
    }

    render() {

        return (
            <footer className="chatbar" onKeyPress={this.inputEnter}>
                <input
                    className="chatbar-username"
                    placeholder="Name"
                    defaultValue={this.props.currentUser
                    ? this.props.currentUser
                    : "Anonymous"}/>
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
