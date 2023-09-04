import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CssBaseline,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ApiIcon from '@mui/icons-material/Api';
import BuildIcon from '@mui/icons-material/Build';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import UpdateIcon from '@mui/icons-material/Update';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import WelcomeContainer from '../../components/welcomeContainer';
import { Link } from 'react-router-dom';
import IGTSphere from '../../assets/IGTSphere.png';
import { useDarkMode } from '../../DarkModeContext';

const tiles = [
  { id: 'API Explorer', name: 'API Explorer', description: 'Explore available APIs', Icon: ApiIcon, link: '/service/APIExplorer' },
  { id: 'support-articles', name: 'Support Articles', description: 'Access articles for development', Icon: BuildIcon, link: '/service/support' },
  { id: 'submit-request', name: 'Submit Request', description: 'Submit and track support tickets', Icon: HelpOutlineIcon, link: 'https://igt-apps.easyvista.com/s/ServiceDesk' },
  { id: 'release-notes', name: 'Release Notes', description: 'View the latest release notes', Icon: UpdateIcon, link: '/service/releasenotes' },
  { id: 'Status', name: 'Status', description: 'Server Status', Icon: AnnouncementOutlinedIcon, link: '/service/status' },
  { id: 'Playground', name: 'Playground', description: 'Test API and features', Icon: AnnouncementOutlinedIcon, link: '/service/status' },
];

const Dashboard = () => {
  const { darkMode, setDarkMode } = useDarkMode();  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#37383a' : '#fff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#0c51a1' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={IGTSphere} style={{ height: '40px', width: '40px' }} alt="GNIECloud logo" />
              GNIECloud Developer Center
            </Box>
          </Typography>
          <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <WelcomeContainer />
      <Container maxWidth="xxl" style={{ marginTop: '-30px', marginBottom: '60px' }}>
        <Grid container spacing={4} style={{ marginTop: '20px' }}>
          {tiles
            .filter((tile) => tile.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((tile) => (
              <Grid item key={tile.id} xs={12} md={4}>
                {tile.link.startsWith('/') ? (
                  <Link to={tile.link} style={{ textDecoration: 'none' }}>
                    <Card
                      style={{
                        height: '300px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: '1px solid #ccc',
                        backgroundColor: '#f9f9f9',
                      }}
                      elevation={0}
                    >
                      <CardContent style={{ marginTop: '50px' }}>
                        <tile.Icon style={{ fontSize: 50, color: '#0c51a1' }} />
                        <Typography variant="h4" gutterBottom style={{ fontWeight: '600' }}>
                          {tile.name}
                        </Typography>
                        <Typography variant="body1">
                          {tile.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <a href={tile.link} style={{ textDecoration: 'none' }}>
                    <Card
                      style={{
                        height: '300px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: '1px solid #ccc',
                        backgroundColor: '#f9f9f9',
                      }}
                      elevation={0}
                    >
                      <CardContent style={{ marginTop: '50px' }}>
                        <tile.Icon style={{ fontSize: 50, color: '#0c51a1' }} />
                        <Typography variant="h4" gutterBottom style={{ fontWeight: '600' }}>
                          {tile.name}
                        </Typography>
                        <Typography variant="body1">
                          {tile.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </a>
                )}
              </Grid>
            ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
