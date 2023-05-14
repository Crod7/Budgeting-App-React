import { MonthlyExpenseContext } from "../context/MonthlyExpenseContext"
import { useContext } from "react"

export const useMonthlyExpenseContext = () => {
    const context = useContext(MonthlyExpenseContext)

    if (!context){
        throw Error('useMonthlyExpenseContext must be used inside an MonthlyExpenseContextProvider')
    }

    return context
}