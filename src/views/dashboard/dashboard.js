// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CssBaseline,
  Avatar
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ApiIcon from '@mui/icons-material/Api';
import BuildIcon from '@mui/icons-material/Build';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import UpdateIcon from '@mui/icons-material/Update';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import WelcomeContainer from '../../components/welcomeContainer';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../DarkModeContext';
import MaintenanceNotification from '../../components/maintenance';
import { myMSALObj, getTokenPopup } from "../../services/sso/authPopup";
import { loginRequest } from "../../services/sso/authConfig";

 

// Define tiles for dashboard
const tiles = [
  { id: 'API Explorer', name: 'API Explorer', description: 'Discover, learn, and test the various APIs available to accelerate your development process. The API Explorer offers an interactive interface for our API endpoints.', Icon: ApiIcon, link: '/service/api-explorer' },
  { id: 'support-articles', name: 'Support Articles', description: 'Find comprehensive articles, how-to guides, and best practices that will help you overcome development challenges and make the most out of th  platform.', Icon: BuildIcon, link: '/service/support-articles' },
  { id: 'submit-request', name: 'Submit Request', description: 'Reach out to our dedicated support team for comprehensive assistance tailored to your specific needs.', Icon: HelpOutlineIcon, link: '' },
  { id: 'release-notes', name: 'Release Notes', description: 'Stay up-to-date with the latest enhancements, fixes, and features by accessing our comprehensive release notes\.', Icon: UpdateIcon, link: '/service/release-notes' },
  { id: 'Playground', name: 'Playground', description: 'A sandbox environment where you can experiment with our APIs and features without any commitments. Ideal for learning and pre-production testing.', Icon: EngineeringIcon, link: '/service/playground' },

];

// Define tiles for dashboard
const Dashboard = ({ profilePicture }) => {
  // Define tiles for dashboard
  const { darkMode, setDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState("");
  const [profilePhotoData, setProfilePhotoData] = useState(null);

  // Define tiles for dashboard
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
    }
  }, []);

  // Save dark mode settings to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Theme settings based on dark mode
  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#3c3c3d" : "#fff",
      },
    },
  });

  // Function to fetch the user's profile photo using an access token from SSO login
  async function fetchProfilePhoto(accessToken) {
    try {
      const graphResponse = await fetch(
        "https://graph.microsoft.com/v1.0/me/photo/$value",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (graphResponse.ok) {
        const photoData = await graphResponse.arrayBuffer();
        return photoData;
      } else {
        console.error(
          "Failed to fetch profile photo:",
          graphResponse.statusText
        );
        return null;
      }
    } catch (error) {
      console.error("Error fetching profile photo:", error);
      return null;
    }
  }

  // Fetch and set the user's profile photo when the component mounts
  useEffect(() => {
    if (myMSALObj.getAccount()) {
      getTokenPopup(loginRequest)
        .then((response) => {
          if (response) {
            fetchProfilePhoto(response.accessToken)
              .then((photoData) => {
                setProfilePhotoData(photoData);
              })
              .catch((error) => {
                console.error("Error fetching profile photo:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
        });
    }
  }, []);

  return (
    // Wrap the component with ThemeProvider to apply custom theme
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: "#0c51a1" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Box
              component="span"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {/* <img
                src={Logo}
                style={{ height: "60px", width: "60px" }}
                alt="logo"
              /> */}
             Developer Center
            </Box>
          </Typography>
          <Tooltip
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          <Avatar
            alt="Avatar"
            src={
              profilePhotoData
                ? URL.createObjectURL(new Blob([profilePhotoData]))
                : profilePicture
            }
            sx={{ width: "40px", height: "40px" }}
          />
        </Toolbar>
      </AppBar>
      {/* <MaintenanceNotification /> */}
      <WelcomeContainer />
      <Container
        maxWidth="xxl"
        style={{ marginTop: "-30px", marginBottom: "60px" }}
      >
        <Grid container spacing={4} style={{ marginTop: "20px" }}>
          {tiles
            .filter((tile) =>
              tile.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((tile) => (
              <Grid item key={tile.id} xs={12} md={4}>
                {tile.link.startsWith("/") ? (
                  <Link to={tile.link} style={{ textDecoration: "none" }}>
                    <Card
                      style={{
                        height: "250px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        border: "1px solid #ccc",
                        backgroundColor: darkMode ? "#2F3033" : "#f9f9f9",
                      }}
                      elevation={0}
                    >
                      <CardContent style={{ marginTop: "50px" }}>
                        <tile.Icon style={{ fontSize: 50, color: "#ff671f" }} />
                        <Typography
                          variant="h4"
                          gutterBottom
                          style={{ color: darkMode ? "#fff" : "#000" }}
                        >
                          {tile.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ color: darkMode ? "#fff" : "#000" }}
                        >
                          {tile.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <a href={tile.link} style={{ textDecoration: "none" }}>
                    <Card
                      style={{
                        height: "250px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        border: "1px solid #ccc",
                        backgroundColor: darkMode ? "#2F3033" : "#f9f9f9",
                        color: darkMode ? "#fff" : "#000",
                      }}
                      elevation={0}
                    >
                      <CardContent style={{ marginTop: "50px" }}>
                        <tile.Icon style={{ fontSize: 50, color: "#ff671f" }} />
                        <Typography
                          variant="h4"
                          gutterBottom
                          style={{ color: darkMode ? "#fff" : "#000" }}
                        >
                          {tile.name}
                        </Typography>
                        <Typography variant="body1">
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
    </ThemeProvider>
  );
};

export default Dashboard;
