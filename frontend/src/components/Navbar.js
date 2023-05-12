import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavbarContext } from "../hooks/useNavbarContext"
import { useMonthlyNetBalanceContext } from "../hooks/useMonthlyNetBalanceContext"

import { useEffect, useRef } from "react"
import { generateDateId } from '../functions/GenerateDateId'

/**
 * Manages the navbar and all it's functionality. It also shows important user information.
 * @param {*} globalUser used to set the current user to a variable to display to the end user.
 * @returns the front-end depending on which button is selected from the navbar.
 */
const Navbar = (globalUser, currentBalance) => {
    const currentBalanceRef = useRef(null);
    console.log(currentBalance.balance)
    /**
     * This allows us to update the navbar in realtime by making dispatch calls to the navbar context directly.
     */
    const {dispatchNavbar, activeUser} = useNavbarContext()
    const { dispatchMonthlyNetBalance, monthlyNetBalance } = useMonthlyNetBalanceContext()
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
        const fetchUsers = async () => {
            const response = await fetch(`/api/user/${user.email}`, {})
            const json = await response.json()
            if (response.ok){
                for (let i = 0; i < json.length; i++){
                    console.log(user.email)
                    if (user.email === json[i].email){
                        console.log(json[i])
                        dispatchNavbar({type: 'SET_USER', payload: json[i]})
                    }
                }
            }
        }
        const fetchMonthlyNetBalance = async () => {
            const currentDateId = generateDateId()
            
            const response = await fetch(`/api/monthlyNetBalance/`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            let check = 1
            if (response.ok){
                if (check = 1){
                for (let i = 0; i < json.length; i++){
                    if (currentDateId === json[i].dateId){
                        //currentBalance = json[i].balance 
                        //console.log(currentBalance)
                        console.log(json[i])
                        dispatchMonthlyNetBalance({type: 'UPDATE_MONTHLYNETBALANCE', payload: json[i]})
                        check = 2
                        //currentBalanceRef.current = json[i].balance 
                        //console.log(currentBalanceRef.current)
                    }
                }
                }
            }
        }
        if (user && (activeUser == null)){
            fetchUsers()
            if ( currentBalance.balance == null){
                fetchMonthlyNetBalance()
                currentBalance.balance = monthlyNetBalance
            }
        }


    }, [ user, globalUser, activeUser, currentBalanceRef.current])
    //currentBalance, dispatchMonthlyNetBalance, dispatchNavbar, monthlyNetBalance

    /**
     * We set the user.
     */
    if (activeUser != null){
        globalUser = activeUser
    }
    if (monthlyNetBalance != null){
            currentBalance = monthlyNetBalance

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
                        <h1>$: {currentBalance.balance}</h1>
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
