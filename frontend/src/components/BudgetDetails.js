import { useBudgetsContext } from "../hooks/useBudgetContext"

const BudgetDetails = ({budget}) => {

    const { dispatch } = useBudgetsContext()

    const handleClick = async () =>{
        //                          We call the api, with the budget's id
        const response = await fetch('/api/budgets/' + budget._id, {
            method: 'DELETE'
        })

        const json = await response.json()
        

        if (response.ok){
            dispatch({type: 'DELETE_BUDGET', payload: json})
        }
    }





    return (
        <div className="budget-details">
            <h4>{budget.title}</h4>
            <p><strong>Withdrawal: </strong>{budget.withdraw}</p>
            <p><strong>Deposit: </strong>{budget.deposit}</p>
            <p>{budget.createdAt}</p>

            <span onClick={handleClick}>Delete</span>

        </div>
    )
}

export default BudgetDetails