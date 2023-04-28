import { useState } from "react"
import { useSetup } from "../hooks/useSetup"


const Setup = () => {
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


    const {setup, error, isLoading} = useSetup()
    
    const handleSubmit = async (e) =>{
        e.preventDefault()                                  // Disables the refresh of a page caused by submitting a form
        
        await setup(
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
        )
    }

    return (
        // The classname is signup because we follow the same css format
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
            
            <button disabled = {isLoading}>Complete</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Setup