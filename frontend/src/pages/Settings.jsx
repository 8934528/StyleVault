import React from 'react';
import { useSettingsStore } from '../store/uiStore';

const Settings = () => {
  const { musicEnabled, sfxEnabled, currentTrack, toggleMusic, toggleSfx, setTrack } = useSettingsStore();

  const tracks = [
    'BigBeatBackgroundMusic.mp3',
    'MerxBackgroundMusic.mp3',
    'RelaxedBackgroundMusic.mp3',
    'SeriousBackgroundMusic.mp3'
  ];

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card bg-dark text-white p-4">
          <h3><i className="fi fi-rr-settings"></i> Settings</h3>
          <hr />
          
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" role="switch" id="musicSwitch" checked={musicEnabled} onChange={toggleMusic} />
            <label className="form-check-label" htmlFor="musicSwitch">Enable Background Music</label>
          </div>

          <div className="form-check form-switch mb-4">
            <input className="form-check-input" type="checkbox" role="switch" id="sfxSwitch" checked={sfxEnabled} onChange={toggleSfx} />
            <label className="form-check-label" htmlFor="sfxSwitch">Enable Sound Effects</label>
          </div>

          <div className="mb-3">
            <label className="form-label">Background Track</label>
            <select 
              className="form-select bg-secondary text-white" 
              value={currentTrack} 
              onChange={(e) => setTrack(e.target.value)}
              disabled={!musicEnabled}
            >
              {tracks.map(track => (
                <option key={track} value={track}>{track.replace('.mp3', '')}</option>
              ))}
            </select>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Settings;
