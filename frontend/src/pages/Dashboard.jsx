import React, { useContext } from 'react';
import { GameContext } from '../store/GameContext';
import Button from '../components/UI/Button';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const { coins, updateCoins } = useContext(GameContext);

  const addCoins = () => {
    updateCoins(coins + 100);
    Swal.fire('Top up!', 'Added R100 to your balance.', 'success');
  };

  return (
    <div className="row g-4">
      <div className="col-md-4">
        <div className="card bg-dark text-white p-4 border-secondary">
          <h3><i className="bi bi-wallet2"></i> Balance</h3>
          <h2 className="text-warning">R {coins}</h2>
          <Button variant="gold" onClick={addCoins} className="mt-3">
            <i className="bi bi-plus-circle"></i> Add R100
          </Button>
        </div>
      </div>
      <div className="col-md-8">
        <div className="card bg-dark text-white p-4 border-secondary">
          <h3>Latest Activity</h3>
          <p>Open packs to see your wins here.</p>
          <Button variant="primary" onClick={() => window.location.href = '/openpack'}>
            Open Pack (R20)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
