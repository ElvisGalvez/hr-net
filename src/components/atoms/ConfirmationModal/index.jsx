import React from 'react';
import Modal from 'modal-craft';
import './ConfirmationModal.css';

const ModalCraft = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {children}
    </Modal>
  );
};

export default ModalCraft;
