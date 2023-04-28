import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

import { useAuthContext } from '../hooks/useAuthContext'
import { useNavbarContext } from "../hooks/useNavbarContext"
import { useEffect } from "react"



// This imports the active user if logged in, along with all their data(firstName, email, budget, etc...)

const Navbar = (globalUser) => {
    const {dispatchNavbar, activeUser} = useNavbarContext()
    const {user} = useAuthContext()
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`/api/user/${user.email}`, {})
            const json = await response.json()
            
            if (response.ok){
                for (let i = 0; i < json.length; i++){
                    if (user.email === json[i].email){
                        dispatchNavbar({type: 'SET_USER', payload: json[i]})
                    }
                }
            }
        }

        if (user && !activeUser){
            fetchUsers()
        }
    }, [dispatchNavbar, user, globalUser, activeUser])

    // Here we set the global user that is currently logged in. We use this
    // to display information on the navbar
    if (activeUser != null){
        console.log(activeUser)
        globalUser = activeUser
        //console.log(globalUser.firstName)             This verifies that the user is set to global
    }






    const { logout } = useLogout()

    const handleLogoutButton = () =>{
        logout()
    }
    const handleSetupButton = () =>{
        localStorage.setItem('user.isOnSetupPage', 'true')
        console.log(localStorage.getItem('user'))
    }

    return (
        <header>
            <div className="container">
                {user && (
                    <Link to="/">
                        <h1>$: {globalUser.balance}</h1>
                    </Link>
                )}
                <nav>
                    {user && (
                        <div>
                            <span>Hello {globalUser.firstName}</span>
                            <button onClick={handleLogoutButton}>Log out</button>
                            <button onClick={handleSetupButton}>Manage Monthly Budget</button>
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
