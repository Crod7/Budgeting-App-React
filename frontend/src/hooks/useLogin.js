/**
 * PURPOSE:
 * Handles what happends when the login button from the Login screen is pushed.
 */

import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavbarContext } from './useNavbarContext'
import { generateDateId } from '../functions/GenerateDateId'
import { useMonthlyNetBalanceContext } from './useMonthlyNetBalanceContext'
/**
 * This is the function that will be called when the login button is pressed. It attempts to find
 * a user and validate their information.
 */
export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const { dispatchNavbar } = useNavbarContext()
    const { dispatchMonthlyNetBalance } = useMonthlyNetBalanceContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        /**
         * Logs in and is used in creating the json web token. If the login is invalid it will return an error message.
         * @json is the actual web token.
         */
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        /**
         * Using the email used to login, we fetch the user with the corresponding email. Later we will update the navbar context
         * with this @jsonNavbar because it holds the current user.
         */
        const responseNavbar = await fetch(`/api/user/${email}`, {})
        const jsonNavbar = await responseNavbar.json()

        /**
         * Incase any of the login credentials are invalid or don't exists, we throw an error.
         */
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        /**
         * Valid login.
         */
        if (response.ok) {
            /**
             * This part gets the current dateId and uses it to grab the user's current monthlyNetBalance
             * document from the database. The monthlyNetBalance context must be updated before the user context
             * to resolve the flicker glitch(Where information of another user is displayed before
             * flickering into the current user's information).
             */
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

            /**
             * Save the user to local storage(This is the json web token with the email).
             * This allows the user to remain logged in, even if they close the page.
             */
            localStorage.setItem('user', JSON.stringify(json))
            
            /**
             * Update the Auth Context.
             */
            dispatch({type: 'LOGIN', payload: json})

            /**
             * Update the Navbar Context with the user info we got from @jsonNavbar . This was fetched earlier when we used
             * the email to find the corresponding user.
             */
            for (let i = 0; i < jsonNavbar.length; i++){
                if (email === jsonNavbar[i].email){
                    dispatchNavbar({type: 'UPDATE_NAVBAR', payload: jsonNavbar[i]})
                }
            }

            /**
             * Set loading state back to normal.
             */
            setIsLoading(false)
        }
    }
    return { login, isLoading, error}
}
