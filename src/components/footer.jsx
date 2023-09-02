import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
  Modal,
  TextField,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import IGTLogo from '../assets/IGT.png';
import 'typeface-roboto';

const errorCodes = {
  ERR_SUBMIT_REQUEST: 'An error occurred while submitting the app request.',
  ERR_SEARCH_BAR: 'The search bar cannot find the article.',
  ERR_APP_DOWNLOAD: 'An error occurred during the application download.',
};

function Footer() {
  const [open, setOpen] = useState(false);
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpen = () => {
    setOpen(true);
    setSubmissionMessage('');
    setErrorMessage('');
  };

  const handleClose = () => {
    setOpen(false);
    setSubmissionMessage('');
    setErrorMessage('');
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setErrorMessage('');
      setSubmissionMessage('');

      // Replace the 'powerAutomateUrl' with your actual Power Automate URL
      const powerAutomateUrl =
        'https://prod-98.westus.logic.azure.com/workflows/a86256bf59fc4700830a0c541cd5c5fe/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=E2ewNbLi1pivymA5t_sHTH5h2SjUFEGWvzFYhfTelL0';

      const payload = {
        appName,
        appDescription,
      };

      const response = await fetch(powerAutomateUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload,
        }),
      });

      if (response.ok) {
        setSubmissionMessage('App request submitted successfully');
        setAppName('');
        setAppDescription('');
      } else {
        throw new Error('Failed to submit app request');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred while submitting the app request');
    }
  };

  const body = (
    <Box
      sx={{
        position: 'absolute',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Typography id="modal-title" variant="h6" component="h2">
        Submit New Application
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleFormSubmit}>
        <TextField
          id="app-name"
          label="Application Name"
          fullWidth
          margin="normal"
          value={appName}
          onChange={(event) => setAppName(event.target.value)}
          required
        />
        <TextField
          id="app-description"
          label="Description"
          fullWidth
          margin="normal"
          value={appDescription}
          onChange={(event) => setAppDescription(event.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      {errorMessage && (
        <Typography variant="body1" sx={{ marginTop: '16px', color: 'red' }}>
          {errorMessage}
        </Typography>
      )}
      {submissionMessage && !errorMessage && (
        <Typography variant="body1" sx={{ marginTop: '16px', color: 'green' }}>
          {submissionMessage}
        </Typography>
      )}
    </Box>
  );

  return (
    <AppBar position="static" sx={{ marginTop: '60px', backgroundColor: '#0c51a1', height:'396px' }}>
      <Container>
        <Grid container sx={{ color: 'white', py: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <img
              src={IGTLogo}
              alt="Logo"
              height="60px"
              width="150px"
              style={{ marginTop: '10px', marginRight: '50px' }}
            />
            <Typography variant="body2" style={{ marginTop: '10px', marginRight: '50px' }}>
              r.23.07.10 b36
            </Typography>
            <Typography variant="body2">
              This site was optimized for desktop. © 2023 IGT. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Links</Typography>
            <Link href="https://www.igt.com/explore-igt/about-igt" style={{ color: 'white', textDecoration: 'none' }}>
              About Us
            </Link>
            <br />
            <Link href="https://igt-apps.easyvista.com/s/ServiceDesk" style={{ color: 'white', textDecoration: 'none' }}>
              EasyVista
            </Link>
            <br />
            {/* <Link href="/admin-portal" style={{ color: 'white', textDecoration: 'none' }}>
              Admin Portal
            </Link> */}
          </Grid>
          <Grid item xs={12} sm={6} md={4} textAlign="right">
            <Typography variant="h6">Contact Us</Typography>
            <Typography variant="h5">
              <Link href="tel:+18663131516" style={{ color: 'white', textDecoration: 'none' }}>
                +1 866-313-1516
              </Link>
            </Typography>
            <Typography variant="body2">Technology Operations</Typography>
            <Link href="/email-us" style={{ color: 'white', textDecoration: 'none' }}>
              Email Us
            </Link>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="body1">Request an App</Typography>
              <IconButton color="inherit" onClick={handleOpen}>
                <AddIcon />
              </IconButton>
            </Box>
          </Grid> */}
        </Grid>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="submit-new-application"
      >
        {body}
      </Modal>
    </AppBar>
  );
}

export default Footer;
