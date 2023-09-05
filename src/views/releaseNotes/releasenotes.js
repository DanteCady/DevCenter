import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Breadcrumbs,
  Link,
  ThemeProvider,
  Tooltip,
  createTheme} from '@mui/material';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import BuildIcon from '@mui/icons-material/Build';
import BugReportIcon from '@mui/icons-material/BugReport';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useDarkMode } from '../../DarkModeContext';
import { useLocation, useNavigate } from 'react-router-dom';
import MaintenanceNotification from '../../components/maintenance';

const renderers = {
  heading: ({ level, children }) => {
    const text = children[0]?.props?.children;
    if (text.includes("🆕")) {
      return (
        <Typography variant={`h${level}`} style={{ color: '#4caf50' }}>
          <NewReleasesIcon /> {text.replace("🆕", "")}
        </Typography>
      );
    }
    if (text.includes("🔧")) {
      return (
        <Typography variant={`h${level}`} style={{ color: '#2196f3' }}>
          <BuildIcon /> {text.replace("🔧", "")}
        </Typography>
      );
    }
    if (text.includes("🐛")) {
      return (
        <Typography variant={`h${level}`} style={{ color: '#f44336' }}>
          <BugReportIcon /> {text.replace("🐛", "")}
        </Typography>
      );
    }
    return <Typography variant={`h${level}`}>{text}</Typography>;
  },
};

const ReleaseNotes = () => {
  const { darkMode, setDarkMode } = useDarkMode(); 
  const [markdownContent, setMarkdownContent] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the Markdown file from the Express server
    axios.get('http://localhost:3001/api/release-notes')
      .then((res) => {
        setMarkdownContent(res.data.markdown);
      })
      .catch((err) => {
        console.error("Failed to fetch release notes:", err);
      });
  }, []);

 const handleThemeChange = () => {
    setDarkMode(!darkMode);
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
       <AppBar position="static" sx={{ backgroundColor: darkMode ? '#37383a' : '#0c51a1' }}>
  <Toolbar>
    {location.pathname !== '/' && (
      <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
    )}
    <Breadcrumbs sx={{ flexGrow: 1 }}>
      {pathnameSegments.map((segment, index) => (
        <Link key={index} href="/" sx={{ color: 'white' }}>
          {segment}
        </Link>
      ))}
    </Breadcrumbs>
    <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <IconButton onClick={handleThemeChange} color="inherit">
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  </Toolbar>
</AppBar>

      <Container>
        <Box p={3} mt={3}>
          <Paper elevation={3}>
            <Box p={3}>
              <Typography variant="h4" gutterBottom>
                Latest Updates
              </Typography>
              <Divider />
              {/* Render the markdown content */}
              <ReactMarkdown components={renderers}>
                {markdownContent}
              </ReactMarkdown>
            </Box>
          </Paper>
        </Box>
      </Container>
     </div>
    </ThemeProvider>
  );
};

export default ReleaseNotes;
