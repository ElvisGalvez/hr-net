import React from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import './App.css';
import CreateEmployee from './pages/CreateEmployee';
import Header from './components/atoms/Header';
import SideMenu from './components/organisms/SideMenu';  

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />  
        <div className="App-body">
          <SideMenu />  
          <div className="App-content">
            <CreateEmployee />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
