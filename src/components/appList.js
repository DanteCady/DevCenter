import React from 'react';
import { Grid, Container, Card, CardContent, CardActions, Button, Typography } from '@mui/material';

//Icons
import LockIcon from '@mui/icons-material/Lock';
import BuildIcon from '@mui/icons-material/Build';
import InfoIcon from '@mui/icons-material/Info';
import GenesysCloudIcon from '../assets/svg/gcSVG';
import ivantiIcon from '../assets/svg/ivantiSVG';
import WindowsIcon from '../assets/svg/windowsSVG';
import SourceIcon from '@mui/icons-material/Source';
import ClearIcon from '@mui/icons-material/Clear';

const apps = [
  { service: 1, name: 'Account Lock Status', description: 'Check account lock status', Icon: LockIcon, color: '#F6A90A', fileName: 'AccountStatus.exe' },
  { service: 2, name: 'Cisco Removal Tool', description: 'Tool for removing Cisco software', Icon: BuildIcon, color: '#02A8F3', fileName: 'ciscoRemoval.exe' },
  { service: 3, name: 'Clear Credentials Manager', description: 'Clears stored credentials', Icon: ClearIcon, color: '#3CB371', fileName: 'ClearCredentialManager.exe' },
  { service: 4, name: 'Genesys Cloud', description: 'Cloud solution for customer experience', Icon: GenesysCloudIcon, color: '#FFC107', fileName: 'genesyscloud.exe' },
  { service: 5, name: 'ES/Aurora host file update', description: 'Update host files for ES/Aurora', Icon: SourceIcon, color: '#8A2BE2', fileName: 'Host_File.exe' },
  { service: 6, name: 'Ivanti VPN', description: 'VPN for secure remote access', Icon: ivantiIcon, color: '#FF8A50', fileName: 'Pulse Secure_Ivanti_22.2 1.msi' },
  { service: 7, name: 'System Info', description: 'Retrieve system info', Icon: InfoIcon, color: '#1E90FF', fileName: 'ComputerInformation.exe' },
  { service: 8, name: 'Windows 10 update', description: 'Update your system to Windows 10', Icon: WindowsIcon, color: '#96D1FF', fileName: 'Windows10Update.exe' },
];

function AppsList() {
const handleAppDownload = (event, fileName, appIndex) => {
  event.preventDefault();

  // console.log('Storage Account:', process.env.REACT_APP_STORAGE_ACCOUNT);
  // console.log('Container Name:', process.env.REACT_APP_CONTAINER_NAME);

  // Construct the SAS token key based on the app index or identifier
  const sasTokenKey = `REACT_APP_SAS_TOKEN_APP_${appIndex}`;

  // Retrieve the SAS token from the environment variables
  const sasToken = process.env[sasTokenKey];

  if (!sasToken) {
    console.error('SAS token not found for the app index:', appIndex);
    return;
  }

  // Construct the SAS token URL
  const sasTokenUrl = `${sasToken}`;

  console.log('SAS Token URL:', sasTokenUrl);

  // Initiate the file download
  window.open(sasTokenUrl, '_blank');
};


  const SelfServiceTile = ({ name, description, Icon, fileName, color, appIndex }) => {
    let tileColor = '';
    let textColor = '';

    if (name === 'Genesys Cloud') {
      tileColor = '#FFF';
      textColor = '#000';
    } else {
      tileColor = color;
      textColor = '#FFF';
    }

    return (
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0px 3px 5px 2px rgba(0,0,0,0.3)',
          '&:hover': { boxShadow: '0px 5px 10px 2px rgba(0,0,0,0.5)' },
          height: '100%',
          backgroundColor: tileColor,
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '16px',
          }}
        >
          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Icon sx={{ fontSize: 48, color: textColor }} />
          </div>
          <Typography gutterBottom variant="h5" component="div" align="center" sx={{ color: textColor }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ color: textColor }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
         <Button size="small" color="primary" onClick={(event) => handleAppDownload(event, fileName, appIndex)}  sx={{ color: 'black' }}>
            Download
          </Button>

        </CardActions>
      </Card>
    );
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {apps.map((app, appIndex) => ( // Add appIndex as the second parameter in the map callback
          <Grid item key={app.service} xs={12} sm={6} md={4}>
            <SelfServiceTile
              name={app.name}
              description={app.description}
              Icon={app.Icon}
              fileName={app.fileName}
              color={app.color}
              appIndex={appIndex} // Pass appIndex as a prop to SelfServiceTile
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AppsList;
