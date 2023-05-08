import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TransactionsContextProvider } from './context/TransactionContext';
import { AuthContextProvider } from './context/AuthContext';
import { NavbarContextProvider } from './context/NavbarContext';
import { MonthlyNetBalanceContextProvider } from './context/MonthlyNetBalanceContext';















const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MonthlyNetBalanceContextProvider>
        <NavbarContextProvider>
          <TransactionsContextProvider>
            <App />
          </TransactionsContextProvider> 
        </NavbarContextProvider>
      </MonthlyNetBalanceContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


