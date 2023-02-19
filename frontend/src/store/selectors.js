import { channelsAdapter } from './slices/channelsSlice';
import { messagesAdapter } from './slices/messagesSlice';

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);

export const getMessagesForCurrentChannel = (state) => {
  const { currentChannelId } = state.channels;
  const allMessages = messagesSelectors.selectAll(state);
  return allMessages.filter((message) => message.channelId === currentChannelId);
};

export const getMessagesCount = (state) => {
  const messages = getMessagesForCurrentChannel(state);
  return messages.length;
};

export const getChannelsName = (state) => {
  const channels = channelsSelectors.selectAll(state);
  return channels.map((channel) => channel.name);
};

export const getCurrentChannelName = (state) => {
  const { entities, currentChannelId } = state.channels;
  return entities[currentChannelId].name;
};
