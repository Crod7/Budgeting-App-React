import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BudgetsContextProvider } from './context/BudgetContext';
import { AuthContextProvider } from './context/AuthContext';
import { NavbarContextProvider } from './context/NavbarContext';
import { MonthlyNetBalanceContextProvider } from './context/MonthlyNetBalanceContext';















const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MonthlyNetBalanceContextProvider>
        <NavbarContextProvider>
          <BudgetsContextProvider>
            <App />
          </BudgetsContextProvider> 
        </NavbarContextProvider>
      </MonthlyNetBalanceContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


