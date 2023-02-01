/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { activeModal: null },
  reducers: {
    openModal(state, { payload }) {
      state.activeModal = payload;
    },
    closeModal(state) {
      state.activeModal = null;
    },
  },
});

export const { actions } = modalSlice;
export const selectors = modalSlice.getSelectors((state) => state.messages);
export default modalSlice.reducer;
