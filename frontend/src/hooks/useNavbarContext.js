import { NavbarContext } from "../context/NavbarContext"
import { useContext } from "react"

export const useNavbarContext = () => {
    const context = useContext(NavbarContext)

    if (!context){
        throw Error('useBudgetsContext must be used inside an BudgetsContextProvider')
    }

    return context
}