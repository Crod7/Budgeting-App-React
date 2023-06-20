/**
 * PURPOSE:
 * This page takes user input to calculate how much money the user has left after
 * calculating monthly expenses.
 * We also make a GET request and a POST/PATCH request to manage monthlyNetBalance documents from the
 * database.
 * Any monthlyNetBalance document that has matching dateId's overwrites the previous one.
 * We check this by first making a GET request, if we find something with the same dateId we make
 * a PATCH request. If nothing is found we make a POST request.
 */
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { generateDateId } from '../functions/GenerateDateId'
import { useAuthContext } from '../hooks/useAuthContext'
import { useMonthlyNetBalanceContext } from '../hooks/useMonthlyNetBalanceContext'

const Setup = () => {
    /**
     * Import of variables.
     */
    const navigate = useNavigate()
    const [income, setIncome] = useState('')
    const [housingCost, setHousingCost] = useState('')
    const [debtCost, setDebtCost] = useState('')
    const [carCost, setCarCost] = useState('')
    const [phoneCost, setPhoneCost] = useState('')
    const [internetCost, setInternetCost] = useState('')
    const [subscriptionCost, setSubscriptionCost] = useState('')
    const [insuranceCost, setInsuranceCost] = useState('')
    const [utilityCost, setUtilityCost] = useState('')
    const [childcareCost, setChildcareCost] = useState('')
    const { user } = useAuthContext()
    const { dispatchMonthlyNetBalance } = useMonthlyNetBalanceContext()
    /**
     * When the submit button is pressed on the Setup page.
     */
    const handleSubmit = async (e) =>{
        /**
         * Disables the refresh of a page caused by submitting a form.
         */
        e.preventDefault()
        /**
         * Gets the total money left after subtracting expenses.
         */
        const balance = (Number(income) - (
            Number(housingCost) + Number(debtCost) + Number(carCost) + Number(phoneCost) + Number(internetCost) +
            Number(subscriptionCost) + Number(insuranceCost) + Number(utilityCost) + Number(childcareCost)
        ))
        /**
         * This grabs the year and month, then combines them to create a Date ID that will
         * be used in filtering transactions for their respective months.
         */
        const dateId = generateDateId()

        /**
         * We make a GET request to retrieve all monthlyNetBalance documents associated with the current user.
         * The request is placed inside the jsonChecked const which is an array holding all documents returned.
         */
        const checked = await fetch (`/api/monthlyNetBalance`,{
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const jsonChecked = await checked.json()
        /**
         * We iterate through the jsonChecked array and if the document's dateId at index i is equal to the dateId of the current
         * month/year we replace that document. If no dateId matches the current dateId we create a new document. This is to
         * ensure we only have one document per month as having multiple budgets for the same month would cause errors. 
         */
        for(let i = 0; i < jsonChecked.length; i++){
            if (jsonChecked[i].dateId === dateId){
                /**
                 * A document does exist matching the dateId and user_id. Therefore,
                 * makes a PATCH request to update the monthlyNetBalance document.
                 * The update the document, we grab the documents _id (since it has a matching dateId
                 * meaning it is unique).
                 */
                const documentId = jsonChecked[i]._id
                /**
                 * Now we make the PATCH request.
                 */
                const response = await fetch(`/api/monthlyNetBalance/${documentId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        "balance": balance 
                    }),
                    headers: {
                        "Content-Type": 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                if (response.ok) {
                    await dispatchMonthlyNetBalance({type: 'UPDATE_MONTHLYNETBALANCE', payload: json})
                }
            }else{
                /**
                 * No documents with the current dateId exists that belong to this user. Therefore,
                 * makes a POST request to make the new monthlyNetBalance document.
                 */
                const newNetMonthlyBalance = { balance, dateId }
                const response = await fetch('/api/monthlyNetBalance', {
                    method: 'POST',
                    body: JSON.stringify(newNetMonthlyBalance),
                    headers: {
                        "Content-Type": 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                if (response.ok) {
                    await dispatchMonthlyNetBalance({type: 'CREATE_MONTHLYNETBALANCE', payload: json})
                }
            }
        }
        /**
         * There is a case that when the user has never made a monthlyNetBalance document before,
         * the for loop above is skipped. This causes an error, as this means a user can only
         * create a document if they've created a document in the past. To fix this error, we add
         * a special "if" case stating that if this is the first monthlyNetBalance document the user has
         * ever created, then run this POST request. Any future creations/ updates will be managed
         * by the for loop.
         */
        if (jsonChecked.length === 0){
            const newNetMonthlyBalance = { balance, dateId }
            const response = await fetch('/api/monthlyNetBalance', {
                method: 'POST',
                body: JSON.stringify(newNetMonthlyBalance),
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                await dispatchMonthlyNetBalance({type: 'CREATE_MONTHLYNETBALANCE', payload: json})
            }
        }
        /**
         * Using the user retrieved from the database, we use their token and the current dateId to grab the corresponding
         * monthlyNetBalance document. This holds their budget information for this month and it is displayed on the navbar.
         */
        const response = await fetch(`/api/monthlyNetBalance/`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (response.ok){
            for (let i = 0; i < json.length; i++){
                /**
                 * If the monthlyNetBalance is found we update the navbar to display it.
                 */
                if (dateId === json[i].dateId){
                    dispatchMonthlyNetBalance({type: 'UPDATE_MONTHLYNETBALANCE', payload: json[i]})
                }
            }
        }
        /**
         * Once the new document is created, we send the user back to the main page.
         */
        navigate('/')
    }

    return (
        /**
         * This manages the front-end displaying many text fields for the user to fill.
         * The classname is signup because we follow the same css format.
         */
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Let's get your budget set up!</h3>

            <label>Monthly Income:</label>
            <input
                type='number'
                placeholder="Total Monthly Net Income"
                onChange={(e) => setIncome(e.target.value)}
                value={income}
            />
            <label>Rent/ Mortgage:</label>
            <input
                type='number'
                placeholder="Total Housing Cost"
                onChange={(e) => setHousingCost(e.target.value)}
                value={housingCost}
            />
            <label>Debt Payments:</label>
            <input
                type='number'
                placeholder="Total from Credit Cards, Loans etc."
                onChange={(e) => setDebtCost(e.target.value)}
                value={debtCost}
            />
            <label>Car Payments:</label>
            <input
                type='number'
                placeholder="Car Payments from a Lease or Loan"
                onChange={(e) => setCarCost(e.target.value)}
                value={carCost}
            />
            <label>Phone Bill:</label>
            <input
                type='number'
                placeholder="Total from all Phone bills"
                onChange={(e) => setPhoneCost(e.target.value)}
                value={phoneCost}
            />
            <label>Internet Bill:</label>
            <input
                type='number'
                placeholder="Internet bill"
                onChange={(e) => setInternetCost(e.target.value)}
                value={internetCost}
            />
            <label>Subscriptions:</label>
            <input
                type='number'
                placeholder="Netflix, Hulu, Cable, etc."
                onChange={(e) => setSubscriptionCost(e.target.value)}
                value={subscriptionCost}
            />
            <label>Insurance:</label>
            <input
                type='number'
                placeholder="Total from Auto/ Health/ Life/ Renter/ etc."
                onChange={(e) => setInsuranceCost(e.target.value)}
                value={insuranceCost}
            />
            <label>Utility:</label>
            <input
                type='number'
                placeholder="Average Gas and Electric Total"
                onChange={(e) => setUtilityCost(e.target.value)}
                value={utilityCost}
            />
            <label>Childcare:</label>
            <input
                type='number'
                placeholder="Such as Daycare or Babysitting"
                onChange={(e) => setChildcareCost(e.target.value)}
                value={childcareCost}
            />
            <h5>You may notice that some expenses are not included, such as gas or groceries. This is because these costs 
                can vary from month to month, so it is better to report them as individual purchases as to have a more accurate 
                reading of your budget.</h5>
            
            <button>Complete</button>
        </form>
    )
}

export default Setup