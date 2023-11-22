import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/home';
import DiscordCallback from './components/discordCallback';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/callback" element={<DiscordCallback />} />
    </Routes>
  </Router>
);

