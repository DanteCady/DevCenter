import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function MaintenanceNotification() {
  // State variables to track the notification visibility and maintenance details
  const [showNotification, setShowNotification] = useState(false);
  const [maintenanceDetails, setMaintenanceDetails] = useState(null);

  useEffect(() => {
    // Fetch the maintenance details from the API when the component mounts
    axios.get('https://api/api/maintenance/banner/details', {
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
      .then(response => {
        const { enabled, maintenanceDetails } = response.data;
        if (enabled) {
          // Convert 24-hour format time to 12-hour format with AM/PM
          const formatTime24To12 = (time24) => {
            const [hours24, minutes] = time24.split(':');
            const hours = ((hours24 + 11) % 12) + 1;
            const amPm = hours24 >= 12 ? 'PM' : 'AM';
            return `${hours}:${minutes} ${amPm}`;
          };

          setMaintenanceDetails({
            date: maintenanceDetails.date,
            startTime: formatTime24To12(maintenanceDetails.startTime),
            endTime: formatTime24To12(maintenanceDetails.endTime),
            endDate: maintenanceDetails.endDate,
          });
          setShowNotification(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Event handler for closing the maintenance notification
  const handleClose = () => {
    setShowNotification(false);
  };

  return (
    <Box sx={{ mb: 2 }}>
      {showNotification && maintenanceDetails && (
        <Alert severity="warning" sx={{ borderRadius: '4px', display: 'flex', alignItems: 'center', position: 'relative' }}>
          <Typography variant="body1" sx={{ flex: 1 }}>
            {`Maintenance Notice: Our self-service portal will be undergoing scheduled maintenance on ${maintenanceDetails.date} from ${maintenanceDetails.startTime} to ${maintenanceDetails.endTime}. During this period, access to certain features may be limited. We apologize for any inconvenience caused.`}
          </Typography>
          <IconButton color="inherit" size="small" onClick={handleClose} sx={{ position: 'absolute', top: '2px', right: '1px' }}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Alert>
      )}
    </Box>
  );
}

export default MaintenanceNotification;
