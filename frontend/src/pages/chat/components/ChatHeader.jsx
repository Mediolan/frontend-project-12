import React from 'react';
import { useSelector } from 'react-redux';
import { getMessagesCount, getCurrentChannelName } from '../../../store/selectors';

const ChatHeader = () => {
  const currentChannelName = useSelector(getCurrentChannelName);
  const messagesCount = useSelector(getMessagesCount);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {' '}
          {currentChannelName}
        </b>
      </p>
      <span className="text-muted">
        {messagesCount}
        {' '}
        сообщений
      </span>
    </div>
  );
};

export default ChatHeader;
