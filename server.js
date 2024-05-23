const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // You can change the port number if needed

// Import the necessary CORS package
const cors = require('cors');

// Enable CORS for all routes or specific routes
app.use(cors());
app.use(express.json());

// Set CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Maintenance Banner APIs

let maintenanceBannerEnabled = true;
let maintenanceDetails = {}; // Object to store maintenance details

//API endpoint to enable maintenance banner

app.post('/api/maintenance/banner', (req, res) => {
  // Validate the request body
  const { enabled, date, startTime, endTime, endDate } = req.body;

  if (typeof enabled !== 'boolean' || typeof date !== 'string' || typeof startTime !== 'string' || typeof endTime !== 'string') {
    return res.status(400).json({ success: false, error: 'Invalid request body' });
  }

  // Process the request and update the maintenance banner state
  maintenanceBannerEnabled = enabled;
  maintenanceDetails = { date, startTime, endTime, endDate };

  return res.json({ success: true });
});

// API endpoint to get the current state of the maintenance banner
app.get('/api/maintenance/banner/details', (req, res) => {
  return res.json({ enabled: maintenanceBannerEnabled, maintenanceDetails });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
