

import { createContext, useReducer } from "react"

export const BudgetsContext = createContext()

export const budgetsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                //activeUser: state.activeUser.findOne((transaction) => transaction._id !== action.payload._id)
                activeUser: action.payload
            }
        case 'SET_BUDGETS':
            return {
                budgets: action.payload
            }
        case 'CREATE_BUDGET':
            return {
                budgets: [action.payload, ...state.budgets]
            }
        case 'DELETE_BUDGET':
            return {
                budgets: state.budgets.filter((transaction) => transaction._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const BudgetsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(budgetsReducer, {
        budgets: null,
        activeUser: null
    })


    // Any components inside this will be effected by this 
    // context, and since we put the entire Application inside
    // the context will effect the entire program.
    return (
        <BudgetsContext.Provider value={{...state, dispatch}}>
            {children}
        </BudgetsContext.Provider>
    )
}