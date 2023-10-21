import React from 'react';
import './Logo.css';
import logoPath from '../../../assets/logos/wealth health logo.jpg';

const Logo = ({ isExpanded }) => (
  <div className="logo-container">
    <img 
      src={logoPath} 
      alt="Wealth Health Logo" 
      className={`logo ${isExpanded ? 'expanded' : 'collapsed'}`}
    />
  </div>
);

export default Logo;