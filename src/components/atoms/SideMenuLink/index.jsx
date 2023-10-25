import React from 'react';
import './SideMenuLink.css';
import { Link } from 'react-router-dom';

const SideMenuLink = ({ to, iconClass, text, isExpanded }) => (
  <Link to={to} className="menu-link">
    <i className={iconClass}></i>
    <span className={`menu-text ${isExpanded ? 'show-text' : 'hide-text'}`}>{text}</span>
  </Link>
);
export default SideMenuLink;
