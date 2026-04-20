import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Inventory from '../pages/Inventory';
import OpenPack from '../pages/OpenPack';
import Profile from '../pages/Profile';

const AppRoutes = () => (
  <div className="container mt-4">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/openpack" element={<OpenPack />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </div>
);
export default AppRoutes;
