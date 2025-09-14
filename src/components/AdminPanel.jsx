import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button, TextField, Stack } from '@mui/material';
import api from '../api/axios';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [movieId, setMovieId] = useState('');
  const [deleteMovieId, setDeleteMovieId] = useState('');

  useEffect(()=> {
    api.get('/admin/users').then(res => setUsers(res.data.result || [])).catch(()=>{});
  }, []);

  const handleAddMovie = async () => {
    try {
      const res = await api.post('/admin/movies/create', {
        externalId: movieId
      });
      alert('Movie added');
    } catch (e) {
      alert('Error adding movie');
    }
  };

    const handleDeleteMovie = async () => {
    try {
      const res = await api.post('/admin/movies/delete', {
        externalId: deleteMovieId
      });
      alert('Movie deleted');
    } catch (e) {
      alert('Error adding movie');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">Admin Panel</Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <div>
          <Typography variant="subtitle1">Users</Typography>
          {users.length === 0 ? <Typography>No users</Typography> : users.map(u => <div key={u.id}>{u.username} ({u.role})</div>)}
        </div>

        <div>
          <Typography variant="subtitle1">Add Movie to Cache</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <TextField placeholder="imdbId e.g. tt3896198" value={movieId} onChange={e=>setMovieId(e.target.value)} />
            <Button variant="contained" onClick={handleAddMovie}>Add</Button>
          </Stack>
        </div>
        <div>
          <Typography variant="subtitle1">Delete Movie from Cache</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <TextField placeholder="imdbId e.g. tt3896198" value={deleteMovieId } onChange={e=>setDeleteMovieId(e.target.value)} />
            <Button variant="contained" onClick={handleDeleteMovie}>Delete</Button>
          </Stack>
        </div>
      </Stack>
    </Paper>
  );
}
