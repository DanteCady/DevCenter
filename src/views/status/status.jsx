import React, { useState, useEffect } from 'react';
import { Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../../components/header';
import Footer from '../../components/footer';
import MaintenanceNotification from "../../components/maintenance"
import { useDarkMode } from '../../DarkModeContext';

const StatusPage = () => {
  const { darkMode, setDarkMode } = useDarkMode();  
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
  };

  const handleClose = () => {
    setSelectedProvider(null);
  };

  const renderStatusPage = () => {
    switch (selectedProvider) {
      case 'azure':
        return (
          <>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <iframe src="https://status.azure.com/en-us/status" title="Azure Status" width="100%" height="600px" />
          </>
        );
      case 'genesys':
        return (
          <>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <iframe src="https://status.mypurecloud.com" title="Genesys Cloud Status" width="100%" height="600px" />
          </>
        );
      default:
        return null;
    }
  };

  // Conditional styles based on dark mode
  const darkModeStyles = {
    backgroundColor: darkMode ? '#3c3c3d' : '#fff',
    color: darkMode ? '#ffffff' : '#000000'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', ...darkModeStyles }}>
      <div style={{ flex: 1 }}>
        <Header />
        <MaintenanceNotification/>
        <div>
          <Button
            variant="contained"
            onClick={() => handleProviderClick('azure')}
          >
            Azure
          </Button>
          <Button
            variant="contained"
            onClick={() => handleProviderClick('genesys')}
            style={{ backgroundColor: darkMode ? '#555555' : 'red', color: darkMode ? '#ffffff' : '#ffffff' }}
          >
            Genesys Cloud
          </Button>
        </div>
        {renderStatusPage()}
      </div>
      <Footer />
    </div>
  );
};

export default StatusPage;
