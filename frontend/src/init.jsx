/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './store/index.js';
import App from './App';
import { SocketContext } from './context/index.jsx';
import { addMessage } from './store/slices/messagesSlice.js';
import {
  addChannel,
  deleteChannel,
  updateChannel,
} from './store/slices/channelsSlice.js';
import resources from './locales/index.js';

export default async () => {
  const dictionaries = leoProfanity.getDictionary('ru', 'en');
  leoProfanity.add(dictionaries);

  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
      fallbackLng: 'ru',
    });

  const socket = io();

  const withConfirm = (...arg) => new Promise((resolve, reject) => {
    socket.timeout(3000).emit(...arg, (err, response) => {
      if (response?.status === 'ok') {
        resolve(response.data);
      }
      reject();
    });
  });

  const api = {
    sendMessage: (message) => withConfirm('newMessage', message),
    createChannel: (channel) => withConfirm('newChannel', channel),
    renameChannel: (channel) => withConfirm('renameChannel', channel),
    removeChannel: (channel) => withConfirm('removeChannel', channel),
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

  const rollbarConfig = {
    enabled: true,
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18nextInstance={i18nextInstance}>
            <SocketContext.Provider value={{ api }}>
              <App />
            </SocketContext.Provider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
