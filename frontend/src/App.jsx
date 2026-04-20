import React, { useContext } from 'react';
import PackOpening from './components/Pack/PackOpening';
import { GameContext } from './store/GameContext';

function App() {
  const { coins, isLoading } = useContext(GameContext);

  return (
    <>
      <header className="app-header">
        <div className="logo d-flex align-items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#EAB308"/>
              <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h5 className="m-0 fw-bold">StyleVault</h5>
        </div>
        <div className="coin-balance">
            <img src="https://cdn-icons-png.flaticon.com/512/1490/1490846.png" width="20" alt="coin" />
            <span>R {isLoading ? '...' : coins}</span>
        </div>
      </header>

      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center p-3">
         {isLoading ? (
            <div className="spinner-border text-warning text-center" role="status"></div>
         ) : (
            <>
              <h2 className="text-center mb-1">Open a Pack</h2>
              <p className="text-center text-muted mb-4 px-3" style={{ fontSize: '0.9rem' }}>
                 Spend R20 for a chance to find the ultra rare Game Card worth R70.
              </p>
              
              <PackOpening />
            </>
         )}
      </main>
      
      <footer className="p-3 text-center opacity-50" style={{ fontSize: '0.8rem' }}>
        <p className="m-0">RTP: 70% | Fun currency only</p>
      </footer>
    </>
  );
}

export default App;
