import React, { useState } from 'react';
import { Box, Container, TextField, Typography, Grid } from '@mui/material';

const WelcomeContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="xxl">
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
        <Grid container spacing={2}>
          <Grid item xs={7}>
          </Grid>
          <Grid item xs={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h3" gutterBottom sx={{ color: '#fff' }}>
                Expand with GNIECloud
              </Typography>
              <Typography variant="subtitle1" paragraph sx={{ color: '#fff' }}>
                Find APIs, documentation, and more on the GNIECloud platform.
              </Typography>
              <TextField
                variant="filled"
                placeholder="Search APIs, Documentation..."
                InputProps={{
                  sx: {
                    backgroundColor: '#f3f3f3',
                    color: 'black',
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
