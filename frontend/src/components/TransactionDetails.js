import { useTransactionsContext } from "../hooks/useTransactionContext"
import { useAuthContext } from "../hooks/useAuthContext"

// data fns framework import
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const TransactionDetails = ({transaction}) => {
    const { dispatch } = useTransactionsContext()
    const { user } = useAuthContext()

    const handleClick = async () =>{
        if (!user){                 // Error handling checks to see if your logged in
            return
        }
        //                          We call the api, with the transaction's id
        const response = await fetch('/api/transactions/' + transaction._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_TRANSACTION', payload: json})
        }
    }

    return (
        <div className="transaction-details">
            <h4>{transaction.title}</h4>
            <p><strong>Withdrawal: </strong>{transaction.withdraw}</p>
            <p>{formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true})}</p>

            <span className = "material-symbols-outlined" onClick={handleClick}>delete</span>

        </div>
    )
}

export default TransactionDetails