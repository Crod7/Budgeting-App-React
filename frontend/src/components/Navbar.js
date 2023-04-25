import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import { useBudgetsContext } from "../hooks/useBudgetContext"
import { useEffect } from "react"




// This imports the active user if logged in, along with all their data(firstName, email, budget, etc...)

const Navbar = (globalUser) => {
    const {dispatch, activeUser} = useBudgetsContext()
    const {user} = useAuthContext()
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`/api/user/${user.email}`, {})
            const json = await response.json()
            if (response.ok){
                for (let i = 0; i < json.length; i++){
                    if (user.email === json[i].email){
                        dispatch({type: 'SET_USER', payload: json[i]})
                    }
                }
            }
        }

        if (user && !activeUser){
            fetchUsers()
        }
    }, [dispatch, user, globalUser, activeUser])

    // Here we set the global user that is currently logged in. We use this
    // to display information on the navbar
    if (activeUser != null){
        globalUser = activeUser
        //console.log(globalUser.firstName)             This verifies that the user is set to global
    }






    const { logout } = useLogout()

    const handleLogoutButton = () =>{
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Hello World</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>Hello {globalUser.firstName}</span>
                            <button onClick={handleLogoutButton}>Log out</button>
                            <Link to="/setup">Manage Monthly Bills</Link>

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
