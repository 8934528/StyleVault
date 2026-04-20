import React from 'react';
import PackOpening from '../components/Pack/PackOpening';

const OpenPack = () => {
  return (
    <div className="text-center">
      <h2 className="mb-3">Open a Pack</h2>
      <p className="text-muted mb-4">Spend R20 for a chance to win valuable cards.</p>
      <PackOpening />
    </div>
  );
};

export default OpenPack;
