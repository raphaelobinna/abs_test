import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_URL;

export const getPositions = createAsyncThunk(
  'positions/getPositions',
  async () => {
    const res = await fetch(`${apiUrl}/positions`);
    const data = await res.json();
    return data.positions;
  }
);

export const positionsSlice = createSlice({
  name: 'positions',
  initialState: {
    positions: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPositions.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getPositions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.positions = action.payload;
    });
    builder.addCase(getPositions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default positionsSlice.reducer;
