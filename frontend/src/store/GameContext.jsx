import React, { useState, useEffect } from 'react';
import { GameContext } from './game-context';

export { GameContext };

export const GameProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('stylevault_user');
        try {
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
            return null;
        }
    });
    
    const [coins, setCoins] = useState(user?.coins || 0);

    useEffect(() => {
        if (user) {
            localStorage.setItem('stylevault_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('stylevault_user');
        }
    }, [user]);

    const login = (userData) => {
        setUser(userData);
        setCoins(userData.coins);
    };

    const logout = () => {
        setUser(null);
        setCoins(0);
    };

    const updateCoins = (newVal) => {
        setCoins(newVal);
        if (user) {
            setUser(prev => ({ ...prev, coins: newVal }));
        }
    };

    return (
        <GameContext.Provider value={{ user, coins, updateCoins, login, logout }}>
            {children}
        </GameContext.Provider>
    );
};
