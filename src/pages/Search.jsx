


import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Chip, TextareaAutosize } from '@mui/material';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useStore from '../store/store';

export default function Search() {
  const [vin, setVin] = useState('');
  const [observations, setObservations] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const token = useStore(state => state.token);
  const setSelectedVin = useStore(state => state.setSelectedVin);

  const { data: campaigns, isLoading, isError } = useQuery({
    queryKey: ['campaigns', vin],
    queryFn: async () => {
      if (!vin) return [];
      const response = await axios.get(`/api/ford/campaigns?vin=${vin}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
    enabled: !!vin && vin.length > 10,
    retry: 3
  });

  const handleSubmit = async () => {
    if (!selectedCampaign) return;
    try {
      await axios.post('/api/ford/validate', {
        vin_id: selectedCampaign.id,
        status: selectedCampaign.status,
        observations
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedVin(vin);
      alert('Validation submitted successfully!');
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TextField
          label="Enter VIN"
          variant="outlined"
          fullWidth
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          sx={{ mb: 2 }}
        />
      </motion.div>

      {isLoading && <div>Loading campaigns...</div>}
      {isError && <div>Error loading campaigns</div>}

      {campaigns && campaigns.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <List>
            {campaigns.map((campaign) => (
              <ListItem 
                key={campaign.id}
                button
                selected={selectedCampaign?.id === campaign.id}
                onClick={() => setSelectedCampaign(campaign)}
                sx={{ mb: 1, borderRadius: 1 }}
              >
                <ListItemText
                  primary={campaign.name}
                  secondary={campaign.description}
                />
                <Chip 
                  label={campaign.status === 1 ? 'OK' : campaign.status === 2 ? 'OKR' : 'NOK'}
                  color={campaign.status === 1 ? 'success' : campaign.status === 2 ? 'warning' : 'error'}
                />
              </ListItem>
            ))}
          </List>
        </motion.div>
      )}

      {selectedCampaign && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <TextareaAutosize
            minRows={3}
            placeholder="Observations"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            component={motion.div}
            whileTap={{ scale: 0.95 }}
          >
            Submit Validation
          </Button>
        </motion.div>
      )}
    </Box>
  );
}


