import { useState } from 'react';
export const useAuth = () => { const [user] = useState({ username: 'Player', coins: 100}); return { user, isAuthenticated: !!user }; };
