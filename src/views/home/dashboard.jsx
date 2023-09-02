import React from 'react';
import { Grid, Card, CardContent, Typography, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import BuildIcon from '@mui/icons-material/Build';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import UpdateIcon from '@mui/icons-material/Update';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import { Link } from 'react-router-dom';
import 'typeface-roboto';
import WelcomeContainer from '../../components/welcomeContainer';
import Footer from '../../components/footer';
import ApiIcon from '@mui/icons-material/Api';

// Tiles data for the dashboard
const tiles = [
  { id: 'API Explorer', name: 'API Explorer', description: 'Explore available APIs', Icon: ApiIcon, color: '#2196F3', link: '/service/APIExplorer' },
  { id: 'support-articles', name: 'Support Articles', description: 'Access articles for development', Icon: BuildIcon, color: '#4CAF50', link: '/service/support' },
  { id: 'submit-request', name: 'Submit Ticket', description: 'Submit and track support tickets', Icon: HelpOutlineIcon, color: '#FFC107', link: 'https://igt-apps.easyvista.com/s/ServiceDesk' },
  { id: 'release-notes', name: 'Release Notes', description: 'View the latest release notes', Icon: UpdateIcon, color: '#E91E63', link: '/service/releasenotes' },
  // { id: 'forms', name: 'Forms', description: 'Submit various request forms', Icon: DescriptionOutlinedIcon, color: '#9C27B0', link: '/service/forms' },
  { id: 'Playground', name: 'Playground', description: 'Test API and features', Icon: AnnouncementOutlinedIcon, color: '#FF5722', link: '/service/status' },
];

// Custom theme for the dashboard
const theme = createTheme({
  palette: {
    background: {
      default: '#e8f7ff',
    },
  },
});

function Dashboard() {
  const navigate = useNavigate();

  // Handle tile click event
  const handleTileClick = (id) => {
    if (id === 'submit-request') {
      const ticketUrl = 'https://igt-apps.easyvista.com/s/ServiceDesk';
      const newTab = window.open(ticketUrl, '_blank');
      newTab.focus();
    }
  };

  return (
    <ThemeProvider theme={theme} sx={{ width: '100%', overflow: 'hidden' }}>
      <CssBaseline />
      <WelcomeContainer />

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '40px',
          flex: '1',
          maxWidth: '960px', // Limit the width to prevent horizontal overflow
          width: '100%',     // Make the Container square
          height: '100%',    // Make the Container square
          marginBottom: '108px'
        }}
      >
        <Grid container spacing={4}>
          {tiles.map((tile) => (
            <Grid item key={tile.id} xs={12} sm={6} md={4}>
              {tile.link.startsWith('/') ? (
                <Link to={tile.link} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: '100%',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                      backgroundColor: tile.color,
                      color: '#fff',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      margin: '0 10px',
                    }}
                  >
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <tile.Icon fontSize="large" />
                      <Typography variant="h5" component="div" align="center" sx={{ marginLeft: '8px' }}>
                        {tile.name}
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography variant="body2" align="center">
                        {tile.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              ) : (
                <a href={tile.link} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: '100%',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                      backgroundColor: tile.color,
                      color: '#fff',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      margin: '0 10px '
                    }}
                  >
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <tile.Icon fontSize="large" />
                      <Typography variant="h5" component="div" align="center" sx={{ marginLeft: '8px' }}>
                        {tile.name}
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography variant="body2" align="center">
                        {tile.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </a>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default Dashboard;
