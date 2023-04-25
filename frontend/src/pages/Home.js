import { useEffect } from "react"
import { useBudgetsContext } from "../hooks/useBudgetContext"
import { useAuthContext } from "../hooks/useAuthContext"

// Components 
import BudgetDetails from '../components/BudgetDetails'
import BudgetForm from '../components/BudgetForm'




const Home = () => {
    const {budgets, dispatch} = useBudgetsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchBudgets = async () => {
            const response = await fetch('/api/budgets', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })                                          // By changing the package.json proxy parameter
                                                        // in the FRONTEND folder to the localhost of the
                                                        // BACKEND folder, we can connect them together.
            const json = await response.json()
            
            if (response.ok){
                dispatch({type: 'SET_BUDGETS', payload: json})
            }
        }
        //============================================

        const fetchUsers = async () => {
            const response = await fetch(`/api/user/${user.email}`, {
                headers: {'Authorization': `Bearer ${user.token}`},
            })                                          // By changing the package.json proxy parameter
                                                        // in the FRONTEND folder to 
                                                        // the localhost of the
                                                        // BACKEND folder, we can connect them together.
            const json = await response.json()
            if (response.ok){
                for (let i = 0; i < json.length; i++){
                    //console.log(json[i])
                    if (user.email === json[i].email){
                        //activeUser = json[i]
                        //console.log(activeUser.firstName)
                        dispatch({type: 'SET_USER', payload: json[i]})

                    }
                }
            }
        }
        //============================================

        
        if (user){
            fetchBudgets()
            fetchUsers()
        }
    }, [dispatch, user])


    return (                                               // We return all the budgets in our DB to the homepage
                                                           // In this case we are grabbing just the title of each
                                                           // budget item by using their id (budget._id)
        <div className="home">
            <div className="budgets">
                {budgets && budgets.map((budget) => (
                    <BudgetDetails key={budget._id} budget={budget}/>
                ))}
            </div>
            <BudgetForm />
        </div>
    )
}

export default Home
