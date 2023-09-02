import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Toolbar, Typography, AppBar, Breadcrumbs, Link } from '@mui/material';
import 'typeface-roboto';

function Header({ title }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const pathnameSegments = location.pathname.split('/').filter((segment) => segment !== '');

  return (
    <AppBar position="static" sx={{marginBottom: '15px'}}>
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
      </Toolbar>
    </AppBar>
  );
}

export default Header;
