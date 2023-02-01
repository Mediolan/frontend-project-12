import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../../store/slices/messagesSlice';

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {body}
  </div>
);

const Messages = ({ currentChannelId }) => {
  const allMessages = Object.values(useSelector(selectors.selectAll));
  const currentChannelMessages = allMessages
    .filter((message) => message.channelId === currentChannelId);
  return (
    <>
      {currentChannelMessages.map(({ id, username, body }) => (
        <Message
          key={id}
          username={username}
          body={body}
        />
      ))}
    </>
  );
};

export default Messages;
