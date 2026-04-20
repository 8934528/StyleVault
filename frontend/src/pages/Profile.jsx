import React from 'react';
import { useAuth } from '../hooks/useAuth';
const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card bg-dark text-white p-4">
          <h3><i className="fi fi-rr-user"></i> Profile</h3>
          <hr />
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Balance:</strong> ZAR {user?.coins}</p>
        </div>
      </div>
    </div>
  );
};
export default Profile;
