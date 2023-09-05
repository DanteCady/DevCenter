import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Paper, Typography, Box } from '@mui/material';

const ReleaseNotes = () => {
  const [markdownContent, setMarkdownContent] = useState('');

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

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Release Notes
      </Typography>
      <Paper elevation={3}>
        <Box p={3}>
          {/* Render the markdown content */}
          <ReactMarkdown>
            {markdownContent}
          </ReactMarkdown>
        </Box>
      </Paper>
    </Box>
  );
};

export default ReleaseNotes;
