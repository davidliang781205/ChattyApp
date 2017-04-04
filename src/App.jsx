import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './MessageList.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Message />
        <ChatBar />
      </div>
    );
  }
}
export default App;
