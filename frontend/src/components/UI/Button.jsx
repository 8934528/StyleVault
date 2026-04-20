import React from 'react';

const Button = ({ children, onClick, variant = 'primary', disabled = false, className = '' }) => {
  const variants = {
    primary: 'btn btn-primary',
    gold: 'premium-btn',
    outline: 'btn btn-outline-light',
    danger: 'btn btn-danger',
  };
  return (
    <button
      className={`${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
