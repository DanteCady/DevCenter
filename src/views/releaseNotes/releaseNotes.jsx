// import React, { useState, useEffect, useRef } from 'react';
// import { Box, Typography, Grid, Paper, IconButton, Button } from '@mui/material';
// import { Email, GetApp, FileCopy } from '@mui/icons-material';
// import axios from 'axios';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const ReleaseNotes = () => {
//   const [releaseNotes, setReleaseNotes] = useState([]);
//   const paperRef = useRef(null);

//   useEffect(() => {
//     // Fetch data from your backend
//     axios.get('http://localhost:3001/release-notes')
//       .then((res) => {
//         setReleaseNotes(res.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching release notes: ", error);
//       });
//   }, []);

//   const handleDownload = () => {
//     const input = paperRef.current;
//     html2canvas(input)
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF();
//         pdf.addImage(imgData, 'JPEG', 0, 0);
//         pdf.save("download.pdf");
//       });
//   };

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(window.location.href);
//   };

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} md={8}>
//         {releaseNotes.map((release, index) => (
//           <Box mb={4} ref={paperRef}>
//             <Typography variant="h4">{`Version ${index+1}`} - {new Date(release.date).toLocaleDateString()}</Typography>
//             <Paper>
//               <Box p={2}>
//                 <Typography variant="h6">{release.title}</Typography>
//                 <Typography>- {release.description}</Typography>
//               </Box>
//             </Paper>
//           </Box>
//         ))}
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
//           <IconButton>
//             <Email />
//           </IconButton>
//           <IconButton onClick={handleCopyLink}>
//             <FileCopy />
//           </IconButton>
//           <Button startIcon={<GetApp />} variant="contained" color="primary" onClick={handleDownload}>
//             Export as PDF
//           </Button>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default ReleaseNotes;



import React, { useState, useRef } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  Badge,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import { Announcement, Update, BugReport, CheckCircle, Email, GetApp } from '@mui/icons-material';
import html2pdf from 'html2pdf.js';
import Header from '../../components/header';
import 'typeface-roboto';


const ReleaseNotes = () => {
  const [releaseNotes, setReleaseNotes] = useState([
    // Example release notes data
    { id: 1, category: 'Announcements', note: 'Release note 1' },
    { id: 2, category: 'Updates', note: 'Release note 2' },
    { id: 3, category: 'Bugs', note: 'Release note 3' },
    { id: 4, category: 'Fixes', note: 'Release note 4' },
    // ...
  ]);

  const releaseNotesRef = useRef(null);

  const handleDownload = () => {
    const element = releaseNotesRef.current;
    const options = {
      filename: 'release_notes.pdf',
    };
    html2pdf().set(options).from(element).save();
  };

  const handleEmail = () => {
    // Logic to email the release note
    // You can implement this functionality as per your requirement
    console.log('Email clicked');
  };

  return (
    <div>
          <AppBar position="static" sx={{ backgroundColor: '#0c51a1'}}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>GNIE Release Notes</Typography>
          <IconButton color="inherit" onClick={handleEmail}>
            <Email />
          </IconButton>
          <IconButton color="inherit" onClick={handleDownload}>
            <GetApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box mt={4} mx="auto" maxWidth={600} p={4} display="flex" flexDirection="column">
        <div id="release-notes-container" ref={releaseNotesRef}>
          <Typography variant="h4" style={{ marginBottom: 10 }}>GNIE Release Notes</Typography>
          {releaseNotes.map((note) => (
            <Paper
              key={note.id}
              variant="outlined"
              sx={{ mb: 2, p: 2, border: '1px solid rgba(0, 0, 0, 0.2)' }}
            >
              <Box display="flex" alignItems="center">
                {note.category === 'Announcements' && (
                  <Badge
                    style={{ backgroundColor: 'red', color: 'white', borderRadius: 4, padding: '2px 8px', marginRight: 8 }}
                  >
                    <Announcement style={{ marginRight: 5 }} />
                    <Typography variant="body2">Announcement</Typography>
                  </Badge>
                )}
                {note.category === 'Updates' && (
                  <Badge
                    style={{ backgroundColor: 'blue', color: 'white', borderRadius: 4, padding: '2px 8px', marginRight: 8 }}
                  >
                    <Update style={{ marginRight: 5 }} />
                    <Typography variant="body2">Update</Typography>
                  </Badge>
                )}
                {note.category === 'Bugs' && (
                  <Badge
                    style={{ backgroundColor: 'yellow', color: 'black', borderRadius: 4, padding: '2px 8px', marginRight: 8 }}
                  >
                    <BugReport style={{ marginRight: 5 }} />
                    <Typography variant="body2">Bug</Typography>
                  </Badge>
                )}
                {note.category === 'Fixes' && (
                  <Badge
                    style={{ backgroundColor: 'green', color: 'white', borderRadius: 4, padding: '2px 8px', marginRight: 8 }}
                  >
                    <CheckCircle style={{ marginRight: 5 }} />
                    <Typography variant="body2">Fix</Typography>
                  </Badge>
                )}
                <Typography variant="body1">{note.note}</Typography>
              </Box>
            </Paper>
          ))}
        </div>
        {/* <Box mt={4} display="flex" flexDirection="column">
          <Typography variant="h6" style={{ marginBottom: 10 }}>Subscribe for Updates</Typography>
          <TextField label="Email Address" variant="outlined" sx={{ marginBottom: 10 }} />
          <Button variant="contained" color="primary" onClick={handleSubscribe}>Subscribe</Button>
        </Box> */}
      </Box>
    </div>
  );
};

export default ReleaseNotes;


// import ComingSoonPage from "../../components/comingSoon";
// import Header from "../../components/header";
// import Footer from "../../components/footer";
// import MaintenanceNotification from "../../components/maintenance"
// function ReleaseNotes() {
    
//     return (
//         <>
//         <Header/>
//             <MaintenanceNotification />
//             <ComingSoonPage
//             title="ReleaseNotes Coming Soon!"
//             description="We are working hard to bring you ReleaseNotes. Please check back later."
//             />
//         <Footer/>
//         </>
//         );
// };

// export default ReleaseNotes;