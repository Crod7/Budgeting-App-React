import { useAuthContext } from './useAuthContext'
import { generateDateId } from '../functions/GenerateDateId'

/**
 * The useSet up exports the setup fucntion called by the Setup page. Used in the creation
 * of a user's monthlyNetBalance document.
 * @returns The function that is used to create the document.
 */
export const useSetup = () => {
    /**
     * We grab the localstorage user. This is the current user logged in. We only have their email but we
     * can make a GET request using their email to grab the rest of the user's information.
     */
    const {user} = useAuthContext()

    /**
     * This is the function called by the Setup page, and it uses all the varaibles entered
     * to calculate how much money the user has left over after all expenses have been deducted.
     * I did not include @params because they are self-explanatory.
     */
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
        /**
         * This is the GET request, grabs all user information from the database and organizes
         * them in an array as const json. Request for user info doesn't require auth token.
         */
        const response = await fetch(`/api/user/${user.email}`, {})                                          
        const json = await response.json()
        /**
         * Will iterate through the array of users until the current email from the local storage
         * matches a user's email from the array. When it does we grab that user because it is our
         * current user's data.
         */
        if (response.ok){
            for (let i = 0; i < json.length; i++){
                if (user.email === json[i].email){
                    /***
                     * This is where we grab the user and use their user_id to link the net balance to them.
                     */
                    let currentUser = json[i]
                    /***
                     * This is where we calculate the net balance from all of the user's expenses.
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

                    /**
                     * Once the new document is created, we send the user back to the main page.
                     */
                    window.location.replace('http://localhost:3000/');

                }
            }
        }
    }
    return { setup }
}
