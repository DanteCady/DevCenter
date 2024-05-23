import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  Container,
  Paper,
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Select,
  MenuItem,
  Tooltip,
  createTheme,
  ThemeProvider,
  Typography,
  Button,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DownloadIcon from "@mui/icons-material/Download";
import { useDarkMode } from "../../DarkModeContext";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import ServiceSidebar from "../../components/releaseNotes/serviceSidebar";
const ReleaseNotes = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [selectedVersion, setSelectedVersion] = useState("1.0");
  const [selectedService, setSelectedService] = useState("all");
  const [markdownContent, setMarkdownContent] = useState("");
  const contentRef = React.useRef(null);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const [services, setServices] = useState({
    all: false,
    files: false,
    forms: false,
    knowledgebase: false,
    maps: false,
  });

  const handleServiceChange = (event) => {
    const { name, checked } = event.target;

    // If the "All" checkbox is selected, all other checkboxes should match its state
    if (name === "all") {
      setServices((prevServices) => ({
        all: checked,
        files: checked,
        forms: checked,
        knowledgebase: checked,
        maps: checked,
      }));
    } else {
      setServices((prevServices) => ({
        ...prevServices,
        [name]: checked,
        all: false, // If any individual service is unchecked, "All" should be unchecked
      }));
    }
  };


  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/release-notes?version=${selectedVersion}`)
      .then((response) => {
        setMarkdownContent(response.data.markdown || "");
      })
      .catch((error) => {
        console.error("Failed to fetch markdown:", error);
      });
  }, [selectedVersion]);

  const handleThemeChange = () => setDarkMode(!darkMode);

  const generatePDF = () => {
    const opt = {
      margin: 10,
      filename: `ReleaseNotes-${selectedVersion}.pdf`,
      html2canvas: { scale: 4 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    const content = contentRef.current;
    html2pdf().from(content).set(opt).save();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: "#0c51a1" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Release Notes
          </Typography>
          <Tooltip title="Download PDF">
            <IconButton color="inherit" onClick={generatePDF}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <IconButton onClick={handleThemeChange} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          <Select
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
          >
            <MenuItem value="1.0">Version 1.0</MenuItem>
            <MenuItem value="2.0">Version 2.0</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
      <Box display="flex" sx={{ height: "100vh" }}>
        {/* Service Sidebar Section */}
        <ServiceSidebar
          selectedService={selectedVersion}
          onSelectService={setSelectedVersion}
        />

        <Container>
          <Grid container spacing={3}>
            {/* Release Notes Section */}
            <Grid item xs={12} md={6}>
              <Box p={3} mt={3} ref={contentRef}>
                <Paper elevation={3}>
                  <Box p={3}>
                    <Typography variant="h4" gutterBottom>
                      Latest Updates
                    </Typography>
                    <ReactMarkdown className="no-shadow">{markdownContent}</ReactMarkdown>
                  </Box>
                </Paper>
              </Box>
            </Grid>

            {/* Subscribe Section */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3}>
                <Box p={3} sx={{ mt: "5px" }}>
                  <Typography variant="h6" gutterBottom>
                    Subscribe to Release Notes
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="body1" gutterBottom>
                      Select services:
                    </Typography>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={services.all}
                            onChange={handleServiceChange}
                            name="all"
                          />
                        }
                        label="All"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={services.files}
                            onChange={handleServiceChange}
                            name="files"
                          />
                        }
                        label=" Files"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={services.forms}
                            onChange={handleServiceChange}
                            name="forms"
                          />
                        }
                        label=" Forms"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={services.knowledgebase}
                            onChange={handleServiceChange}
                            name="knowledgebase"
                          />
                        }
                        label=" Knowledgebase"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={services.maps}
                            onChange={handleServiceChange}
                            name="maps"
                          />
                        }
                        label=" Maps"
                      />
                    </FormGroup>
                  </Box>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    sx={{ height: "15px", mb: "45px" }}
                  />
                  <Box mt={2}>
                    <Button variant="contained" color="primary" fullWidth>
                      Subscribe
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default ReleaseNotes;