import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Inventory from '../pages/Inventory';
import OpenPack from '../pages/OpenPack';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import History from '../pages/History';

const AppRoutes = () => {
  return (
    <App>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/openpack" element={<OpenPack />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </App>
  );
};

export default AppRoutes;
