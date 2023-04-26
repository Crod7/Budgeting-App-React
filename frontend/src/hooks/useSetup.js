import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSetup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const setup = async (
        income,
        housingCost,
        debtCost,
        carCost,
        phoneCost,
        internetCost,
        subscriptionCost,
        insuranceCost,
        utilityCost,
        childcareCost
    ) => {
        let total = (Number(income)) - (
            (Number(housingCost)) +
            (Number(debtCost)) +
            (Number(carCost)) +
            (Number(phoneCost)) +
            (Number(internetCost)) +
            (Number(subscriptionCost)) +
            (Number(insuranceCost)) +
            (Number(utilityCost)) +
            (Number(childcareCost))
        )
        console.log(total)
        console.log(typeof total)
        /*setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                income,
                housingCost,
                debtCost,
                carCost,
                phoneCost,
                internetCost,
                subscriptionCost,
                insuranceCost,
                utilityCost,
                childcareCost
            })
        })
        const json = await response.json()                 

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            
            localStorage.setItem('user', JSON.stringify(json))
            
            dispatch({type: 'LOGIN', payload: json})
            
            setIsLoading(false)
        }*/
    }

    return { setup, isLoading, error}
}
