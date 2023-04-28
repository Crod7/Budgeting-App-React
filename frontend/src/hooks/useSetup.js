import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { generateDateId } from '../functions/GenerateDateId'



export const useSetup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    /**
     * We grab the localstorage user. This is the current user logged in. We only have their email but we
     * can make a GET request using their email to grab the rest of the user's information.
     */
    const {user} = useAuthContext()



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
        const response = await fetch(`/api/user/${user.email}`, {
            headers: {'Authorization': `Bearer ${user.token}`},
        })                                          
        const json = await response.json()
        if (response.ok){
            for (let i = 0; i < json.length; i++){
                if (user.email === json[i].email){
                    /***
                     * This is where we grab the user and use their user_id to link the
                     */
                    let currentUser = json[i]
                    dispatch({type: 'SET_USER', payload: json[i]})
                    /***
                     * This is where we calculate the net balance from all of the user's expenses
                     */
                    let totalNetBalance = (income - (
                        housingCost + debtCost + carCost + phoneCost + internetCost +
                        subscriptionCost + insuranceCost + utilityCost + childcareCost
                    ))
                    /***
                     * This grabs the year and month, then combines them to create a Date ID that will
                     * be used in filtering transactions for their respective months.
                     */
                    let dateId = generateDateId()

                    console.log(currentUser._id)
                    console.log(totalNetBalance)
                    console.log(dateId)
                }
            }
        }
    }
    return { setup, isLoading, error}
}
