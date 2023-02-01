import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice';
import messagesReducer from './slices/messagesSlice';
import loaderReducer from './slices/loaderSlice';
import modalReducer from './slices/modalSlice';

export default configureStore({
  reducer: {
    loader: loaderReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});
