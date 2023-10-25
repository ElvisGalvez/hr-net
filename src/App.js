import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { store } from './state/store';
import './App.css';
import CreateEmployee from './pages/CreateEmployee';
import EmployeeList from './pages/EmployeeList';
import Header from './components/atoms/Header';
import SideMenu from './components/organisms/SideMenu';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />  
          <div className="App-body">
            <SideMenu />
            <div className="App-content">
              <Routes> 
                <Route path="/" element={<EmployeeList />} index /> 
                <Route path="/create-employee" element={<CreateEmployee />} /> 
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
