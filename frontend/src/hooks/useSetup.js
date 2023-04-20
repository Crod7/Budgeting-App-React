import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSetup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const setup = async (firstName, lastName, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName, lastName, email, password})
        })
        const json = await response.json()                  // Will return a json web token, or an error message

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // Save the user to local storage(This is the json web token with the email)
            // This allows the user to remain logged in, even if they close the page
            localStorage.setItem('user', JSON.stringify(json))
            
            // Update the Auth Context
            dispatch({type: 'LOGIN', payload: json})
            
            // Set loading state back to normal
            setIsLoading(false)
        }
    }

    return { setup, isLoading, error}
}
