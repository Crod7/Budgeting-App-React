import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavbarContext } from './useNavbarContext'
import { generateDateId } from '../functions/GenerateDateId'
import { useMonthlyNetBalanceContext } from './useMonthlyNetBalanceContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const { dispatchNavbar } = useNavbarContext()
    const { dispatchMonthlyNetBalance } = useMonthlyNetBalanceContext()
    const { user } = useAuthContext()

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
            //============================
            let currentUserToSetNavbar
            const responseUser = await fetch(`/api/user/${email}`, {})
            const jsonUser = await responseUser.json()
            if (responseUser.ok){
                for (let i = 0; i < jsonUser.length; i++){
                    if (email === jsonUser[i].email){
                        currentUserToSetNavbar = jsonUser[i]
                    }
                }
            }
            const currentDateId = generateDateId()
            const response2 = await fetch(`/api/monthlyNetBalance/`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': `Bearer ${json.token}`
                }
            })
            const json2 = await response2.json()
            if (response2.ok){
                for (let i = 0; i < json2.length; i++){
                    if (currentDateId === json2[i].dateId){
                        console.log(json2[i])
                        dispatchMonthlyNetBalance({type: 'UPDATE_MONTHLYNETBALANCE', payload: json2[i]})

                    }
                }
            }
            
            // Set loading state back to normal
            setIsLoading(false)
        }
    }
    return { login, isLoading, error}
    
}
