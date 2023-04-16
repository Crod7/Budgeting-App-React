import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'



const Navbar = () => {
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
                    <button onClick={handleLogoutButton}>Log out</button>
                    <div>
                        <Link to='/login'>Login</Link>
                        <Link to="/signup">Sign up</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
