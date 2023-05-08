/**
 * Purpose:
 * Manages the Transaction Context. 
 */

import { createContext, useReducer } from "react"

export const TransactionsContext = createContext()

export const transactionsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            return {
                transactions: action.payload
            }
        case 'CREATE_TRANSACTION':
            return {
                transactions: [action.payload, ...state.transactions]
            }
        case 'DELETE_TRANSACTION':
            return {
                transactions: state.transactions.filter((transaction) => transaction._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const TransactionsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(transactionsReducer, {
        transactions: null,
    })


    // Any components inside this will be effected by this 
    // context, and since we put the entire Application inside
    // the context will effect the entire program.
    return (
        <TransactionsContext.Provider value={{...state, dispatch}}>
            {children}
        </TransactionsContext.Provider>
    )
}