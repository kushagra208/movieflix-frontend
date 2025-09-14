import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/axios';

export const fetchStats = createAsyncThunk('stats/fetchStats', async () => {
  const res = await api.get('/stats');
  return res.data.result;
});

const slice = createSlice({
  name: 'stats',
  initialState: { data: null, status: 'idle', error: null },
  extraReducers: (b) => {
    b.addCase(fetchStats.pending, (s) => { s.status = 'loading'; s.error = null; });
    b.addCase(fetchStats.fulfilled, (s, a) => { s.status = 'succeeded'; s.data = a.payload; });
    b.addCase(fetchStats.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message; });
  }
});

export default slice.reducer;
