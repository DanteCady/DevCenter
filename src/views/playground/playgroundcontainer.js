import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Paper, Grid, Typography, TextField, Button, TextareaAutosize, FormControl,
  Select, MenuItem, CssBaseline,
} from '@mui/material';

const App = () => {
  const [requestMethod, setRequestMethod] = useState('GET');
  const [requestUrl, setRequestUrl] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');

  const executeApi = () => {
    const requestConfig = {
      method: requestMethod,
      url: requestUrl,
      data: requestBody,
    };

    axios(requestConfig)
      .then(response => {
        setResponse(JSON.stringify(response.data, null, 2));
      })
      .catch(error => {
        if (error.response) {
          setResponse(JSON.stringify(error.response.data, null, 2));
        } else {
          setResponse('An error occurred while making the request.');
        }
      });
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" style={{ paddingTop: '20px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" align="center">
            API Tester
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <Select
                  value={requestMethod}
                  onChange={(e) => setRequestMethod(e.target.value)}
                >
                  <MenuItem value="GET">GET</MenuItem>
                  <MenuItem value="POST">POST</MenuItem>
                  <MenuItem value="PUT">PUT</MenuItem>
                  <MenuItem value="DELETE">DELETE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                value={requestUrl}
                onChange={(e) => setRequestUrl(e.target.value)}
                variant="outlined"
                placeholder="Enter API URL"
              />
            </Grid>
          </Grid>
          <TextareaAutosize
            minRows={4}
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            placeholder="Request Body (JSON)"
            style={{ width: '100%', marginTop: '10px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={executeApi}
            style={{ marginTop: '10px' }}
          >
            Execute Request
          </Button>
          <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', whiteSpace: 'pre-wrap' }}>
            <Typography variant="h6">Response:</Typography>
            {response}
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default App;
