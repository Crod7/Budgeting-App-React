/**
 * PURPOSE:
 * Manages the Signup page, accepts a user's info and if the info is valid makes a requesst to the
 * backend to create the new user.
 */
import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()
    
    /**
     * What happens when the user attempts to signup. The information is verified, and the email is checked
     * to ensure no other account has the same email address.
     */
    const handleSubmit = async (e) =>{
        e.preventDefault()
        await signup(firstName, lastName, email, password)
    }

    /**
     * This is the form displayed to the user.
     */
    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>First Name:</label>
            <input
                type='text'
                placeholder="Carlos"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />
            <label>Last Name:</label>
            <input
                type='text'
                placeholder="Rodriguez"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />
            <label>Email:</label>
            <input
                type='email'
                placeholder="Carlos@email.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type='password'
                placeholder="Carlos123!"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            
            <button disabled = {isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup