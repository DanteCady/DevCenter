import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  TextField,
  Typography,
  IconButton,
  Popover,
  Grid,
  Button
} from '@mui/material';
import background from "../assets/background.jpg";
import AppsIcon from '@mui/icons-material/Apps';
import { Map, Person, Description, Home as HomeIcon } from '@mui/icons-material';
import axios from 'axios';
import MaintenanceNotification from './maintenance';
import IGTSphere from '../assets/IGTSphere.png'

const appIcons = [
  { icon: <Map sx={{ color: '#4CAF50' }} />, name: 'Maps', link: 'https://maps.gniecloud.com' },
  { icon: <Person sx={{ color: '#FFC107' }} />, name: 'KB', link: 'https://kb.gniecloud.com' },
  { icon: <Description sx={{ color: '#9C27B0' }} />, name: 'Forms', link: '/service/forms' },
  { icon: <HomeIcon sx={{ color: '#0c51a1' }} />, name: 'Home', link: 'https://gniecloud.com' },
];

function WelcomeContainer() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isMaintenanceEnabled, setIsMaintenanceEnabled] = useState(false);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle app menu click
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle app menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle form submission
  const handleFormSubmit = () => {
    const formData = {
      enabled: true,
      date: date,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
    };

    axios
      .post('https://api.gniecloud.com/api/maintenance/banner', formData, {
        headers: {
          'Cache-Control': 'no-cache' // Disable caching for this API request
        }
      })
      .then((response) => {
        setIsFormSubmitted(true);
        setIsMaintenanceEnabled(true);
        setShowForm(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle maintenance disable
  const handleDisableMaintenance = () => {
    const formData = {
      enabled: false,
      date: date,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
    };

    axios
      .post('https://api.gniecloud.com/api/maintenance/banner', formData, {
        headers: {
          'Cache-Control': 'no-cache' // Disable caching for this API request
        }
      })
      .then((response) => {
        setIsFormSubmitted(false);
        setIsMaintenanceEnabled(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle date change
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Handle end date change
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // Handle start time change
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  // Handle end time change
  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  // Handle cancel button click
  const handleCancel = () => {
    setShowForm(false);
  };

  // Fetch initial maintenance status on component mount
  useEffect(() => {
    axios
      .get('https://api.gniecloud.com/api/maintenance/banner/details', {
        headers: {
          'Cache-Control': 'no-cache' // Disable caching for this API request
        }
      })
      .then((response) => {
        const { enabled } = response.data;

        if (enabled) {
          setIsFormSubmitted(true);
          setIsMaintenanceEnabled(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'apps-menu' : undefined;

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '325px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: '-16px',
        marginRight: '-16px',
        position: 'relative',
      }}
    >
      <Container maxWidth="xl" sx={{ textAlign: 'center' }}>
        <MaintenanceNotification />
        <Typography variant="h4" component="h1" sx={{ color: '#0c51a1', marginBottom: '20px' }}>
          GNIECloud Development Center
          {/* <img src={IGTSphere} sx={{m: '15px'}} /> */}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            id="search-bar"
            label="Search APIs, Documents, MISC"
            variant="filled"
            size="small"
            InputProps={{
              sx: {
                backgroundColor: 'white',
                color: 'black',
                width: '800px',
                '&:hover': {
                  backgroundColor: 'white',
                },
              },
            }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
      </Container>
      <IconButton
        onClick={handleClick}
        sx={{
          position: 'absolute',
          top: '20px',
          right: '40px',
          backgroundImage: 'linear-gradient(to right, #FF5F6D, #FFC371)',
          borderRadius: '50%',
          padding: '10px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.25)',
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        <AppsIcon sx={{ fontSize: 'xx-large', color: 'white' }} />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            p: 2,
            width: '200px',
            maxHeight: '400px',
            overflowY: 'scroll',
            scrollbarWidth: 'thin',
            scrollbarColor: '#FF5722 #FF9800',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#FF5722',
              borderRadius: '4px',
            },
          },
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={1} alignItems="center">
            {appIcons.sort((a, b) => a.name.localeCompare(b.name)).map((app) => (
              <Grid item key={app.name} xs={6}>
                <Button
                  variant="text"
                  size="large"
                  color="inherit"
                  href={app.link}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    },
                  }}
                >
                  {app.icon}
                  <Typography variant="body2" align="center">
                    {app.name}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Popover>
    </Box>
  );
}

export default WelcomeContainer;
