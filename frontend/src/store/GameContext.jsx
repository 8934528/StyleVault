import React, { createContext, useState, useEffect } from 'react';
import { fetchDefaultUser, fetchBalance } from '../services/api';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('stylevault_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [coins, setCoins] = useState(user?.coins || 0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setCoins(user.coins);
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
        <GameContext.Provider value={{ user, coins, updateCoins, isLoading, login, logout }}>
            {children}
        </GameContext.Provider>
    );
};
