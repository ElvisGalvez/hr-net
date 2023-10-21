import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSideMenuExpanded } from '../../../state/employeeSlice'; 
import './SideMenu.css';
import Logo from '../../atoms/Logo';
import CompanyName from '../../atoms/CompanyName';
import SideMenuLink from '../../atoms/SideMenuLink';

const SideMenu = () => {
  const dispatch = useDispatch(); 
  const isExpanded = useSelector(state => state.employee.isSideMenuExpanded); 

  return (
    <div 
      className={`side-menu ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => dispatch(setSideMenuExpanded(true))}
      onMouseLeave={() => dispatch(setSideMenuExpanded(false))}
    >
      <Logo isExpanded={isExpanded} />
      <CompanyName isExpanded={isExpanded} />
      <SideMenuLink 
        href="/employee-list"
        iconClass={`fa-regular fa-id-badge menu-icon ${isExpanded ? 'show-text' : 'hide-text'}`}
        text="Employee List"
        isExpanded={isExpanded}
      />
    </div>
  );
};

export default SideMenu;
