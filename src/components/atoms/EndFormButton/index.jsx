import React from 'react';
import './EndFormButton.css'; 

const EndFormButton = ({ type, label, onClick }) => {
  return (
    <button 
      className={`generic-button ${type}`} 
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default EndFormButton;
