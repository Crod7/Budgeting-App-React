import { MonthlyNetBalanceContext } from "../context/MonthlyNetBalanceContext"
import { useContext } from "react"

export const useMonthlyNetBalanceContext = () => {
    const context = useContext(MonthlyNetBalanceContext)

    if (!context){
        throw Error('useMonthlyNetBalanceContext must be used inside an MonthlyNetBalanceContextProvider')
    }

    return context
}