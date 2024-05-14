import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { standardLogin } from "../../utils/auth/login";
// import "../../../styles/portal.css"; // Import the CSS file

export default function LogInModal({ open, onClose, setUserNotFound }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [showPortal, setShowPortal] = useState(false);

  const handleSignIn = async () => {
    const loginSuccess = await standardLogin(
      username,
      password,
      setUserNotFound
    );

    if (loginSuccess) {
      // setShowPortal(true);

      setTimeout(() => {
        onClose();
      }, 2000); // Adjust the delay as needed
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* {showPortal && (
        <div className="portal-container">
          <div className="portal-message">Welcome!</div>
        </div>
      )} */}
    </>
  );
}
