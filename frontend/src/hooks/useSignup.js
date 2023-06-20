import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavbarContext } from './useNavbarContext'
import { useMonthlyNetBalanceContext } from './useMonthlyNetBalanceContext'
import { generateDateId } from '../functions/GenerateDateId'


export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const { dispatchNavbar } = useNavbarContext()
    const { dispatchMonthlyNetBalance } = useMonthlyNetBalanceContext()


    const signup = async (firstName, lastName, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName, lastName, email, password})
        })
        // Contains user object holding user info, name, and token
        const json = await response.json()                  


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
            //localStorage.setItem('user', JSON.stringify(json))
            
                // Update the Auth Context
            //dispatch({type: 'LOGIN', payload: json})
                // Update the Navbar Context
            //for (let i = 0; i < jsonNavbar.length; i++){
            //    if (email === jsonNavbar[i].email){
            //        dispatchNavbar({type: 'UPDATE_NAVBAR', payload: jsonNavbar[i]})
            //    }
            //}
            const genDateId = generateDateId()
            console.log(`creating dateID ${genDateId}`)
            // Creates an initial budget for the new user for this current month.
            const newNetMonthlyBalance = { balance: 0, dateId: genDateId }
            console.log(`attempting to make POST req, ${newNetMonthlyBalance}`)

            const initResponse = await fetch('/api/monthlyNetBalance', {
                method: 'POST',
                body: JSON.stringify(newNetMonthlyBalance),
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': `Bearer ${json.token}`// This json variable is a web token given to the user on successful login
                }
            })
            const initJson = await initResponse.json()
            console.log(`check initResponse: ${initResponse}`)
            console.log(`checking to see if initJSON worked: ${initJson}`)
            if (initResponse.ok) {
                console.log(`initJSON.ok`)
                //await dispatchMonthlyNetBalance({type: 'CREATE_MONTHLYNETBALANCE', payload: initJson})
            }
            if (!initResponse.ok) {
                console.log(`initJson failed`)
            }





            // Set loading state back to normal
            setIsLoading(false)
            //dispatchMonthlyNetBalance({type: 'UPDATE_MONTHLYNETBALANCE', payload: initJson})

        }
    }

    return { signup, isLoading, error}
}
