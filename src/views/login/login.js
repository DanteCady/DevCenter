import React, { useState } from "react";
import { Typography, Box, Container, Grid, Button } from "@mui/material";
import {
  Build,
  Explore,
  Web,
  Security,
  Speed,
} from "@mui/icons-material";
import CodeIcon from "@mui/icons-material/Code";
import LogInModal from "../../components/auth/loginModal";
import { myMSALObj } from "../../services/sso/authConfig";
import { signIn } from "../../services/sso/authPopup";

const Login = ({ msalInstance }) => {
        console.log("MSAL Instance:", msalInstance);
  const [modalOpen, setModalOpen] = useState(false);

//   const handleSignInClick = () => {
//     setModalOpen(true);
//   };

const handleSSO = async () => {
  try {
    // Call the signIn function from authPopup.js
    await signIn();

    // Check if a user is authenticated using myMSALObj
    if (myMSALObj.getAccount()) {
      console.log("User is authenticated:", myMSALObj.getAccount());
      window.location.href = "/dashboard";
    }
  } catch (error) {
    console.error("Error during SSO login:", error);
  }
};
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundImage:
          "linear-gradient(-45deg, rgba(12, 81, 161, 0.8), rgba(255, 103, 31, 0.8), rgba(12, 81, 161, 0.8), rgba(255, 103, 31, 0.8))",
        backgroundSize: "400% 400%",
        animation: "gradient 20s ease infinite",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <Container
        sx={{
          position: "relative",
          zIndex: 1,
          p: 2,
          borderRadius: "10px",
          width: "900px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{ height: "150px", marginRight: "10px", marginBottom: "45px" }}
        />
        <div style={{ marginTop: "20px" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "#0c51a1",
              display: "inline",
              marginRight: "15px",
              marginBottom: "10px",
            }}
          >
            
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", color: "#ff571f", display: "inline" }}
          >
            Developer
          </Typography>
          <br /> {/* Add line break */}
          <Typography
            sx={{
              fontSize: "15px",
              mt: "15px",
              mr: "115px",
              color: "white",
            }}
          >
            <Button
            sx={{color:"white"}}
            onClick={handleSSO}
            >Sign In</Button>
            {/* {" | "}
            <a href="/#" style={{ textDecoration: "none", color: "white" }}>
              Request Account
            </a> */}
          </Typography>
        </div>

        <LogInModal open={modalOpen} onClose={handleCloseModal} />
      </Container>

      <Container
        sx={{
          position: "relative",
          zIndex: 1,
          p: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {/* Tile 1 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                // border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "transparent",
              }}
            >
              <CodeIcon style={{ fontSize: 40, color: "#0c51a1" }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mt: 2, color: "white" }}
              >
                 Endpoints
              </Typography>
              <Typography sx={{ mt: 1, color: "white" }}>
                Explore and integrate with our microservices using the provided
                APIs.
              </Typography>
            </Box>
          </Grid>

          {/* Tile 2 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                // border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "transparent",
              }}
            >
              <Build style={{ fontSize: 40, color: "#0c51a1" }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mt: 2, color: "white" }}
              >
                Support Documentation
              </Typography>
              <Typography sx={{ mt: 1, color: "white" }}>
                Access comprehensive documentation to guide you through the
                integration process.
              </Typography>
            </Box>
          </Grid>

          {/* Tile 3 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                // border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "transparent",
              }}
            >
              <Explore style={{ fontSize: 40, color: "#0c51a1" }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mt: 2, color: "white" }}
              >
                API Playground
              </Typography>
              <Typography sx={{ mt: 1, color: "white" }}>
                Test and experiment with our APIs in a sandbox environment.
              </Typography>
            </Box>
          </Grid>

          {/* Tile 4 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                // border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "transparent",
              }}
            >
              <Web style={{ fontSize: 40, color: "#0c51a1" }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mt: 2, color: "white" }}
              >
                Webhooks Configuration
              </Typography>
              <Typography sx={{ mt: 1, color: "white" }}>
                Set up and manage webhooks for real-time updates and
                notifications.
              </Typography>
            </Box>
          </Grid>

          {/* Tile 5 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                // border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "transparent",
              }}
            >
              <Security style={{ fontSize: 40, color: "#0c51a1" }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mt: 2, color: "white" }}
              >
                Security & Compliance
              </Typography>
              <Typography sx={{ mt: 1, color: "white" }}>
                Learn best practices and security guidelines for a secure
                integration.
              </Typography>
            </Box>
          </Grid>

          {/* Tile 6 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                // border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "transparent",
              }}
            >
              <Speed style={{ fontSize: 40, color: "#0c51a1" }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mt: 2, color: "white" }}
              >
                Rate Limits & Quotas
              </Typography>
              <Typography sx={{ mt: 1, color: "white" }}>
                Understand rate limiting and usage quotas for optimal API usage.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
