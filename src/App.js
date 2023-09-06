import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './views/dashboard/dashboard';
import ApiExplorer  from './views/api-explorer/api';
import StatusPage from './views/status/status';
import ReleaseNotes from './views/releaseNotes/releasenotes';
import SupportArticles from './views/supportArticles/supprotArticles';
import APIPlayground from './views/playground/playground';
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
              <Route path="/service/releasenotes" element={<ReleaseNotes />} />
              <Route path="/service/support" element={<SupportArticles />} />
              <Route path="/service/playground" element={<APIPlayground />} />
            </Routes>
          </Router>
    </DarkModeProvider>
  );
}

export default App;
