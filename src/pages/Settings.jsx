


import React from 'react';
import { Box, Switch, FormControlLabel, Typography, TextField } from '@mui/material';
import useStore from '../store/store';

export default function Settings() {
  const darkMode = useStore(state => state.darkMode);
  const toggleDarkMode = useStore(state => state.toggleDarkMode);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Application Settings
      </Typography>
      
      <FormControlLabel
        control={
          <Switch 
            checked={darkMode} 
            onChange={toggleDarkMode} 
            color="primary"
          />
        }
        label="Dark Mode"
        sx={{ mb: 2 }}
      />
      
      <Typography variant="h6" gutterBottom>
        API Configuration
      </Typography>
      
      <TextField
        label="FORD API URL"
        defaultValue="http://178.79.173.223/ford/"
        fullWidth
        sx={{ mb: 2 }}
      />
      
      <TextField
        label="ENTORNO API URL"
        placeholder="Enter ENTORNO_URL"
        fullWidth
        sx={{ mb: 2 }}
      />
      
      <TextField
        label="JWT Secret"
        type="password"
        placeholder="Enter JWT secret"
        fullWidth
        sx={{ mb: 2 }}
      />
    </Box>
  );
}


