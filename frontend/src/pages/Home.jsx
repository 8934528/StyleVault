import React from 'react';
import Button from '../components/UI/Button';

const Home = () => (
  <div className="text-center py-5">
    <h1 className="display-4 fw-bold">Welcome to StyleVault</h1>
    <p className="lead">Collect, trade, and win rare digital cards.</p>
    <Button variant="gold" onClick={() => window.location.href = '/dashboard'}>
      Start Playing
    </Button>
  </div>
);

export default Home;
