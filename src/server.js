const express = require('express');
const axios = require('axios');
const Parser = require('rss-parser');

const app = express();
const parser = new Parser();
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const RSS_FEED_URL = 'https://azure.microsoft.com/en-us/status/feed/';

app.get('/api/status-feed', async (req, res) => {
  try {
    const response = await axios.get(CORS_PROXY + RSS_FEED_URL);
    const feed = await parser.parseString(response.data);
    res.json(feed);
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    res.status(500).json({ error: 'Failed to fetch RSS feed' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
