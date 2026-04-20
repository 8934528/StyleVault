import React, { useContext } from 'react';
import { GameContext } from '../store/GameContext';

const Inventory = () => {
  const { user } = useContext(GameContext);
  // Mock inventory - in real app fetch from backend
  const mockCards = [
    { id: 1, name: 'Golden Crown', rarity: 4, value: 70 },
    { id: 2, name: 'Silver Sword', rarity: 3, value: 40 },
  ];

  return (
    <div>
      <h2><i className="bi bi-box-seam"></i> Your Collection</h2>
      <div className="row mt-3">
        {mockCards.map(card => (
          <div key={card.id} className="col-md-3 col-6 mb-3">
            <div className="card bg-dark text-white border-warning p-3 text-center">
              <i className="bi bi-gem fs-1"></i>
              <h5>{card.name}</h5>
              <p>Rarity: {card.rarity} | Value: R{card.value}</p>
            </div>
          </div>
        ))}
        {mockCards.length === 0 && <p className="text-muted">No cards yet. Open a pack!</p>}
      </div>
    </div>
  );
};

export default Inventory;
