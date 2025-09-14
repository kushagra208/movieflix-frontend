import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/axios';

// Async thunk: fetch movies with paging
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (id, { rejectWithValue }) => {
    try {
        
      const res = await api.get(`/movies/${id}`);
      return res.data.result; // result: { data, size, pageNumber, totalPages, total }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    current: null,
    status: 'idle',
    error: null,
    search: '',
  },
  reducers: {
    resetMovies(state) {
        state.current = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const payload = action.payload || {};
        state.current = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch movies';
      });
  }
});

export const { resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
