/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import store from './store/index.js';
import App from './App';
import { SocketContext } from './context/index.jsx';
import { addMessage } from './store/slices/messagesSlice.js';
import {
  addChannel,
  deleteChannel,
  updateChannel,
} from './store/slices/channelsSlice.js';

export default async () => {
  const socket = io();

  const sendMessage = (message) => {
    socket.timeout(3000).emit('newMessage', message, (err, response) => {
      if (err) {
        console.log(err);
      }
      console.log(response.status);
    });
  };
  const createChannel = (channel) => {
    socket.timeout(3000).emit('newChannel', channel, (err, response) => {
      if (err) {
        console.log(err);
      }
      console.log(response.status);
    });
  };
  const renameChannel = (channel) => {
    socket.timeout(3000).emit('renameChannel', channel, (err, response) => {
      if (err) {
        console.log(err);
      }
      console.log(response.status);
    });
  };
  const removeChannel = (channel) => {
    socket.timeout(3000).emit('removeChannel', channel, (err, response) => {
      if (err) {
        console.log(err);
      }
      console.log(response.status);
    });
  };

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(updateChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(deleteChannel(payload));
  });

  return (
    <Provider store={store}>
      <SocketContext.Provider value={{
        sendMessage,
        createChannel,
        renameChannel,
        removeChannel,
      }}
      >
        <App />
      </SocketContext.Provider>
    </Provider>
  );
};
