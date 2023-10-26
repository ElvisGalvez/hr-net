import React from 'react';
import DateField from '../../molecules/DateField';
import TextField from '../../atoms/TextField';
import SelectField from '../../atoms/SelectField'; 
import AddressFieldset from '../../organisms/AddressFieldset';
import SaveButton from '../../atoms/SaveButton';

const EmployeeForm = ({ title, formData, handleChange, handleSubmit, departmentOptions }) => {
  return (
    <div className="form-container">
      <h2 className="form-title">{title}</h2>
      <form id="employee-form">
        <TextField label="First Name" id="firstName" value={formData.firstName} onChange={handleChange('firstName')} />
        <TextField label="Last Name" id="lastName" value={formData.lastName} onChange={handleChange('lastName')} />
        <DateField label="Date of Birth" id="birthDate" value={formData.birthDate} onChange={handleChange('birthDate')} />
        <DateField label="Start Date" id="startDate" value={formData.startDate} onChange={handleChange('startDate')} />
        <AddressFieldset street={formData.street} city={formData.city} state={formData.state} zipCode={formData.zipCode} onChange={handleChange} />
        <div className="department-select-container">
          <SelectField 
            label="Department"
            id="department"
            options={departmentOptions}
            value={formData.department}
            onChange={handleChange('department')}
          />
        </div>
        <SaveButton label="Save" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default EmployeeForm;
