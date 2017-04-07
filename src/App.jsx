import React, {Component} from 'react';
import Nav from './Nav.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: 'Anonymous'
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      onlineUser: 0,
      color: '#444444'
    }

    this.addMessage = this
      .addMessage
      .bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => {
      this.socket.onmessage = (message) => {
        message = JSON.parse(message.data)
        if (message.type === 'onlineUsers') {
          // Setting online users if message type equals onlineUsers
          this.setState({onlineUser: message.number});
        } else if (message.type === 'userColor') {
          this.setState({color: message.color})
        } else {
          // Post message or notification
          this
            .state
            .messages
            .push(message);
          this.setState({messages: this.state.messages});
        }

      }
    }

  }

  addMessage(type, username, content) {
    const message = {
      type,
      username,
      content
    };
    if (type === 'postNotification') {
      // Add description to content if type equals notification
      message.content = this.state.currentUser.name + ' has changed their name to ' + username;
      const currentUser = this.state.currentUser;
      currentUser.name = username;
      this.setState({currentUser})
      this
        .socket
        .send(JSON.stringify(message));
    }
    this
      .socket
      .send(JSON.stringify(message));
  }

  render() {
    return (
      <div>
        <Nav number={this.state.onlineUser}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar
          currentUser={this.state.currentUser.name}
          color={this.state.color}
          handleKeyPress={this.addMessage}/>
      </div>
    );
  }
}
export default App;
