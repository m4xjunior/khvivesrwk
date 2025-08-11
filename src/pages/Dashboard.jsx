

import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const metrics = [
    { title: 'Total Inspections', value: 42 },
    { title: 'Completed', value: 38 },
    { title: 'Pending', value: 4 },
    { title: 'Rejected', value: 0 },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {metric.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {metric.value}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

