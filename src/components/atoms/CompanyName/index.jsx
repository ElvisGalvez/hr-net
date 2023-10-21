import React from 'react';
import './CompanyName.css';

const CompanyName = ({ isExpanded }) => (
  <div className={`company-name ${isExpanded ? 'show-text' : 'hide-text'}`}>
    Wealth Health
  </div>
);

export default CompanyName;
