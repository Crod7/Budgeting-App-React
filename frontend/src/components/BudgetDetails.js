const BudgetDetails = ({budget}) => {
    return (
        <div className="budget-details">
            <h4>{budget.title}</h4>
            <p><strong>Withdrawal: </strong>{budget.withdraw}</p>
            <p><strong>Deposit: </strong>{budget.deposit}</p>
            <p>{budget.createdAt}</p>


        </div>
    )
}

export default BudgetDetails