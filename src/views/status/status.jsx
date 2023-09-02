import React, { useState } from 'react';
import { Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../../components/header';
import Footer from '../../components/footer';
import MaintenanceNotification from "../../components/maintenance"

const StatusPage = () => {
  const [selectedProvider, setSelectedProvider] = useState(null);

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Header />
        <MaintenanceNotification/>
        {/* <Typography variant="h4">Status Page</Typography> */}
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
            style={{ backgroundColor: 'red', color: '#ffffff' }}
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
