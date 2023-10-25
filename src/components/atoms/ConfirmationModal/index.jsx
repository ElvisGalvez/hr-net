import React from 'react';
import Modal from 'modal-craft';

const ModalCraft = ({ isOpen, onClose, children }) => {
  const visibilityStyle = {
    visibility: isOpen ? 'visible' : 'hidden'
  };
  
  return (
    <div style={visibilityStyle}>
      <Modal isOpen={isOpen} onClose={onClose}>
        {children}
      </Modal>
    </div>
  );
};

export default ModalCraft;
