// Import necessary dependencies
import React, { useState } from "react";
import { Box, Container, TextField, Typography, Grid } from "@mui/material";
import { useDarkMode } from "../DarkModeContext";

// WelcomeContainer component definition
const WelcomeContainer = () => {
  // Use dark mode context
  const { darkMode } = useDarkMode();

  // Local state for search term
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    // Main Container
    <Container maxWidth="xxl">
      {/* Main Box Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Horizontal layout
          alignItems: "center", // Vertically center content
          justifyContent: "space-between", // Add space between logo and text
          height: "400px",
          width: "100%",
          marginTop: "25px",
          marginBottom: "2rem",
          padding: "1rem",
          borderRadius: "5px",
          backgroundColor: "#0c51a1",
        }}
      >
        <Box
          sx={{
            marginRight: "20px", 
          }}
        >
          {/* <img
            src={Logo}
            style={{ height: "200px", width: "200px" }}
            alt=" logo"
          /> */}
        </Box>

        {/* Content Grid */}
        <Grid container spacing={2} alignItems="center">
          {/* Heading */}
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom sx={{ color: "#fff" }}>
              Expand with platform
            </Typography>
          </Grid>
          {/* Subtitle */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" paragraph sx={{ color: "#fff" }}>
              Find APIs, documentation, and more on the platform.
            </Typography>
          </Grid>
          {/* Search Input */}
          <Grid item xs={12}>
            <TextField
              variant="filled"
              placeholder="Search APIs, Documentation..."
              InputProps={{
                sx: {
                  backgroundColor: darkMode ? "#2F3033" : "#f3f3f3",
                  color: darkMode ? "white" : "black",
                  borderRadius: "5px",
                },
              }}
              value={searchTerm}
              onChange={handleSearchChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WelcomeContainer;
