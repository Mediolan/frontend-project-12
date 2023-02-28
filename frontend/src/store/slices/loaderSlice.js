/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAuthData = createAsyncThunk(
  'fetchAuthData',
  async (token) => {
    const response = await axios.get('/api/v1/data', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  },
);

const loaderSlice = createSlice({
  name: 'loader',
  initialState: { loadingStatus: 'idle', error: null },
  reducers: {
    setDefault(state) {
      state.loadingStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAuthData.fulfilled, (state) => {
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchAuthData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', action.error);
      });
  },
});
export const { setDefault } = loaderSlice.actions;
export default loaderSlice.reducer;
