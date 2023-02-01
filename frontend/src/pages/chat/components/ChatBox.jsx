import React from 'react';
import { useSelector } from 'react-redux';
import ChatHeader from './ChatHeader';
// eslint-disable-next-line import/no-cycle
import NewMessageField from './NewMessageField';
import Messages from './Messages';

const ChatBox = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  return (
    <div className="d-flex flex-column h-100">
      <ChatHeader currentChannelId={currentChannelId} />
      <div id="messages-box" className="chat-messages overflow-auto px-5 " />
      <Messages currentChannelId={currentChannelId} />
      <div className="mt-auto px-5 py-3">
        <NewMessageField currentChannelId={currentChannelId} />
      </div>
    </div>
  );
};

export default ChatBox;
