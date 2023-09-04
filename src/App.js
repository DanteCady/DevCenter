import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './views/home/dashboard';
import ApiExplorer  from './views/api-explorer/api';
import StatusPage from './views/status/status';
import ReleaseNotesPage from './views/releaseNotes/releaseNotes';
import SupportArticles from './views/supportArticles/supprotArticles';
import Forms from './views/forms/forms';
import APIPlayground from './views/playground/playgroundcontainer';
import './App.css';
import { DarkModeProvider } from './DarkModeContext';

function App() {
  return (
     <DarkModeProvider>
        <Router>
          <CssBaseline />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/service/:service" element={<ApiExplorer/>} />
              <Route path="/service/status" element={<StatusPage />} />
              <Route path="/service/releasenotes" element={<ReleaseNotesPage />} />
              <Route path="/service/support" element={<SupportArticles />} />
              <Route path="/service/apiplayground" element={<APIPlayground />} />
              <Route path="/service/forms" element={<Forms />} />
            </Routes>
          </Router>
    </DarkModeProvider>
  );
}

export default App;
