import React from 'react';
import './SaveButton.css';

const SaveButton = ({ label, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {label}
    </button>
  );
};

export default SaveButton;