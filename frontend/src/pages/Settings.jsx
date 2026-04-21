import React from 'react';
import { useSettingsStore } from '../store/uiStore';
import Button from '../components/UI/Button';
import Swal from 'sweetalert2';

const Settings = () => {
  const { 
    musicEnabled, toggleMusic, 
    sfxEnabled, toggleSfx, 
    musicVolume, setMusicVolume,
    sfxVolume, setSfxVolume 
  } = useSettingsStore();

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
    <div className="row justify-content-center page-fade-in">
      <div className="col-md-8 col-lg-6">
        <div className="card bg-dark text-white p-4 border-secondary shadow-lg">
          <h2 className="mb-4 d-flex align-items-center">
            <i className="bi bi-sliders2 me-2 text-warning"></i> Settings
          </h2>
          
          <div className="settings-section mb-4 p-3 rounded bg-black bg-opacity-25 pb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0"><i className="bi bi-music-note me-2"></i> Music</h5>
              <div className="form-check form-switch">
                <input 
                  className="form-check-input custom-switch" 
                  type="checkbox" 
                  checked={musicEnabled} 
                  onChange={toggleMusic} 
                />
              </div>
            </div>
            <div className="px-2">
              <label className="form-label d-flex justify-content-between small text-muted">
                <span>Volume</span>
                <span>{Math.round(musicVolume * 100)}%</span>
              </label>
              <input 
                type="range" 
                className="form-range" 
                min="0" max="1" step="0.01" 
                value={musicVolume} 
                onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                disabled={!musicEnabled}
              />
            </div>
          </div>

          <div className="settings-section mb-5 p-3 rounded bg-black bg-opacity-25 pb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0"><i className="bi bi-volume-up-fill me-2"></i> Sound Effects</h5>
              <div className="form-check form-switch">
                <input 
                  className="form-check-input custom-switch" 
                  type="checkbox" 
                  checked={sfxEnabled} 
                  onChange={toggleSfx} 
                />
              </div>
            </div>
            <div className="px-2">
              <label className="form-label d-flex justify-content-between small text-muted">
                <span>Volume</span>
                <span>{Math.round(sfxVolume * 100)}%</span>
              </label>
              <input 
                type="range" 
                className="form-range" 
                min="0" max="1" step="0.01" 
                value={sfxVolume} 
                onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
                disabled={!sfxEnabled}
              />
            </div>
          </div>

          <div className="d-grid gap-2">
            <Button variant="danger" onClick={resetGame} className="py-2">
              <i className="bi bi-arrow-repeat me-2"></i> Reset Game Progress
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
