import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/axios';

export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  const res = await api.post('/auth/login', { username, password });
  // backend returns CustomResponse { result: { token, role } }
  return res.data.result;
});


const initialState = {
  token: localStorage.getItem('mf_token') || null,
  role: null,
  status: 'idle',
  message: '',
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.role = null;
      localStorage.removeItem('mf_token');
    },
    setToken(state, action) {
      state.token = action.payload.token;
      state.role = action.payload.user.role;
      localStorage.setItem('mf_token', action.payload.token);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(login.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.token = a.payload.token;
        s.role = a.payload.user.role;
        localStorage.setItem('mf_token', a.payload.token);
      })
      .addCase(login.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message; });
  }
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
