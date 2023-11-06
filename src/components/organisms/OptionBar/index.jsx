import React from 'react';
import PageSizeSelector from '../../molecules/PageSizeSelector'; 
import './OptionsBar.css';
import SearchField from '../../atoms/SearchField';


const OptionsBar = ({ pageSize, setPageSize, searchValue, setSearchValue }) => {
    return (
        <div className="options-bar">
            <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
            <SearchField value={searchValue} onChange={setSearchValue} placeholder="Search..." />
        </div>
    );
};

export default OptionsBar;
