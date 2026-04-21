import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GameContext } from './store/GameContext';
import { useBackgroundMusic } from './hooks/useSound';
import logo from '/logo.png'; 

const App = ({ children }) => {
  const { user, coins, isLoading } = useContext(GameContext);
  const { initMusic } = useBackgroundMusic();
  const navigate = useNavigate();

  const isNavDisabled = !user;

  return (
    <div className="app-container" onClick={initMusic}>
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

      <main className="app-main page-fade-in" key={window.location.pathname}>
        {children}
      </main>

      <nav className="bottom-nav">
        <Link to="/dashboard" className={`nav-item ${isNavDisabled ? 'disabled' : ''}`}>
          <i className="bi bi-grid-3x3-gap-fill"></i>
          <span>Dashboard</span>
        </Link>
        <Link to="/openpack" className={`nav-item ${isNavDisabled ? 'disabled' : ''}`}>
          <i className="bi bi-gift-fill"></i>
          <span>Open Pack</span>
        </Link>
        <Link to="/history" className={`nav-item ${isNavDisabled ? 'disabled' : ''}`}>
          <i className="bi bi-clock-history"></i>
          <span>History</span>
        </Link>
        <Link to="/inventory" className={`nav-item ${isNavDisabled ? 'disabled' : ''}`}>
          <i className="bi bi-box-seam-fill"></i>
          <span>Inventory</span>
        </Link>
        <Link to="/profile" className={`nav-item ${isNavDisabled ? 'disabled' : ''}`}>
          <i className="bi bi-person-fill"></i>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default App;
