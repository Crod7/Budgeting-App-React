// stoped at video 13 at 4:50


import { useState } from "react"
import { useBudgetsContext } from "../hooks/useBudgetContext"



const BudgetForm = () => {

    const { dispatch } = useBudgetsContext()


    const [title, setTitle] = useState('')
    const [withdraw, setWithdraw] = useState('')
    const [deposit, setDeposit] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    
    const handleTransactionSubmit = async (e) =>{
        e.preventDefault()

        const budget = {title, withdraw, deposit}

        const response = await fetch('/api/budgets', {
            method: "POST",
            body: JSON.stringify(budget),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const json = await response.json()

        // If the entry is invalid we display an error message
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        // If th entry is valid we clear all the text fields and error messages
        if (response.ok) {
            setError(null)
            setTitle('')
            setWithdraw('')
            setDeposit('')
            setEmptyFields([])

            console.log('new transaction added', json)
            dispatch({type: 'CREATE_BUDGET', payload: json})
        }
    }


    return(
        <form className='create' onSubmit={handleTransactionSubmit}>

            <label>Transaction title:</label>
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                // This is the styling of the error message
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            
            <label>Amount:</label>
            <input
                type='number'
                onChange={(e) => setWithdraw(e.target.value)}
                value={withdraw}
                // This is the styling of the error message
                className={emptyFields.includes('withdraw') ? 'error' : ''}
            />

            <label>Deposit Amount:</label>
            <input
                type='number'
                onChange={(e) => setDeposit(e.target.value)}
                value={deposit}
                // This is the styling of the error message
                className={emptyFields.includes('deposit') ? 'error' : ''}
            />

            <button>Add</button>
            {error && <div className = "error">{error}</div>}
        </form>
    )

}

export default BudgetForm