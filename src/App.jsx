import React, { useMemo } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/auth/slice/authSlice';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from './components/Login';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import StatsDashboard from './components/StatsDashboard';
import AdminPanel from './components/AdminPanel.jsx';
import ProtectedRoute from './components/ProtectedRoutes';
import { createTheme, CssBaseline, GlobalStyles, IconButton, ThemeProvider } from '@mui/material';
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { toggleTheme } from './features/theme/slice/themeSlice';
import api from './api/axios.js';

export default function App() {
  const auth = useSelector(s => s.auth);
  const dispatch = useDispatch();

  const mode = useSelector((s) => s.theme.mode);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    dispatch(logout());
  }


    const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#f5f5f5", paper: "#fff" },
                text: { primary: "#000" },
              }
            : {
                background: { default: "#121212", paper: "#1d1d1d" },
                text: { primary: "#fff" },
              }),
        },
      }),
    [mode]
  );
  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => ({
        body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
      })}
  />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}>
            MovieFlix Dashboard
          </Typography>
          <Button component={Link} to="/stats" color="inherit">Stats</Button>
          <Button component={Link} to="/movies" color="inherit">Browse</Button>
          {auth.role === 'ROLE_ADMIN' && <Button component={Link} to="/admin" color="inherit">Admin</Button>}
          {!auth.token ? (
            <Button component={Link} to="/login" color="inherit">Login</Button>
          ) : (
            <Button onClick={() => { 
              handleLogout();
              <Navigate to = '/login' replace/>
             }} color="inherit">Logout</Button>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px" }}>
          <IconButton onClick={() => dispatch(toggleTheme())}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>
        </Toolbar>
      </AppBar>

      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Navigate to="/movies" replace />} />
            <Route path="/login" element={<Login />} />
              <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <MovieList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/:imdbId"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stats"
            element={
              <ProtectedRoute>
                <StatsDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ROLE_ADMIN">
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          </Routes>
        </Container>
      </Box>
      </ThemeProvider>
    </>
  );
}
