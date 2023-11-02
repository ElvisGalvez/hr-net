import React from 'react';
import './SaveAndCancelButton.css';

const SaveAndCancelButton = ({ onSave, onCancel, showCancelButton, saveLabel = "Save", cancelLabel = "Cancel" }) => {
  return (
    <div className="button-group">
      <button className="btn save" onClick={onSave}>
        {saveLabel}
      </button>
      {showCancelButton && (
        <button className="btn cancel" onClick={onCancel}>
          {cancelLabel}
        </button>
      )}
    </div>
  );
};

export default SaveAndCancelButton;
