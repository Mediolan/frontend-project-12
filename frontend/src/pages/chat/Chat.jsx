import React from 'react';
// eslint-disable-next-line import/no-cycle
import ChatBox from './components/ChatBox';
import ChannelsBox from './components/ChannelsBox';

const Chat = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <ChannelsBox />
      </div>
      <div className="col p-0 h-100">
        <ChatBox />
      </div>
    </div>
  </div>
);

export default Chat;
