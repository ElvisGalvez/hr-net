import React from 'react';
import SelectField from '../../atoms/SelectField'; 
import './PageSizeSelector.css';

const PageSizeSelector = ({ pageSize, setPageSize }) => {
    const options = [
        { value: 10, label: '10' },
        { value: 25, label: '25' },
        { value: 50, label: '50' },
        { value: 100, label: '100' },
    ];

    const handlePageSizeChange = (option) => {
        setPageSize(option.value);
    };

    return (
      <div className="page-size-selector no-padding-bottom">
          Show
          <SelectField
              id="pageSizeSelect"
              label=""
              options={options}
              value={pageSize}
              onChange={handlePageSizeChange}
          />
          entries
      </div>
  );
};

export default PageSizeSelector;
