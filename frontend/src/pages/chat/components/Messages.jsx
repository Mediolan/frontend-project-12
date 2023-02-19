import React from 'react';
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
