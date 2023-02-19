import React from 'react';
import ChatHeader from './ChatHeader';
import NewMessageField from './NewMessageField';
import Messages from './Messages';

const ChatBox = () => (
  <div className="d-flex flex-column h-100">
    <ChatHeader />
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      <Messages />
    </div>
    <div className="mt-auto px-5 py-3">
      <NewMessageField />
    </div>
  </div>
);

export default ChatBox;
