/**
 * PURPOSE:
 * This is the Home page. It displays all of the users transactions for this month as well 
 * as a form to enter new transactions.
 */
import { useEffect } from "react"
import { useTransactionsContext } from "../hooks/useTransactionContext"
import { useAuthContext } from "../hooks/useAuthContext"
import TransactionDetails from '../components/TransactionDetails'
import TransactionForm from '../components/TransactionForm'



/**
 * This manages the home page by making fetch requests to the database in order to keep the 
 * transactions and current user up to date.
 * @returns the frontend user interface. Including the transactions and transaction form.
 */
const Home = () => {
    const {transactions, dispatch} = useTransactionsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        
        /**
         * This loads up the transactions for this month.
         */
        const fetchTransactions = async () => {
            const response = await fetch('/api/transactions', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()
            
            if (response.ok){
                dispatch({type: 'SET_TRANSACTIONS', payload: json})
            }
        }
        /**
         * This ensures the current user logged in will be represented in the home page. Since we make
         * a call to the backend to retreive the latest data on the current user.
         */
        const fetchUsers = async () => {
            const response = await fetch(`/api/user/${user.email}`, {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()
            if (response.ok){
                for (let i = 0; i < json.length; i++){
                    if (user.email === json[i].email){
                        dispatch({type: 'SET_USER', payload: json[i]})

                    }
                }
            }
        }
        /**
         * If a user is logged in, retreive their data on transactions and user information.
         */
        if (user){
            fetchTransactions()
            fetchUsers()
        }
    }, [dispatch, user])

    /**
     * Manages what is returned to the home page for the user to see.
     */
    return (
        <div className="home">
            <div className="transactions">
                {transactions && transactions.map((transaction) => (
                    <TransactionDetails key={transaction._id} transaction={transaction}/>
                ))}
            </div>
            <div className="transaction-form">
                <TransactionForm />
            </div>
        </div>
    )
}

export default Home
