import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_URL;

export const getAllUsers = createAsyncThunk('auth/getAllUsers', async data => {
  const res = await fetch(
    `${apiUrl}/users?page=${data.page}&count=${data.count}`
  );
  const response = await res.json();

  return response;
});

export const getSingleUser = createAsyncThunk(
  'auth/getSingleUser',
  async data => {
    const res = await fetch(`${apiUrl}/users/${data.id}`);
    const response = await res.json();
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    users: {},
    isLoading: false,
    error: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllUsers.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      if (
        state.users.hasOwnProperty('users') &&
        action.payload.page > state.users.page
      ) {
        // if existing users then concat
        state.users = {
          ...action.payload,
          users: [...state.users.users, ...action.payload.users],
        };
        return;
      }
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getSingleUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getSingleUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(getSingleUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
