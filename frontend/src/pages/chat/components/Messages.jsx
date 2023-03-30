import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getMessagesForCurrentChannel } from '../../../store/selectors';

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {body}
  </div>
);

const Messages = () => {
  const currentChannelMessages = useSelector(getMessagesForCurrentChannel);
  const messagesRef = useRef();

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [currentChannelMessages.length]);

  return (
    <div ref={messagesRef} id="messages-box" className="chat-messages overflow-auto px-5 ">
      {currentChannelMessages.map(({ id, username, body }) => (
        <Message
          key={id}
          username={username}
          body={body}
        />
      ))}
    </div>
  );
};

export default Messages;
