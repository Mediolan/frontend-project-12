import React from 'react';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import store from './store/index.js';
import App from './App';

export const socket = io();

export default async () => {
  socket.on('connect', () => {
    console.log(socket.id);
  });
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
