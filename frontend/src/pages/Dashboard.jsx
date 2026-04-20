import React from 'react';
import { useGameStore } from '../store/uiStore';

const Dashboard = () => {
  const { user, addCoins } = useGameStore();

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card bg-dark text-white p-3 mb-3 border-secondary">
          <h4><i className="fi fi-rr-coins"></i> Coins: ZAR {user.coins}</h4>
          <button className="btn btn-success mt-2" onClick={() => addCoins(100)}>
            <i className="fi fi-rr-wallet"></i> Top Up Fake ZAR 100
          </button>
        </div>
      </div>
      <div className="col-md-8">
        <div className="card bg-dark text-white p-3 border-secondary">
          <h2>Latest Drops</h2>
          <p>No recent drops. Go open a pack!</p>
          <a className="btn btn-primary mt-2" href="/openpack">Open Pack (ZAR 40)</a>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
