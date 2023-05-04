/**
 * PURPOSE:
 * This is the Home page. It displays all of the users transactions for this month as well 
 * as a form to enter new transactions.
 */
import { useEffect } from "react"
import { useBudgetsContext } from "../hooks/useBudgetContext"
import { useAuthContext } from "../hooks/useAuthContext"
import BudgetDetails from '../components/BudgetDetails'
import BudgetForm from '../components/BudgetForm'



/**
 * This manages the home page by making fetch requests to the database in order to keep the 
 * transactions and current user up to date.
 * @returns the frontend user interface. Including the transactions and transaction form.
 */
const Home = () => {
    const {budgets, dispatch} = useBudgetsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        /**
         * This loads up the transactions for this month.
         */
        const fetchBudgets = async () => {
            const response = await fetch('/api/budgets', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()
            
            if (response.ok){
                dispatch({type: 'SET_BUDGETS', payload: json})
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
            fetchBudgets()
            fetchUsers()
        }
    }, [dispatch, user])

    /**
     * Manages what is returned to the home page for the user to see.
     */
    return (
        <div className="home">
            <div className="budgets">
                {budgets && budgets.map((budget) => (
                    <BudgetDetails key={budget._id} budget={budget}/>
                ))}
            </div>
            <BudgetForm />
        </div>
    )
}

export default Home
