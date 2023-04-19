import { useAuthContext } from "./useAuthContext"
import { useBudgetsContext } from "./useBudgetContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: transactionsDispatch } = useBudgetsContext()

    const logout = () => {
        // removes user from storage
        // The user item holds the login info
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        transactionsDispatch({type: 'SET_BUDGETS', payload: null})
    }

    return {logout}
}