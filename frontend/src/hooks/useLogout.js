import { useAuthContext } from "./useAuthContext"
import { useTransactionsContext } from "./useTransactionContext"

/**
 * This handles the logout button. It also clears the localstorage, and updates the context for 
 * transactions and the user.
 */
export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: transactionsDispatch } = useTransactionsContext()


    const logout = () => {
        // removes user from storage
        // The user item holds the login info
        localStorage.removeItem('user')



        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        transactionsDispatch({type: 'SET_TRANSACTIONS', payload: null})
    }

    return {logout}
}