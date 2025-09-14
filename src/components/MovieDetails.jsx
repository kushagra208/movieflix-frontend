import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../features/movies/slice/movieDetailsSlice.js';
import { Card, CardMedia, CardContent, Typography, Chip, Stack } from '@mui/material';

export default function MovieDetails() {
  const { imdbId } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector(s => s.movieDetails.current);

  useEffect(() => {
    dispatch(fetchMovies(imdbId));
    console.log(movie);
  }, [dispatch, imdbId]);

  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Card sx={{ display: 'flex', gap: 2 }}>
      <CardMedia component="img" sx={{ width: 300 }} image={movie.Poster || '/placeholder.png'} />
      <CardContent>
        <Typography variant="h5">{movie.Title} <Typography component="span" variant="subtitle2">({movie.Year})</Typography></Typography>
        <Stack direction="row" spacing={1} sx={{ my: 1 }}>
          {(movie.Genre || '').split(',').slice(0,4).map(g => <Chip key={g} label={g.trim()} />)}
        </Stack>
        <Typography variant="body2" sx={{ mt: 1 }}>{movie.Plot}</Typography>
        <Typography variant="caption" display="block" sx={{ mt: 2 }}>Director: {movie.Director}</Typography>
        <Typography variant="caption" display="block">Actors: {movie.Actors}</Typography>
        <Typography variant="caption" display="block">IMDB Rating: {movie.imdbRating}</Typography>
      </CardContent>
    </Card>
  );
}
