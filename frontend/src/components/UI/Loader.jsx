import React from 'react';

const Loader = ({ size = 'md', fullScreen = false }) => {
  const sizeClass = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  };
  return (
    <div className={`text-center ${fullScreen ? 'position-fixed top-50 start-50 translate-middle' : ''}`}>
      <div className={`spinner-border text-warning ${sizeClass[size]}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
