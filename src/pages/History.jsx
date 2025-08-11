


import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function History() {
  // Placeholder data
  const historyData = [
    { id: 1, vin: 'ABCDEF12345678901', date: '2025-08-10', status: 'Completed' },
    { id: 2, vin: 'XYZ98765432109876', date: '2025-08-09', status: 'Pending' },
    { id: 3, vin: 'LMNOPQ56789012345', date: '2025-08-08', status: 'Rejected' },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>VIN</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.vin}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}


