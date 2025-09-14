import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slice/authSlice.js';
import moviesReducer from '../features/movies/slice/movieSlice.js';
import movieDetailsReducer from '../features/movies/slice/movieDetailsSlice.js';
import statsReducer from '../features/stats/slice/statsSlice.js';
import themeReducer from '../features/theme/slice/themeSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    stats: statsReducer,
    theme: themeReducer
  }
});

export default store;
