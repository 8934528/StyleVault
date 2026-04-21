import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import { GameContext } from '../store/GameContext';
import { loginUser } from '../services/api';
import Swal from 'sweetalert2';

const Home = () => {
  const [name, setName] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useContext(GameContext);
  const navigate = useNavigate();

  const handleStart = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      Swal.fire('Error', 'Please enter your name', 'error');
      return;
    }

    setIsLoggingIn(true);
    try {
      const userData = await loginUser(name.trim());
      login(userData);
      Swal.fire({
        title: 'Welcome!',
        text: `Good to see you, ${userData.username}`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to join the game. Is the backend running?', 'error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="text-center py-5 fade-in-up">
      <h1 className="display-4 fw-bold mb-4">Welcome to StyleVault</h1>
      <p className="lead mb-5">Collect, trade, and win rare digital cards.</p>
      
      <div className="mx-auto" style={{ maxWidth: '400px' }}>
        <form onSubmit={handleStart}>
          <div className="mb-4">
            <input 
              type="text" 
              className="form-control form-control-lg bg-dark text-white border-secondary text-center"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoggingIn}
            />
          </div>
          <Button 
            variant="gold" 
            type="submit"
            className="w-100 py-3 fs-5 premium-btn"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? 'Joining...' : 'Start Playing'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Home;
