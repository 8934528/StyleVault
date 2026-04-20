import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Inventory from '../pages/Inventory';
import OpenPack from '../pages/OpenPack';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import { useBackgroundMusic } from '../hooks/useSound';

const AppRoutes = () => {
  const { initMusic } = useBackgroundMusic();

  // We play music securely on click anywhere
  const handleInteraction = () => initMusic();

  return (
    <div className="container mt-4" onClick={handleInteraction}>
      <nav className="mb-4 d-flex justify-content-between align-items-center">
        <h2>StyleVault</h2>
        <div>
           <a className="btn btn-outline-light me-2" href="/dashboard"><i className="fi fi-rr-apps"></i></a>
           <a className="btn btn-outline-light me-2" href="/inventory"><i className="fi fi-rr-box"></i></a>
           <a className="btn btn-outline-light me-2" href="/profile"><i className="fi fi-rr-user"></i></a>
           <a className="btn btn-outline-info" href="/settings"><i className="fi fi-rr-settings"></i></a>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/openpack" element={<OpenPack />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};
export default AppRoutes;
