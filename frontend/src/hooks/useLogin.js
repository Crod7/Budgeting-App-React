import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()                  // Will return a json web token, or an error message
        //console.log(response)
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            //console.log("hi")
            //const userObject = JSON.stringify(json)
            //console.log(userObject + "TEST 1==============")
            //console.log(userObject._id + "id==========")
            //console.log(userObject.firstName + "firstName==========")


            // Save the user to local storage(This is the json web token with the email)
            // This allows the user to remain logged in, even if they close the page
            localStorage.setItem('user', JSON.stringify(json))
            
            // Update the Auth Context
            dispatch({type: 'LOGIN', payload: json})
            
            // Set loading state back to normal
            setIsLoading(false)
        }
    }

    return { login, isLoading, error}
}
