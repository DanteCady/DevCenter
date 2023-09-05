import React, { useState, useEffect } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  GetApp as GetAppIcon,
} from '@mui/icons-material';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import YAML from 'js-yaml';
import axios from 'axios';
import '../../swagger-styles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDarkMode } from '../../DarkModeContext';
import MaintenanceNotification from '../../components/maintenance';

const ApiExplorer = () => {
  const { darkMode, setDarkMode } = useDarkMode(); 
  const [apiList, setApiList] = useState([]);
  const [selectedApi, setSelectedApi] = useState('');
  const [swaggerData, setSwaggerData] = useState(null);
  const [exportOptionsOpen, setExportOptionsOpen] = useState(false);
  const [totalApisPerApi, setTotalApisPerApi] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/docs/list')
      .then(response => {
        setApiList(response.data);
        setSelectedApi(response.data[0]);
        const apiCountObj = {};
        response.data.forEach(api => {
          apiCountObj[api] = 0;
        });
        setTotalApisPerApi(apiCountObj);
      })
      .catch(error => {
        console.error("Error fetching API list:", error);
      });
  }, []);

  useEffect(() => {
    if (!selectedApi) return;

    axios.get(`http://localhost:3001/api/docs/${selectedApi}`)
      .then(response => {
        setSwaggerData(response.data);

        const paths = response.data.paths;
        const pathCount = Object.keys(paths).length;

        setTotalApisPerApi(prevState => ({
          ...prevState,
          [selectedApi]: pathCount
        }));
      })
      .catch(error => {
        console.error(`Error fetching Swagger data for API ${selectedApi}:`, error);
      });
  }, [selectedApi]);

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem('theme');
  //   if (savedTheme) {
  //     setThemeMode(savedTheme);
  //   } else {
  //     localStorage.setItem('theme', 'light');
  //     setThemeMode('light');
  //   }
  // }, []);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const exportSwagger = (format) => {
    if (swaggerData) {
      const filename = `${selectedApi}.${format}`;
      if (format === 'json') {
        const jsonBlob = new Blob([JSON.stringify(swaggerData)], { type: 'application/json' });
        saveAs(jsonBlob, filename);
      } else if (format === 'yaml') {
        const yamlString = YAML.dump(swaggerData);
        const yamlBlob = new Blob([yamlString], { type: 'application/x-yaml' });
        saveAs(yamlBlob, filename);
      } else if (format === 'pdf') {
        const pdf = new jsPDF();
        pdf.text(JSON.stringify(swaggerData), 10, 10);
        pdf.save(filename);
      }
    }
  };

const theme = createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    ...(darkMode && {
      background: {
        default: '#37383a',
      },
    }),
  },
});


  const pathnameSegments = location.pathname.split('/').filter(segment => segment !== '');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={darkMode ? 'dark-mode' : ''}>
        <AppBar position="static" sx={{ backgroundColor: '#0c51a1 !important' }}>
          <Toolbar>
            {location.pathname !== '/' && (
              <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
            )}
            <Breadcrumbs>
              {pathnameSegments.map((segment, index) => (
                <Link key={index} href="/" sx={{ color: 'white' }}>
                  {segment}
                </Link>
              ))}
            </Breadcrumbs>
            <Select
              labelId="api-select-label"
              id="api-select"
              value={selectedApi}
              onChange={(e) => setSelectedApi(e.target.value)}
              sx={{ backgroundColor: 'white', marginLeft: 'auto', marginRight: '10px' }}
            >
              {apiList.map(api => (
                <MenuItem key={api} value={api}>
                  {api}
                </MenuItem>
              ))}
            </Select>
            <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <IconButton onClick={handleThemeChange} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
            <Tooltip title="Export">
              <IconButton onClick={() => setExportOptionsOpen(true)} color="inherit">
                <GetAppIcon />
              </IconButton>
            </Tooltip>
            {/* <Typography variant="subtitle1">Total APIs: {totalApisPerApi[selectedApi]}</Typography> */}
          </Toolbar>
        </AppBar>
        <MaintenanceNotification/>
        <Container className="container">{swaggerData && <SwaggerUI spec={swaggerData} />}</Container>
        <Dialog open={exportOptionsOpen} onClose={() => setExportOptionsOpen(false)}>
          <DialogTitle>Select Export Format</DialogTitle>
          <DialogContent>
            <Button onClick={() => exportSwagger('json')} variant="outlined" sx={{ margin: '10px' }}>
              Export as JSON
            </Button>
            <Button onClick={() => exportSwagger('yaml')} variant="outlined" sx={{ margin: '10px' }}>
              Export as YAML
            </Button>
            <Button onClick={() => exportSwagger('pdf')} variant="outlined" sx={{ margin: '10px' }}>
              Export as PDF
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default ApiExplorer;
