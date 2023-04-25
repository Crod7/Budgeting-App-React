import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavbarContext } from './useNavbarContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const { dispatchNavbar } = useNavbarContext()

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

        //========================= This updates the user on the Navbar by making a GET request
        const responseNavbar = await fetch(`/api/user/${email}`, {})
        const jsonNavbar = await responseNavbar.json()
        //========================
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

            // Update the Navbar Context
            for (let i = 0; i < jsonNavbar.length; i++){
                if (email === jsonNavbar[i].email){
                    dispatchNavbar({type: 'UPDATE_NAVBAR', payload: jsonNavbar[i]})
                }
            }            
            // Set loading state back to normal
            setIsLoading(false)
        }
    }
    return { login, isLoading, error}
    
}
