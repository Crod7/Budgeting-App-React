import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TransactionsContextProvider } from './context/TransactionContext';
import { AuthContextProvider } from './context/AuthContext';
import { NavbarContextProvider } from './context/NavbarContext';
import { MonthlyNetBalanceContextProvider } from './context/MonthlyNetBalanceContext';
import { MonthlyExpenseContextProvider } from './context/MonthlyExpenseContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MonthlyNetBalanceContextProvider>
      <AuthContextProvider>
          <MonthlyExpenseContextProvider>
            <NavbarContextProvider>
              <TransactionsContextProvider>
                <App />
              </TransactionsContextProvider> 
            </NavbarContextProvider>
          </MonthlyExpenseContextProvider>
      </AuthContextProvider>
    </MonthlyNetBalanceContextProvider>
  </React.StrictMode>
);


