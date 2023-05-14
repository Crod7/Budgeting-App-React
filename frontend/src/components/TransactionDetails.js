import { useTransactionsContext } from "../hooks/useTransactionContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useMonthlyExpenseContext } from "../hooks/useMonthlyExpenseContext"
import { generateDateId } from "../functions/GenerateDateId"

// data fns framework import
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const TransactionDetails = ({transaction}) => {
    const { dispatch } = useTransactionsContext()
    const { user } = useAuthContext()
    const { dispatchMonthlyExpense } = useMonthlyExpenseContext()

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

            /**
             * Deleting a transaction updates the remaining balance.
             * This part of the code adds up all current transactions for this user at this month. 
             * It is used later to subtract the user's total balance and all transactions to give
             * the user the remaining amount after each new transaction is added.
             */
            const fetchTransactions = async () => {
                const currentDateId = generateDateId()
                const responseTransactions = await fetch('/api/transactions', {
                    headers: {'Authorization': `Bearer ${user.token}`},
                })
                const jsonTransactions = await responseTransactions.json()
                if (responseTransactions.ok){
                    let totalExpense = 0
                    for (let i = 0; i < jsonTransactions.length; i++)
                        if (currentDateId === jsonTransactions[i].dateId){
                            totalExpense = totalExpense + jsonTransactions[i].withdraw
                        }
                    const monthlyExpensePayload = {balance:totalExpense}
                    dispatchMonthlyExpense({type: "UPDATE_MONTHLYEXPENSE", payload: monthlyExpensePayload})
                }
            }
            fetchTransactions()
            //============================
            
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