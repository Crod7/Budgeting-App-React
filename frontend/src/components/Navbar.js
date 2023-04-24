import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// This imports the active user if logged in, along with all their data(firstName, email, budget, etc...)

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

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
                            <span>Hello {user.firstName}</span>
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
