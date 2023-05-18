import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavbarContext } from "../hooks/useNavbarContext"
import { useMonthlyNetBalanceContext } from "../hooks/useMonthlyNetBalanceContext"
import { useMonthlyExpenseContext } from '../hooks/useMonthlyExpenseContext'

import { useEffect } from "react"
import { generateDateId } from '../functions/GenerateDateId'

/**
 * Manages the navbar and all it's functionality. It also shows important user information.
 * @param {*} globalUser used to set the current user to a variable to display to the end user.
 * @returns the front-end depending on which button is selected from the navbar.
 */
const Navbar = (globalUser, currentBalance, currentExpense) => {
    const currentDateId = generateDateId()

    /**
     * This allows us to update the navbar in realtime by making dispatch calls to the navbar context directly.
     */
    const { dispatchNavbar, activeUser } = useNavbarContext()
    const { dispatchMonthlyNetBalance, monthlyNetBalance } = useMonthlyNetBalanceContext()
    const { dispatchMonthlyExpense, monthlyExpense } = useMonthlyExpenseContext()
    /**
     * We grab the localstorage user. This is the current user logged in. We only have their email but we
     * can make a GET request using their email to grab the rest of the user's information.
     */
    const {user} = useAuthContext()

    /**
     * Using the user from useAuthContext, we update the navbar's context with that user's information after making a GET request
     * for the rest of their data.
     */
    useEffect(() => {
        /**
         * This makes a request using the user from the useAuthContext. The purpose of this is to retrieve all of the user's data
         * found in the database to be used in the navbar.
         */
        const fetchUsers = async () => {
            const response = await fetch(`/api/user/${user.email}`, {})
            const json = await response.json()
            if (response.ok){
                for (let i = 0; i < json.length; i++){
                    //console.log(user.email)
                    if (user.email === json[i].email){
                        //console.log(json[i])
                        dispatchNavbar({type: 'SET_USER', payload: json[i]})
                    }
                }
            }
        }
        /**
         * Using the user retrieved from the database, we use their token and the current dateId to grab the corresponding
         * monthlyNetBalance document. This holds their budget information for this month and it is displayed on the navbar.
         */
        const fetchMonthlyNetBalance = async () => {            
            const response = await fetch(`/api/monthlyNetBalance/`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            //console.log(json)
            let check = 1
            if (response.ok){
                if (check === 1){
                    for (let i = 0; i < json.length; i++){
                        /**
                         * If the monthlyNetBalance is found we update the navbar to display it.
                         */
                        if (currentDateId === json[i].dateId){
                            //console.log(json[i])
                            dispatchMonthlyNetBalance({type: 'UPDATE_MONTHLYNETBALANCE', payload: json[i]})
                            check = 2
                        }
                    }
                }
            }
        }
        /**
         * We need to get all transactions from this month belonging to the user, so that we can subtract it from the 
         * monthlyNetBalance to display how much is left in the user's budget for this month.
         */
        const fetchTransactions = async () => {
            const responseTransactions = await fetch('/api/transactions', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const jsonTransactions = await responseTransactions.json()
            if (responseTransactions.ok){
                let totalExpense = 0
                for (let i = 0; i < jsonTransactions.length; i++)
                    if (currentDateId === jsonTransactions[i].dateId){
                        totalExpense = totalExpense + jsonTransactions[i].withdraw
                    }
                const monthlyExpensePayload = {balance:totalExpense}
                dispatchMonthlyExpense({type: "UPDATE_MONTHLYEXPENSE", payload: monthlyExpensePayload})
            }
        }
        if (user && (activeUser == null)){
            fetchUsers()
            if ( currentBalance.balance == null){
                fetchMonthlyNetBalance()
                fetchTransactions()
                currentBalance.balance = monthlyNetBalance                
            }
        }


    }, [user, globalUser, activeUser, currentBalance, currentExpense, dispatchNavbar, monthlyExpense,
        currentDateId, dispatchMonthlyExpense, dispatchMonthlyNetBalance, monthlyNetBalance])
    //user, globalUser, activeUser, currentBalance, currentExpense, dispatchNavbar, monthlyExpense,
    //currentDateId, dispatchMonthlyExpense, dispatchMonthlyNetBalance, monthlyNetBalance

    /**
     * We set the user.
     */
    if (activeUser != null){
        globalUser = activeUser
    }
    if (monthlyNetBalance != null){
        //console.log(monthlyExpense)
        currentBalance = monthlyNetBalance
        //console.log(currentBalance)

    }
    if (monthlyExpense != null){
        currentExpense = monthlyExpense
    }
    /**
     * We import the logout functionality so if the user selects the logout button on the navbar we can logout the user.
     */
    const { logout } = useLogout()
    const handleLogoutButton = () =>{
        logout()
    }

    /**
     * Returns the current page being displayed to the front-end depending if the user is logged in or not.
     */
    return (
        <header>
            <div className="container">
                {user && (
                    <Link to="/">
                        <h1>$: {monthlyNetBalance.balance - monthlyExpense.balance}</h1>
                    </Link>
                )}
                <nav>
                    {user && (
                        <div>
                            <span>Hello {globalUser.firstName}</span>
                            <button onClick={handleLogoutButton}>Log out</button>
                            <Link to='/setup' className='navButton'>Manage Monthly Budget</Link>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to='/login'>Login</Link>
                            <Link to="/signup">Sign up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar
