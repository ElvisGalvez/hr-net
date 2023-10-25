import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSideMenuExpanded } from '../../../state/employeeSlice'; 
import { useLocation } from 'react-router-dom'; 
import './SideMenu.css';
import Logo from '../../atoms/Logo';
import CompanyName from '../../atoms/CompanyName';
import SideMenuLink from '../../atoms/SideMenuLink';

const SideMenu = () => {
  const dispatch = useDispatch(); 
  const isExpanded = useSelector(state => state.employee.isSideMenuExpanded);
  const location = useLocation(); 

  const isOnEmployeeList = location.pathname === '/'; 
  
  return (
    <div 
      className={`side-menu ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => dispatch(setSideMenuExpanded(true))}
      onMouseLeave={() => dispatch(setSideMenuExpanded(false))}
    >
      <Logo isExpanded={isExpanded} />
      <CompanyName isExpanded={isExpanded} />
      <SideMenuLink 
        to={isOnEmployeeList ? "/create-employee" : "/"}
        iconClass={`fa-regular fa-id-badge menu-icon ${isExpanded ? 'show-text' : 'hide-text'} ${isOnEmployeeList ? 'fa-solid fa-user-plus' : ''}`}
        text={isOnEmployeeList ? "Create Employee" : "Employee List"}
        isExpanded={isExpanded}
      />
    </div>
  );
};

export default SideMenu;
