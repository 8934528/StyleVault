import React, { useState, useContext } from 'react';
import Card from '../Card/Card';
import { GameContext } from '../../store/GameContext';
import { openPackRequest } from '../../services/api';

const PackOpening = () => {
    const { user, coins, updateCoins } = useContext(GameContext);
    
    const [isOpening, setIsOpening] = useState(false);
    const [wonCards, setWonCards] = useState([]);
    const [revealedIndices, setRevealedIndices] = useState([]);
    const [packSummary, setPackSummary] = useState(null);

    const buyPack = async () => {
        if (coins < 20) {
            alert("Not enough coins!");
            return;
        }
        
        setIsOpening(true);
        setWonCards([]);
        setRevealedIndices([]);
        setPackSummary(null);

        try {
            // Optimistic update
            updateCoins(coins - 20);
            
            const result = await openPackRequest(user?.userId || "00000000-0000-0000-0000-000000000000"); // Real user or fallback
            
            setWonCards(result.cards);
            
            // Auto flip cards sequentially for suspense!
            setTimeout(() => setRevealedIndices([0]), 800);
            setTimeout(() => setRevealedIndices([0, 1]), 1800);
            setTimeout(() => {
                setRevealedIndices([0, 1, 2]);
                setPackSummary(result);
                // After all opened, update actual context balance with server sync
                setTimeout(() => updateCoins(result.newBalance), 1000);
            }, 3000);

        } catch (error) {
            console.error(error);
            alert("Failed to open pack. Reverted balance.");
            updateCoins(coins); // Revert optimistic
            setIsOpening(false);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center mt-5 w-100">
            {/* The Pack itself or placeholder */}
            {!isOpening && packSummary === null && (
                <div className="text-center">
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/811/811466.png" 
                        alt="Pack" 
                        width="120"
                        className="mb-4"
                        style={{ filter: 'drop-shadow(0 0 20px rgba(234, 179, 8, 0.4))' }}
                    />
                    <br />
                    <button 
                        className="premium-btn mb-4" 
                        onClick={buyPack}
                        disabled={coins < 20}
                    >
                        OPEN PACK - R20
                    </button>
                    {coins < 20 && <p className="text-danger">Insufficient funds.</p>}
                </div>
            )}

            {/* The Cards Display */}
            {isOpening && (
                <div className="d-flex justify-content-center align-items-center flex-wrap mb-4 w-100 px-3">
                    {wonCards.length === 0 ? (
                        <div className="spinner-grow text-warning" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        wonCards.map((card, index) => (
                            <Card 
                                key={index} 
                                cardData={card} 
                                isRevealed={revealedIndices.includes(index)} 
                                onFlip={() => {
                                    // Manual flip if not revealed yet
                                    if (!revealedIndices.includes(index)) {
                                        setRevealedIndices([...revealedIndices, index]);
                                    }
                                }}
                            />
                        ))
                    )}
                </div>
            )}

            {/* Summary after opening */}
            {packSummary && revealedIndices.length === 3 && (
                <div className="text-center fade-in-up mt-3 p-3" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '15px' }}>
                    <h3 className={packSummary.totalWon > 20 ? 'text-success' : 'text-white'}>
                        {packSummary.totalWon > 20 ? 'PROFIT!' : packSummary.totalWon === 0 ? 'BUST!' : 'NOT BAD'}
                    </h3>
                    <p className="mb-3">You won: <strong className="text-warning">R{packSummary.totalWon}</strong></p>
                    
                    <button className="btn btn-outline-light rounded-pill px-4" onClick={() => {
                        setIsOpening(false);
                        setWonCards([]);
                        setPackSummary(null);
                    }}>
                        Buy Another Pack
                    </button>
                </div>
            )}
        </div>
    );
};

export default PackOpening;
