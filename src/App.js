import React from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import './App.css';
import CreateEmployee from './pages/CreateEmployee';
import Header from './components/atoms/Header'; 
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />  
        <CreateEmployee />
      </div>
    </Provider>
  );
}

export default App;
