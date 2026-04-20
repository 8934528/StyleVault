import React, { useContext } from 'react';
import { GameContext } from '../store/GameContext';

const Profile = () => {
  const { user, coins } = useContext(GameContext);

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card bg-dark text-white p-4 border-secondary">
          <div className="text-center">
            <i className="bi bi-person-circle fs-1"></i>
            <h3>{user?.username || 'Player'}</h3>
          </div>
          <hr />
          <p><strong>Balance:</strong> R {coins}</p>
          <p><strong>Member since:</strong> {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
