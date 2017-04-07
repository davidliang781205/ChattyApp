import React, {Component} from 'react';
import Message from './Message.jsx';
import SystemMessage from './SystemMessage.jsx';

class MessageList extends Component {
    render() {
        return (
            <main className="messages">
                {this
                    .props
                    .messages
                    .map((e) => {
                        if (e.type === 'incomingMessage') {
                            return <Message
                                key={e.uuid}
                                username={e.username}
                                content={e.content}
                                color={e.color}/>
                        } else {
                            return <SystemMessage key={e.uuid} content={e.content} color={e.color}/>
                        }
                    })}
            </main>
        );
    }
}
export default MessageList;
