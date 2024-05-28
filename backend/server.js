const express = require('express');
const fs = require('fs');
const path = require('path');
const YAML = require('js-yaml');
const cors = require('cors');
const bodyParser = require('body-parser'); // added for parsing JSON in POST requests
const app = express();

app.use(cors());
app.use(bodyParser.json()); // added for parsing JSON in POST requests

// Get list of all available APIs
app.get('/api/docs/list', (req, res) => {
    const apiDir = path.join(__dirname, './swaggerdocs'); 
    fs.readdir(apiDir, (err, files) => {
        if (err) {
            console.error("Error scanning directory:", err);
            return res.status(500).json({ message: 'Unable to scan directory', error: err });
        }
        const apiList = files.map(file => file.replace('.yaml', ''));
        res.json(apiList);
    });
});

// Get specific API document
app.get('/api/docs/:apiName', (req, res) => {
    console.log("API requested:", req.params.apiName);
    const apiName = req.params.apiName;
    const filePath = path.join(__dirname, `./swaggerdocs/${apiName}.yaml`); 
    if (fs.existsSync(filePath)) {
        const file = fs.readFileSync(filePath, 'utf8');
        const yamlData = YAML.load(file);
        res.json(yamlData);
    } else {
        res.status(404).json({ message: 'API document not found' });
    }
});

// Get release notes in Markdown
app.get('/api/release-notes', (req, res) => {
    const releaseNotesPath = path.join(__dirname, './releaseNotes/relelaseNotes.md');

    if (fs.existsSync(releaseNotesPath)) {
        const releaseNotes = fs.readFileSync(releaseNotesPath, 'utf8');
        res.json({ markdown: releaseNotes });
    } else {
        res.status(404).json({ message: 'Release notes not found' });
    }
});

// Fetch the specific version of release notes in Markdown
app.get('/api/release-notes/version', (req, res) => {
    const version = req.query.version || 'latest'; // If no version specified, default to 'latest'
    const releaseNotesPath = path.join(__dirname, `./releaseNotes/releaseNotes_${version}.md`);
    if (fs.existsSync(releaseNotesPath)) {
        const releaseNotes = fs.readFileSync(releaseNotesPath, 'utf8');
        res.json({ markdown: releaseNotes });
    } else {
        res.status(404).json({ message: 'Release notes not found for this version' });
    }
});

// Fetch the list of versions for which release notes are available
app.get('/api/release-notes/versions', (req, res) => {
    const releaseNotesDir = path.join(__dirname, './releaseNotes');
    fs.readdir(releaseNotesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to scan directory', error: err });
        }
        const versions = files.map(file => file.replace('releaseNotes_', '').replace('.md', ''));
        res.json({ versions });
    });
});

// Collect user feedback for specific sections in the release notes
app.post('/api/release-notes/feedback', (req, res) => {
    const { section, vote } = req.body;
    // Store this data in a database or some persistent store.
    res.json({ message: 'Feedback received' });
});

// Subscription API for email notification
app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    // Store this email in a database or some persistent store.
    res.json({ message: 'Subscribed successfully' });
});

// Downloadable assets related to release notes
app.get('/api/release-notes/download/:assetName', (req, res) => {
    const assetName = req.params.assetName;
    const assetPath = path.join(__dirname, `./releaseNotes/assets/${assetName}`);
    if (fs.existsSync(assetPath)) {
        res.download(assetPath); // Trigger file download
    } else {
        res.status(404).json({ message: 'Asset not found' });
    }
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});


