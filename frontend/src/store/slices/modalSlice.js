/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { activeModal: null, channelId: null },
  reducers: {
    openModal(state, { payload }) {
      const { activeModal, channelId } = payload;
      state.activeModal = activeModal;
      state.channelId = channelId ?? null;
    },
    closeModal(state) {
      state.activeModal = null;
      state.channelId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
