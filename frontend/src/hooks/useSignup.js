import { useState } from 'react'
import { generateDateId } from '../functions/GenerateDateId'
import { useNavigate } from "react-router-dom"


export const useSignup = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)


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


        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            const genDateId = generateDateId()
            // Creates an initial budget for the new user for this current month.
            const newNetMonthlyBalance = { balance: 0, dateId: genDateId }

            const initResponse = await fetch('/api/monthlyNetBalance', {
                method: 'POST',
                body: JSON.stringify(newNetMonthlyBalance),
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': `Bearer ${json.token}`// This json variable is a web token given to the user on successful login
                }
            })
            if (initResponse.ok) {
                /**
                 * Once the new document is created, we send the user back to the main page.
                 */
                navigate('/login')
            }
            if (!initResponse.ok) {
                console.log(`Sign Up failed.`)
            }





            // Set loading state back to normal
            setIsLoading(false)

        }
    }

    return { signup, isLoading, error}
}
