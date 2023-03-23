/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { isOpened: false, modalType: null, channelId: null },
  reducers: {
    openModal(state, { payload }) {
      const { activeModal, channelId } = payload;
      state.isOpened = true;
      state.modalType = activeModal;
      state.channelId = channelId ?? null;
    },
    closeModal(state) {
      state.isOpened = false;
      state.modalType = null;
      state.channelId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
