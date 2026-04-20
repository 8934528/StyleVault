import React, { useState } from 'react';
import { useGameStore } from '../store/uiStore';
import { useSound } from '../hooks/useSound';

const OpenPack = () => {
  const { user, deductCoins } = useGameStore();
  const { playSfx } = useSound();
  const [opening, setOpening] = useState(false);

  const openPack = () => {
    if (user.coins < 40) {
      alert("Not enough coins! Go to dashboard to top up pseudo-balance.");
      return;
    }
    
    deductCoins(40);
    setOpening(true);
    playSfx('GameStart.mp3');

    setTimeout(() => {
       setOpening(false);
       // randomly play jackpot or standard win
       if (Math.random() > 0.8) playSfx('JackpotWin.mp3'); 
       else playSfx('PriceWin.mp3');
       
       alert("Pack opened! Check inventory (simulation).");
    }, 2000);
  };

  return (
    <div className="row text-center mt-5">
      <div className="col-md-6 offset-md-3">
        <div className="card bg-dark text-white p-5 border-warning border-3">
          <h2><i className="fi fi-rr-gift"></i> VIP Pack</h2>
          <p className="mt-3">Costs ZAR 40. Contains 3 cards.</p>
          <button className="btn btn-warning btn-lg mt-4 shadow" onClick={openPack} disabled={opening}>
            {opening ? 'Opening...' : 'Open Now for ZAR 40'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default OpenPack;
