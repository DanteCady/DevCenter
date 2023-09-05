import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import {
  Container, Paper, Typography, Box, Divider, CssBaseline, AppBar, Toolbar, IconButton,
  Accordion, AccordionSummary, AccordionDetails, Select, MenuItem, Tooltip, createTheme,
  ThemeProvider, Breadcrumbs, Link
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import BuildIcon from '@mui/icons-material/Build';
import BugReportIcon from '@mui/icons-material/BugReport';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useDarkMode } from '../../DarkModeContext';
import { useLocation, useNavigate } from 'react-router-dom';


const ReleaseNotes = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [markdownContent, setMarkdownContent] = useState('');
  const [selectedVersion, setSelectedVersion] = useState('1.0');
  const [sections, setSections] = useState({});
  const [feedback, setFeedback] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/release-notes?version=${selectedVersion}`)
      .then((res) => {
        const markdown = res.data.markdown;
        setMarkdownContent(markdown);

        const splitByNewLine = markdown.split('\n');
        let currentCategory = '';
        const parsedSections = {};

        splitByNewLine.forEach((line) => {
          if (line.includes('🆕')) {
            currentCategory = 'New Features';
            parsedSections[currentCategory] = '';
          } else if (line.includes('🔧')) {
            currentCategory = 'Enhancements';
            parsedSections[currentCategory] = '';
          } else if (line.includes('🐛')) {
            currentCategory = 'Bug Fixes';
            parsedSections[currentCategory] = '';
          }

          if (currentCategory) {
            parsedSections[currentCategory] += line + '\n';
          }
        });

        setSections(parsedSections);
      })
      .catch((err) => {
        console.error("Failed to fetch release notes:", err);
      });
  }, [selectedVersion]);

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
          <Select
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
          >
            <MenuItem value="1.0">Version 1.0</MenuItem>
            <MenuItem value="2.0">Version 2.0</MenuItem>
          </Select>
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
            <Select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
            >
              <MenuItem value="1.0">Version 1.0</MenuItem>
              <MenuItem value="2.0">Version 2.0</MenuItem>
            </Select>

            {Object.keys(sections).map((key, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography variant="h6">{key}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ReactMarkdown>
                    {sections[key]}
                  </ReactMarkdown>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Paper>
      </Box>
      </Container>
      </ThemeProvider>
  );
};

export default ReleaseNotes;
