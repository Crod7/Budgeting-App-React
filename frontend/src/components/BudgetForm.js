import { useState } from "react"
import { useBudgetsContext } from "../hooks/useBudgetContext"



const BudgetForm = () => {

    const { dispatch } = useBudgetsContext()


    const [title, setTitle] = useState('')
    const [withdraw, setWithdraw] = useState('')
    const [deposit, setDeposit] = useState('')

    const [error, setError] = useState(null)

    
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

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            setTitle('')
            setWithdraw('')
            setDeposit('')

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
            />
            
            <label>Amount:</label>
            <input
                type='number'
                onChange={(e) => setWithdraw(e.target.value)}
                value={withdraw}
            />

            <label>Deposit Amount:</label>
            <input
                type='number'
                onChange={(e) => setDeposit(e.target.value)}
                value={deposit}
            />

            <button>Add</button>
            {error && <div className = "error">{error}</div>}
        </form>
    )

}

export default BudgetForm