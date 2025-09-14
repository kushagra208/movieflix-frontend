import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#ffb300' },
    background: { default: '#f5f7fb' }
  },
  components: {
    MuiAppBar: { defaultProps: { elevation: 1 } }
  }
});

export default theme;
