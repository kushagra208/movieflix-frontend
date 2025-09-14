import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMovies,
  setSearch,
  setSort,
  setFilter,
  setPage,
  resetMovies
} from '../features/movies/slice/movieSlice';
import {
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Pagination,
  Stack,
  IconButton,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function MovieList() {
  const dispatch = useDispatch();
  const { list, page, totalPages, search, sort, filter, status } = useSelector(
    (s) => s.movies
  );

  useEffect(() => {
    dispatch(fetchMovies({ search, page, size: 5, sort, filter }));
  }, [dispatch, page, sort]);   

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(resetMovies());
    dispatch(setPage(0)); // reset to first page
    dispatch(fetchMovies({ search, page: 0, size: 5, sort, filter }));
  };

  return (
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {/* Search + Filters */}
        <form
          onSubmit={handleSearchSubmit}
          style={{ display: 'flex', gap: 12, marginBottom: 16 }}
        >
          <TextField
            placeholder="Search movies..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            sx={{ flex: 1 }}
          />
          <FormControl sx={{ minWidth: 140 }}>
            <InputLabel>Sort</InputLabel>
            <Select
              value={sort}
              label="Sort"
              onChange={(e) => dispatch(setSort(e.target.value))}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>
          </FormControl>
          <TextField
            placeholder="genre:Sci-Fi,Action"
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
            sx={{ minWidth: 220 }}
          />
          <Button type="submit" variant="contained">
            Search
          </Button>
        </form>

        {status === 'loading' ? <Typography>Loading movies...</Typography> :
        status === 'failed' ? (
          <Typography color="error">Error loading movies</Typography>
        ) :
        <Grid width={'100%'} container spacing={2} justifyContent={"center"}>
          {list.map((m) => (
            <Grid item xs={12} sm={6} md={3} key={m.externalId}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  image={m.poster || '/placeholder.jpg'}
                  alt='Image Not Found'
                  sx={{
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    component={Link}
                    to={`/movies/${m.externalId}`}
                    sx={{
                      textDecoration: 'none',
                      display: 'block',
                      fontWeight: 600,
                      width: "300px"
                    }}
                  >
                    {m.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {m.year}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        }

        {/* Pagination */}
        {totalPages >= 1 && (
          <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page + 1}
              onChange={(e, v) => dispatch(setPage(v - 1))}
            />
          </Stack>
        )}
      </Container>
  );
}
