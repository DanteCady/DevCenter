import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import {
  Container, Paper, Box, CssBaseline, AppBar, Toolbar, IconButton,
  Select, MenuItem, Tooltip, createTheme, ThemeProvider, Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import DownloadIcon from '@mui/icons-material/Download';
import { useDarkMode } from '../../DarkModeContext';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const ReleaseNotes = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [selectedVersion, setSelectedVersion] = useState('1.0');
  const [markdownContent, setMarkdownContent] = useState('');
  const contentRef = React.useRef(null);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/api/release-notes?version=${selectedVersion}`)
      .then((response) => {
        setMarkdownContent(response.data.markdown || '');
      })
      .catch((error) => {
        console.error('Failed to fetch markdown:', error);
      });
  }, [selectedVersion]);

  const handleThemeChange = () => setDarkMode(!darkMode);

  const generatePDF = () => {
    const opt = {
      margin: 10,
      filename: `ReleaseNotes-${selectedVersion}.pdf`,
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    const content = contentRef.current;
    html2pdf().from(content).set(opt).save();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Release Notes
          </Typography>
          <Tooltip title="Download PDF">
            <IconButton color="inherit" onClick={generatePDF}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <IconButton onClick={handleThemeChange} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          <Select value={selectedVersion} onChange={(e) => setSelectedVersion(e.target.value)}>
            <MenuItem value="1.0">Version 1.0</MenuItem>
            <MenuItem value="2.0">Version 2.0</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
      <Container>
        <Box p={3} mt={3} ref={contentRef}>
          <Paper elevation={3}>
            <Box p={3}>
              <Typography variant="h4" gutterBottom>
                Latest Updates
              </Typography>
              <ReactMarkdown>
                {markdownContent}
              </ReactMarkdown>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ReleaseNotes;
