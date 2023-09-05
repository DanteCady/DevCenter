const express = require('express');
const fs = require('fs');
const path = require('path');
const YAML = require('js-yaml');
const cors = require('cors');
const markdown = require('markdown-it')();
const app = express();
app.use(cors());

// Get list of all available APIs
app.get('/api/docs/list', (req, res) => {
    const apiDir = path.join(__dirname, './swaggerdocs'); // Updated the folder name here
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
    const filePath = path.join(__dirname, `./swaggerdocs/${apiName}.yaml`); // Updated the folder name here
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
    const releaseNotesPath = path.join(__dirname, './releaseNotes/relelaseNotes.md'); // Update the path to where your release notes file is stored

    if (fs.existsSync(releaseNotesPath)) {
        const releaseNotes = fs.readFileSync(releaseNotesPath, 'utf8');
        res.json({ markdown: releaseNotes });
    } else {
        res.status(404).json({ message: 'Release notes not found' });
    }
});


app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
