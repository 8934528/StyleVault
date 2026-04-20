import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRoutes from './routes/AppRoutes.jsx'
import { GameProvider } from './store/GameContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </GameProvider>
  </StrictMode>,
)
