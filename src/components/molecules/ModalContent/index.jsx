import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ModalContent.css';
import { format, parseISO, isValid } from 'date-fns';
import SaveAndCancelButton from '../../atoms/SaveAndCancelButton';
import { setConfirmation, setAutoClose, resetFormData } from '../../../state/employeeSlice';

const ModalContent = ({ data, onConfirm, onCancel }) => {
  const dispatch = useDispatch();
  const confirmation = useSelector((state) => state.employee.confirmation);
  const autoClose = useSelector((state) => state.employee.autoClose);
  const modalType = useSelector((state) => state.employee.modalType);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onConfirm();
        dispatch(resetFormData()); 
        onCancel();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onConfirm, onCancel, dispatch]);

  const formatDate = (isoString) => {
    if (isValid(parseISO(isoString))) {
      return format(parseISO(isoString), 'yyyy-MM-dd');
    } else {
      return 'Date invalide';
    }
  };

  const handleSave = () => {
    dispatch(setConfirmation(false)); 
    dispatch(setAutoClose(true));
  };

  return (
    <div className="modal-content-container">
      {confirmation ? (
        <>
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
            onSave={handleSave}
            onCancel={onCancel}
            showCancelButton={true}
          />
        </>
      ) : (
        <>
<p>{modalType === 'edit' ? 'Employee Edited!' : 'Employee Created!'}</p>
          {autoClose && <p>This modal will close automatically in a few seconds.</p>}
        </>
      )}
    </div>
  );
};

export default ModalContent;