import React from 'react';
import { useSettingsStore } from '../store/uiStore';
import Button from '../components/UI/Button';
import Swal from 'sweetalert2';

const Settings = () => {
  const { musicEnabled, sfxEnabled, toggleMusic, toggleSfx } = useSettingsStore();

  const resetGame = () => {
    Swal.fire({
      title: 'Reset Game?',
      text: 'This will reset your balance to R100 and clear inventory.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#eab308',
      confirmButtonText: 'Yes, reset'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.reload();
      }
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card bg-dark text-white p-4 border-secondary">
          <h3><i className="bi bi-sliders2"></i> Settings</h3>
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span><i className="bi bi-music-note"></i> Background Music</span>
            <button className={`btn ${musicEnabled ? 'btn-warning' : 'btn-secondary'}`} onClick={toggleMusic}>
              {musicEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span><i className="bi bi-soundwave"></i> Sound Effects</span>
            <button className={`btn ${sfxEnabled ? 'btn-warning' : 'btn-secondary'}`} onClick={toggleSfx}>
              {sfxEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
          <Button variant="danger" onClick={resetGame}>
            <i className="bi bi-arrow-repeat"></i> Reset Game Progress
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
