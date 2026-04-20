import { useState } from 'react';
export const usePack = () => { const [opening, setOpening] = useState(false); const openPack = () => { setOpening(true); setTimeout(() => setOpening(false), 2000); }; return { opening, openPack }; };
