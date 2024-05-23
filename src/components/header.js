// Import required dependencies
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton, Toolbar, Tooltip,  Typography, AppBar, Breadcrumbs, Link } from '@mui/material';
import 'typeface-roboto';
import { useDarkMode } from '../DarkModeContext';

// Header component
function Header({ title }) {
  // Utilize dark mode from context
  const { darkMode, setDarkMode } = useDarkMode();

  // React Router's useLocation and useNavigate hooks
  const location = useLocation();
  const navigate = useNavigate();

  // React Router's useLocation and useNavigate hooks
  const handleBack = () => {
    navigate(-1);
  };

   // Extract segments from the current pathname for breadcrumbs
  const pathnameSegments = location.pathname.split('/').filter((segment) => segment !== '');

  return (
    <>

      <AppBar position="static" sx={{marginBottom: '15px', backgroundColor: '#0c51a1'}}>
        <Toolbar>
          {location.pathname !== '/' && (
            <IconButton edge="start" color="inherit" onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Breadcrumbs>
            {pathnameSegments.map((segment, index) => (
              <Link key={index} href="/" sx={{ color: 'white' }}>
                {segment}
              </Link>
            ))}
          </Breadcrumbs>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            {title}
          </Typography>
          <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <IconButton 
              onClick={() => setDarkMode(!darkMode)} 
              color="inherit"
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
