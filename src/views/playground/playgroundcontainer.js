import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Paper, Grid, List, ListItem,
  ListItemText, Typography, CircularProgress,
  Collapse, ListItemIcon, TextField, Button,
  TextareaAutosize, CssBaseline, FormControl,
  Select, MenuItem,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Header from '../../components/header';
import { useDarkMode } from '../../DarkModeContext';

const App = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [apiList, setApiList] = useState([]);
  const [swaggerData, setSwaggerData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApi, setSelectedApi] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('GET');
  const [openApi, setOpenApi] = useState({});
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState(null);
  const [protocol, setProtocol] = useState('https'); // Default to HTTPS
  const [requestUrl, setRequestUrl] = useState('');

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
    setSelectedMethod('GET'); // Set the default method to 'GET'
  } else {
    setRequestUrl('');
    setSelectedMethod(null);
  }
};

 const executeApi = () => {
  if (selectedApi && selectedMethod && requestUrl) {
    const fullApiUrl = requestUrl; // Use the requestUrl directly

    const requestConfig = {
      method: selectedMethod.toUpperCase(),
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
  }
};


  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth={false} disableGutters style={{ backgroundColor: darkMode ? '#333' : '#f5f5f5', height: '100vh' }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper elevation={3} style={{ backgroundColor: darkMode ? '#333' : '#fff' }}>
              <Typography variant="h6" align="center" style={{ color: darkMode ? '#fff' : '#000' }}>
                GNIECloud API List
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
                        style={{ border: darkMode ? 'none' : '1px solid #ccc' }}
                      >
                        <ListItemText primary={api} style={{ color: darkMode ? '#fff' : '#000' }} />
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
                                backgroundColor: openApi[api] ? '#f5f5f5' : 'transparent',
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
                                style={{ color: darkMode ? '#000' : '#333' }}
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
            <Paper elevation={3} style={{ backgroundColor: darkMode ? '#444' : '#f5f5f5' }}>
              <Typography variant="h6" align="center" style={{ color: darkMode ? '#fff' : '#000' }}>
                API Testing Area
              </Typography>
              {selectedApi && (
                <>
                  <Typography variant="body1" style={{ color: darkMode ? '#fff' : '#000' }}>
                    Selected API: {selectedApi}
                  </Typography>
                  <div>
                    <FormControl
                      variant="outlined"
                      style={{ margin: '1em 0' }}
                    >
                      <Select
                        labelId="method-label"
                        value={selectedMethod}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        sx={{ backgroundColor: darkMode ? '#2F3033' : '#f9f9f9' }}
                      >
                        <MenuItem value="GET">GET</MenuItem>
                        <MenuItem value="POST">POST</MenuItem>
                        <MenuItem value="PUT">PUT</MenuItem>
                        <MenuItem value="DELETE">DELETE</MenuItem>
                      </Select>
                    </FormControl>
                   <TextField
                      fullWidth
                      value={requestUrl}
                      onChange={(e) => setRequestUrl(e.target.value)}
                      variant="outlined"
                      style={{ margin: '1em 0' }}
                      placeholder="Enter API path (e.g. /v1/resource)"
                    />
                    <TextareaAutosize
                      minRows={3}
                      style={{
                        width: '100%',
                        padding: '1em',
                        backgroundColor: darkMode ? '#555' : '#fff',
                        color: darkMode ? '#fff' : '#000',
                        border: '1px solid #ccc',
                      }}
                      onChange={(e) => setRequestBody(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={executeApi}
                      sx={{ backgroundColor: '#0c51a1' }}
                    >
                      Execute
                    </Button>
                  </div>
                  <div style={{ backgroundColor: darkMode ? '#333' : '#fff', padding: '1em', borderRadius: '5px', marginTop: '1em' }}>
                    <Typography variant="h6" style={{ color: darkMode ? '#fff' : '#000' }}>Response</Typography>
                    <pre style={{ color: darkMode ? '#fff' : '#000', overflowX: 'scroll' }}>
                      {response !== null ? (
                        response
                      ) : (
                        'Execute an API to see the response here.'
                      )}
                    </pre>
                  </div>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;