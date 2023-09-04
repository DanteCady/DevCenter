import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Paper, Grid, Typography, TextField, Button, TextareaAutosize, FormControl,
  Select, MenuItem, CssBaseline, List, ListItem, ListItemText, CircularProgress,
  Collapse, ListItemIcon,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Header from '../../components/header';

const App = () => {
  const [requestMethod, setRequestMethod] = useState('GET');
  const [requestUrl, setRequestUrl] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [apiList, setApiList] = useState([]);
  const [swaggerData, setSwaggerData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [openApi, setOpenApi] = useState({});
  const [selectedApi, setSelectedApi] = useState(null);

  const getColorByMethod = (method) => {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'green';
      case 'POST':
        return 'blue';
      case 'PUT':
        return 'orange';
      case 'DELETE':
        return 'red';
      default:
        return 'black';
    }
  };

  useEffect(() => {
    fetch('http://localhost:3001/api/docs/list')
      .then((response) => response.json())
      .then((data) => {
        setApiList(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedApi) return;

    axios.get(`http://localhost:3001/api/docs/${selectedApi}`)
      .then(response => {
        setSwaggerData(prevSwaggerData => ({
          ...prevSwaggerData,
          [selectedApi]: response.data,
        }));
      })
      .catch(error => {
        console.error(`Error fetching Swagger data for API ${selectedApi}:`, error);
      });
  }, [selectedApi]);

  const toggleApi = (api, path) => {
    setOpenApi({
      ...openApi,
      [api]: !openApi[api],
    });
    setSelectedApi(api);
    if (path) {
      setRequestUrl(`https://api.gniecloud.com${path}`);
    } else {
      setRequestUrl('');
    }
  };

  const executeApi = () => {
    const fullApiUrl = requestUrl.startsWith('http') ? requestUrl : `https://api.gniecloud.com${requestUrl}`;

    const requestConfig = {
      method: requestMethod,
      url: fullApiUrl,
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
      <Header />
      <CssBaseline />
      <Container maxWidth="lg" style={{ paddingTop: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper elevation={3} style={{ backgroundColor: '#fff' }}>
              <Typography variant="h6" align="center">
                API List
              </Typography>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <List>
                  {apiList.map((api, apiIndex) => (
                    <React.Fragment key={apiIndex}>
                      <ListItem
                        button
                        key={apiIndex}
                        onClick={() => toggleApi(api)}
                      >
                        <ListItemText primary={api} />
                        <ListItemIcon>
                          {openApi[api] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemIcon>
                      </ListItem>
                      <Collapse
                        in={openApi[api]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {swaggerData[api]?.paths && Object.entries(swaggerData[api].paths).map(([path, methods], index) => (
                            <ListItem
                              button
                              key={index}
                              onClick={() => toggleApi(api, path)}
                              style={{
                                border: `3px solid ${getColorByMethod(Object.keys(methods)[0])}`,
                                paddingLeft: '10px',
                                margin: '3px',
                              }}
                            >
                              <ListItemText
                                primary={
                                  <>
                                    {Object.keys(methods).map(method => (
                                      <span
                                        key={method}
                                        style={{
                                          color: getColorByMethod(method),
                                          marginRight: '5px',
                                        }}
                                      >
                                        {method.toUpperCase()}
                                      </span>
                                    ))}
                                    {path}
                                  </>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
          <Grid item xs={9}>
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;
