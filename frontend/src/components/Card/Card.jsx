import React from 'react';
import './Card.css';

const Card = ({ cardData, isRevealed, onFlip }) => {
    // Rarity dictates the border and styling 
    const rarityClass = `rarity-${cardData?.rarity || 1}`;

    return (
        <div 
            className={`card-container ${isRevealed ? 'is-flipped' : ''}`}
            onClick={onFlip}
        >
            <div className="card-flipper">
                {/* Back side of the physical card */}
                <div className="card-face card-front">
                    <img src="https://cdn-icons-png.flaticon.com/512/8690/8690659.png" width="40" alt="vault" style={{opacity: 0.5}} />
                </div>
                
                {/* Front side of the physical card, the actual outcome! */}
                <div className={`card-face card-back ${rarityClass}`}>
                    <div className="card-value">
                        {cardData?.value > 0 ? `R${cardData.value}` : 'Empty'}
                    </div>
                    
                    {cardData?.value > 0 && (
                        <div className="my-2">
                            {/* Generic flaticon placeholder for value */}
                            <img src={
                                cardData.rarity === 4 ? "https://cdn-icons-png.flaticon.com/512/2933/2933116.png" : 
                                cardData.rarity === 3 ? "https://cdn-icons-png.flaticon.com/512/2854/2854291.png" : 
                                "https://cdn-icons-png.flaticon.com/512/3141/3141991.png"
                            } width="50" alt="icon" />
                        </div>
                    )}
                    
                    <div className="card-name">
                        {cardData?.cardName}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
