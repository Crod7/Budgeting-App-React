import { createContext, useReducer } from "react"

export const MonthlyExpenseContext = createContext()


export const monthlyExpenseReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_MONTHLYEXPENSE':
            return {
                monthlyExpense: [action.payload, ...state.monthlyExpense]
            }
        case "UPDATE_MONTHLYEXPENSE":
            return {
                //monthlyExpense: [action.payload, ...state.monthlyExpense]
                monthlyExpense: action.payload
            }
        default:
            return state
    }
}

export const MonthlyExpenseContextProvider = ({children}) => {
    const [state, dispatchMonthlyExpense] = useReducer(monthlyExpenseReducer, {
        monthlyExpense: [],
    })


    /**
     * Any components inside this will be effected by this 
     * context, and since we put the entire Application inside
     * the context will effect the entire program.
     */
    return (
        <MonthlyExpenseContext.Provider value={{...state, dispatchMonthlyExpense}}>
            {children}
        </MonthlyExpenseContext.Provider>
    )
}