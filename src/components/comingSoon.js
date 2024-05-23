import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { Build } from '@mui/icons-material';

const ComingSoonPage = ({ title, description }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: '#FF5252', // Change the tile color 
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.25)',
            textAlign: 'center',
          }}
        >
          <Build sx={{ fontSize: '80px', color: '#ffffff' }} />
          <Typography variant="h4" component="h1" sx={{ marginBottom: '20px', color: '#ffffff' }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: '#ffffff' }}>
            {description}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ComingSoonPage;
