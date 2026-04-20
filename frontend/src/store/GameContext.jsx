import React, { createContext, useState, useEffect } from 'react';
import { fetchDefaultUser, fetchBalance } from '../services/api';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [coins, setCoins] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initGame = async () => {
            try {
                // For simplicity, we just fetch our seeded default user.
                const defaultUser = await fetchDefaultUser();
                setUser(defaultUser);
                setCoins(defaultUser.coins);
            } catch (error) {
                console.error("Failed to initialize game state. Is backend running?", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Note: For actual application flow, you'll login properly instead of this. Let's suppress network errors visually until connected.
        initGame().catch(() => setIsLoading(false));
    }, []);

    const updateCoins = (newVal) => setCoins(newVal);

    return (
        <GameContext.Provider value={{ user, coins, updateCoins, isLoading }}>
            {children}
        </GameContext.Provider>
    );
};
