/**
 * PURPOSE:
 * Manages the Login page, handles the form where a user enters their email and password. Then makes
 * a request to the backend (through useLogin in hooks folder) to verify user and update the navbar.
 */

import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    /**
     * What happens when the user attempts to login. The email and password entered on the form is
     * verified.
     */
    const handleSubmit = async (e) =>{
        e.preventDefault()
        await login(email, password)
    }

    /**
     * This is the form displayed to the user.
     */
    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Email:</label>
            <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading}>Log in</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}


export default Login