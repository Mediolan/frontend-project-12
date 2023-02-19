import { combineReducers, configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice';
import messagesReducer from './slices/messagesSlice';
import loaderReducer from './slices/loaderSlice';
import modalReducer from './slices/modalSlice';

const reducer = combineReducers({
  loader: loaderReducer,
  channels: channelsReducer,
  messages: messagesReducer,
  modal: modalReducer,
});

export default configureStore({
  reducer,
});
