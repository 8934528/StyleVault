import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GameContext } from './store/GameContext';
import logo from '/logo.png'; 

const App = ({ children }) => {
  const { coins, isLoading } = useContext(GameContext);
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="StyleVault Logo" height="40" />
        </div>
        <div className="coin-balance">
          <i className="bi bi-cash"></i>
          <span>R {isLoading ? '...' : coins}</span>
        </div>
        <Link to="/settings" className="settings-btn">
          <i className="bi bi-gear-fill"></i>
        </Link>
      </header>

      <main className="app-main">{children}</main>

      <nav className="bottom-nav">
        <Link to="/dashboard" className="nav-item">
          <i className="bi bi-grid-3x3-gap-fill"></i>
          <span>Dashboard</span>
        </Link>
        <Link to="/openpack" className="nav-item">
          <i className="bi bi-gift-fill"></i>
          <span>Open Pack</span>
        </Link>
        <Link to="/inventory" className="nav-item">
          <i className="bi bi-box-seam-fill"></i>
          <span>Inventory</span>
        </Link>
        <Link to="/profile" className="nav-item">
          <i className="bi bi-person-fill"></i>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default App;
