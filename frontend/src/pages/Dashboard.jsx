import React from 'react';
const Dashboard = () => (
  <div className="row">
    <div className="col-md-4">
      <div className="card bg-dark text-white p-3">
        <h4><i className="fi fi-rr-coins"></i> Your Coins: ZAR 100</h4>
      </div>
    </div>
    <div className="col-md-8">
      <div className="card bg-dark text-white p-3">
        <h2>Latest Drops</h2>
        <p>No recent drops. Go open a pack!</p>
        <a className="btn btn-success" href="/openpack">Buy Pack (ZAR 20)</a>
      </div>
    </div>
  </div>
);
export default Dashboard;
