// Import necessary dependencies
import React, { useState } from 'react';
import { Box, Container, TextField, Typography, Grid } from '@mui/material';
import { useDarkMode } from '../DarkModeContext';

// WelcomeContainer component definition
const WelcomeContainer = () => {
  // Use dark mode context
  const { darkMode } = useDarkMode();

  // Local state for search term
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    // Main Container
    <Container maxWidth="xxl">
      {/* Main Box Container */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: '400px',
          width: '100%',
          marginTop: '25px',
          marginBottom: '2rem',
          padding: '1rem',
          borderRadius: '5px',
          backgroundColor: '#0c51a1',
        }}
      >
        {/* Grid Container */}
        <Grid container spacing={2}>
          {/* Empty grid for alignment */}
          <Grid item xs={7}>
          </Grid>
          {/* Content Grid */}
          <Grid item xs={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              {/* Heading */}
              <Typography variant="h3" gutterBottom sx={{ color: '#fff' }}>
                Expand with GNIECloud
              </Typography>
              {/* Subtitle */}
              <Typography variant="subtitle1" paragraph sx={{ color: '#fff' }}>
                Find APIs, documentation, and more on the GNIECloud platform.
              </Typography>
              {/* Search Input */}
              <TextField
                variant="filled"
                placeholder="Search APIs, Documentation..."
                InputProps={{
                  sx: {
                    backgroundColor: darkMode ? '#2F3033' : '#f3f3f3',
                    color: darkMode ? 'white' : 'black',
                    borderRadius: '5px',
                  },
                }}
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WelcomeContainer;
