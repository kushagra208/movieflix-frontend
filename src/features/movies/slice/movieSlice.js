import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/axios';

// Async thunk: fetch movies with paging
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ search = '', page = 0, size = 5, sort, filter }, { rejectWithValue }) => {
    try {
      const params = { search, page, size };
      if (sort) params.sort = sort;
      if (filter) params.filter = filter;

      const res = await api.get('/movies', { params });
      return res.data.result; // result: { data, size, pageNumber, totalPages, total }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    page: 0,
    size: 5,
    totalPages: 0,
    total: 0,
    current: null,
    status: 'idle',
    error: null,
    search: '',
    sort: '',
    filter: ''
  },
  reducers: {
    setSearch(state, action) { state.search = action.payload; },
    setSort(state, action) { state.sort = action.payload; },
    setFilter(state, action) { state.filter = action.payload; },
    setPage(state, action) { state.page = action.payload; },
    resetMovies(state) {
      state.list = [];
      state.page = 0;
      state.totalPages = 0;
      state.total = 0;
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
        state.list = payload.data || [];
        state.page = payload.pageNumber || 0;
        state.size = payload.size || 5;
        state.totalPages = payload.totalPages || 0;
        state.total = payload.total || 0;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch movies';
      });
  }
});

export const { setSearch, setSort, setFilter, setPage, resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
