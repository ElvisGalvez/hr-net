import React from 'react';
import './SideMenuLink.css';

const SideMenuLink = ({ href, iconClass, text, isExpanded }) => (
  <a href={href} className="menu-link">
    <i className={iconClass}></i>
    <span className={`menu-text ${isExpanded ? 'show-text' : 'hide-text'}`}>{text}</span>
  </a>
);

export default SideMenuLink;
