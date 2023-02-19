/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchAuthData } from './loaderSlice';

export const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  defaultChannelId: null,
  currentChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
      state.currentChannelId = payload.id;
    },
    addChannels: channelsAdapter.addMany,
    updateChannel: channelsAdapter.upsertOne,
    deleteChannel: (state, { payload: { id } }) => {
      channelsAdapter.removeOne(state, id);
      if (id === state.currentChannelId) {
        state.currentChannelId = state.defaultChannelId;
      }
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthData.fulfilled, (state, { payload }) => {
      channelsAdapter.addMany(state, payload.channels);
      state.defaultChannelId = payload.currentChannelId;
      state.currentChannelId = payload.currentChannelId;
    });
  },
});

export const {
  addChannel,
  deleteChannel,
  updateChannel,
  setCurrentChannelId,
} = channelsSlice.actions;
export default channelsSlice.reducer;
