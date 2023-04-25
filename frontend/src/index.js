import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BudgetsContextProvider } from './context/BudgetContext';
import { AuthContextProvider } from './context/AuthContext';
import { NavbarContextProvider } from './context/NavbarContext';















const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NavbarContextProvider>
        <BudgetsContextProvider>
          <App />
        </BudgetsContextProvider> 
      </NavbarContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


