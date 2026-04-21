import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../store/GameContext';
import { fetchHistory } from '../services/api';
import './History.css';

const History = () => {
    const { user } = useContext(GameContext);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const loadHistory = async () => {
            try {
                const data = await fetchHistory(user.userId);
                setHistory(data);
            } catch (error) {
                console.error("Failed to load history", error);
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, [user]);

    if (loading) return <div className="text-center p-5">Loading history...</div>;

    if (history.length === 0) return (
        <div className="text-center p-5">
            <i className="bi bi-clock-history display-1 text-muted opacity-25"></i>
            <p className="mt-3 lead">No history yet. Start opening packs!</p>
        </div>
    );

    return (
        <div className="history-page">
            <h2 className="mb-4 fw-bold">Opening History</h2>
            <div className="history-list">
                {history.map((item) => (
                    <div key={item.packId} className="history-item">
                        <div className="item-header">
                            <span className="item-date">{new Date(item.createdAt).toLocaleString()}</span>
                            <span className={`item-result ${item.totalWon >= item.cost ? 'text-success' : 'text-danger'}`}>
                                {item.totalWon >= item.cost ? '+' : ''}R {item.totalWon - item.cost}
                            </span>
                        </div>
                        <div className="item-details">
                            <div className="item-stat">
                                <span className="label">Cost:</span>
                                <span className="value">R {item.cost}</span>
                            </div>
                            <div className="item-stat">
                                <span className="label">Won:</span>
                                <span className="value">R {item.totalWon}</span>
                            </div>
                            <div className="item-cards mt-2">
                                {item.cards.map((card, idx) => (
                                    <div key={idx} className={`mini-card rarity-${card.rarity}`} title={card.cardName}>
                                        R{card.value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
