import { createContext, useReducer } from "react"

export const MonthlyNetBalanceContext = createContext()

/**
 * This creates a new monthlyNetBalance document when called from a dispatch.
 */
export const monthlyNetBalanceReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_MONTHLYNETBALANCE':
            return {
                monthlyNetBalance: [action.payload, ...state.monthlyNetBalance]
            }
        case 'UPDATE_MONTHLYNETBALANCE':
            return {
                monthlyNetBalance: action.payload
            }
        default:
            return state
    }
}

export const MonthlyNetBalanceContextProvider = ({children}) => {
    const [state, dispatchMonthlyNetBalance] = useReducer(monthlyNetBalanceReducer, {
        monthlyNetBalance: [],
    })


    /**
     * Any components inside this will be effected by this 
     * context, and since we put the entire Application inside
     * the context will effect the entire program.
     */
    return (
        <MonthlyNetBalanceContext.Provider value={{...state, dispatchMonthlyNetBalance}}>
            {children}
        </MonthlyNetBalanceContext.Provider>
    )
}