/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, miniSerializeError } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

export const fetchAuthData = createAsyncThunk(
  'fetchAuthData',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      }
      if (error.isAxiosError) {
        return rejectWithValue('AxiosError');
      }
      return rejectWithValue(miniSerializeError(error));
    }
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
        state.loadingStatus = 'finish';
        state.error = null;
      })
      .addCase(fetchAuthData.rejected, (state, { payload }) => {
        state.loadingStatus = 'failed';
        state.error = payload;
      });
  },
});
export const { setDefault } = loaderSlice.actions;
export default loaderSlice.reducer;
