import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './views/login/login';
import Dashboard from './views/dashboard/dashboard';
import ApiExplorer  from './views/api-explorer/api';
import StatusPage from './views/status/status';
import ReleaseNotes from './views/releaseNotes/releasenotes';
import SupportArticles from './views/supportArticles/supprotArticles';
import APIPlayground from './views/playground/playground';
import { myMSALObj } from "./services/sso/authConfig";
import './App.css';
import { DarkModeProvider } from './DarkModeContext';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login msalInstance={myMSALObj} />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login msalInstance={myMSALObj} />} />
          <Route path="/service/:service" element={<ApiExplorer />} />
          <Route path="/service/status" element={<StatusPage />} />
          <Route path="/service/release-notes" element={<ReleaseNotes />} />
          <Route path="/service/support" element={<SupportArticles />} />
          <Route path="/service/playground" element={<APIPlayground />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;


