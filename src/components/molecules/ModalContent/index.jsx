import React from 'react';
import './ModalContent.css';
import { format, parseISO, isValid } from 'date-fns';
import SaveAndCancelButton from '../../atoms/SaveAndCancelButton';

const ModalContent = ({ data, onConfirm, onCancel }) => {

  const formatDate = (isoString) => {
    if (isValid(parseISO(isoString))) {
      return format(parseISO(isoString), 'yyyy-MM-dd');
    } else {
      return 'Date invalide';
    }
  };

  return (
    <div className="modal-content-container">
      <p><span className="modal-label">First Name:</span> <span className="modal-value">{data.firstName}</span></p>
      <p><span className="modal-label">Last Name:</span> <span className="modal-value">{data.lastName}</span></p>
      <p><span className="modal-label">Birth Date:</span> <span className="modal-value">{formatDate(data.birthDate)}</span></p>
      <p><span className="modal-label">Start Date:</span> <span className="modal-value">{formatDate(data.startDate)}</span></p>
      <p><span className="modal-label">Street:</span> <span className="modal-value">{data.street}</span></p>
      <p><span className="modal-label">City:</span> <span className="modal-value">{data.city}</span></p>
      <p><span className="modal-label">State:</span> <span className="modal-value">{data.state}</span></p>
      <p><span className="modal-label">Zip Code:</span> <span className="modal-value">{data.zipCode}</span></p>
      <p><span className="modal-label">Department:</span> <span className="modal-value">{data.department}</span></p>
      <p>Are these details correct?</p>
      <SaveAndCancelButton
        onSave={onConfirm}
        onCancel={onCancel}
        showCancelButton={true}
      />
    </div>
  );
};

export default ModalContent;