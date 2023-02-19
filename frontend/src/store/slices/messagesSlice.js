import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchAuthData } from './loaderSlice';
import { deleteChannel } from './channelsSlice';

export const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthData.fulfilled, (state, { payload }) => {
        messagesAdapter.addMany(state, payload.messages);
      })
      .addCase(deleteChannel, (state, { payload: { id } }) => {
        const messagesByChannelId = Object.values(state.entities)
          .filter(({ channelId }) => channelId === id)
          .map((message) => message.id);
        messagesAdapter.removeMany(state, messagesByChannelId);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
