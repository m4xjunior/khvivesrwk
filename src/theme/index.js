


import { createTheme } from '@mui/material/styles';

// Design system theme configuration
const baseTheme = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 500 },
    h2: { fontSize: '2rem', fontWeight: 500 },
    h3: { fontSize: '1.75rem', fontWeight: 500 },
    h4: { fontSize: '1.5rem', fontWeight: 500 },
    h5: { fontSize: '1.25rem', fontWeight: 500 },
    h6: { fontSize: '1rem', fontWeight: 500 },
  },
  shape: {
    borderRadius: 8,
  },
};

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    primary: { main: '#3b82f6' },
    success: { main: '#10b981' },
    warning: { main: '#f59e0b' },
    secondary: { main: '#8b5cf6' },
    mode: 'light',
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
});

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    primary: { main: '#3b82f6' },
    success: { main: '#10b981' },
    warning: { main: '#f59e0b' },
    secondary: { main: '#8b5cf6' },
    mode: 'dark',
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
  },
});

export { lightTheme, darkTheme };


