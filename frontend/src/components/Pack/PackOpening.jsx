import React, { useState, useContext, useRef } from 'react';
import Card from '../Card/Card';
import { GameContext } from '../../store/GameContext';
import { openPackRequest } from '../../services/api';
import Swal from 'sweetalert2';
import Button from '../UI/Button';

const PackOpening = () => {
  const { user, coins, updateCoins } = useContext(GameContext);
  const [isOpening, setIsOpening] = useState(false);
  const [wonCards, setWonCards] = useState([]);
  const [revealedIndices, setRevealedIndices] = useState([]);
  const [packSummary, setPackSummary] = useState(null);
  const abortControllerRef = useRef(null);
  const timeoutsRef = useRef([]);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const cancelOpening = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    clearTimeouts();
    setIsOpening(false);
    setWonCards([]);
    setRevealedIndices([]);
    setPackSummary(null);
    Swal.fire('Cancelled', 'Pack opening cancelled. No coins deducted.', 'info');
  };

  const buyPack = async () => {
    if (coins < 20) {
      Swal.fire('Insufficient funds', `You need R20 to open a pack.`, 'warning');
      return;
    }

    setIsOpening(true);
    setWonCards([]);
    setRevealedIndices([]);
    setPackSummary(null);
    abortControllerRef.current = new AbortController();

    try {
      // Optimistic update
      updateCoins(coins - 20);

      const result = await openPackRequest(user?.userId || 'default', { signal: abortControllerRef.current.signal });
      setWonCards(result.cards);

      // Sequential reveal
      timeoutsRef.current.push(
        setTimeout(() => setRevealedIndices([0]), 800),
        setTimeout(() => setRevealedIndices([0, 1]), 1800),
        setTimeout(() => {
          setRevealedIndices([0, 1, 2]);
          setPackSummary(result);
          updateCoins(result.newBalance);
          // Show result alert
          const profit = result.totalWon - 20;
          Swal.fire({
            icon: profit >= 0 ? 'success' : 'error',
            title: profit >= 0 ? 'Winner!' : 'Better luck next time',
            html: `You won <strong>R${result.totalWon}</strong><br/>${profit >= 0 ? `Profit: R${profit}` : `Loss: R${Math.abs(profit)}`}`,
            timer: 3000,
            showConfirmButton: false
          });
        }, 3000)
      );
    } catch (error) {
      if (error.name === 'AbortError') {
        
        updateCoins(coins); // revert optimistic
      } else {
        console.error(error);
        updateCoins(coins); // revert
        Swal.fire('Error', 'Failed to open pack. Please try again.', 'error');
      }
      setIsOpening(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center w-100">
      {!isOpening && packSummary === null && (
        <div className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/811/811466.png"
            alt="Pack"
            width="120"
            className="mb-4"
            style={{ filter: 'drop-shadow(0 0 20px rgba(234, 179, 8, 0.4))' }}
          />
          <Button variant="gold" onClick={buyPack} disabled={coins < 20}>
            OPEN PACK - R20
          </Button>
          {coins < 20 && <p className="text-danger mt-2">Insufficient funds.</p>}
        </div>
      )}

      {isOpening && (
        <>
          <div className="d-flex justify-content-center flex-wrap mb-4">
            {wonCards.length === 0 ? (
              <Loader />
            ) : (
              wonCards.map((card, idx) => (
                <Card
                  key={idx}
                  cardData={card}
                  isRevealed={revealedIndices.includes(idx)}
                  onFlip={() => {
                    if (!revealedIndices.includes(idx)) {
                      setRevealedIndices([...revealedIndices, idx]);
                    }
                  }}
                />
              ))
            )}
          </div>
          <Button variant="danger" onClick={cancelOpening} className="mt-2">
            Cancel Opening
          </Button>
        </>
      )}

      {packSummary && revealedIndices.length === 3 && (
        <div className="text-center fade-in-up mt-3 p-3" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '15px' }}>
          <h3 className={packSummary.totalWon > 20 ? 'text-success' : 'text-white'}>
            {packSummary.totalWon > 20 ? 'PROFIT!' : packSummary.totalWon === 0 ? 'BUST!' : 'NOT BAD'}
          </h3>
          <p>You won: <strong className="text-warning">R{packSummary.totalWon}</strong></p>
          <Button variant="gold" onClick={() => {
            setIsOpening(false);
            setWonCards([]);
            setPackSummary(null);
          }}>
            Buy Another Pack
          </Button>
        </div>
      )}
    </div>
  );
};

export default PackOpening;
