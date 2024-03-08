import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = createAsyncThunk('auth/getToken', async () => {
  const res = await fetch(`${apiUrl}/token`);

  const data = await res.json();

  return data.token;
});

export const register = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    const { token } = thunkAPI.getState().auth; // Accessing token from auth state

    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    const res = await fetch(`${apiUrl}/users`, {
      method: 'POST',
      headers: { Token: token },
      body: formData,
    });
    const response = await res.json();
    return response;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    token: '',
    reload: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getToken.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reload = !state.reload;
      state.token = action.payload;
    });
    builder.addCase(getToken.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(register.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reload = !state.reload;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.fails;
    });
  },
});

export default authSlice.reducer;
