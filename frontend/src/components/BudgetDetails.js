import { useBudgetsContext } from "../hooks/useBudgetContext"
import { useAuthContext } from "../hooks/useAuthContext"

// data fns framework import
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const BudgetDetails = ({budget}) => {
    const { dispatch } = useBudgetsContext()
    const { user } = useAuthContext()

    const handleClick = async () =>{
        if (!user){                 // Error handling checks to see if your logged in
            return
        }
        //                          We call the api, with the budget's id
        const response = await fetch('/api/budgets/' + budget._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
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
            <p>{formatDistanceToNow(new Date(budget.createdAt), { addSuffix: true})}</p>

            <span className = "material-symbols-outlined" onClick={handleClick}>delete</span>

        </div>
    )
}

export default BudgetDetails