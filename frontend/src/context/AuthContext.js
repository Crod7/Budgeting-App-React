// This is meant to be a global variable that lets the frontend know that the user is authenticated

import { createContext, useReducer } from "react"

export const AuthContext = createContext()
// Handles what happens when a user logs in or logs out
export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':               // When a user logs in set global user to that user
            return { user: action.payload}
        case 'LOGOUT':              // On log out set global user to null
            return { user: null}
        default:
            return state            // All other cases, no change occurs to global user
    }
}
                                    // children represents what ever this function wraps inside itself
export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null                  // When a user loads up the website they are not logged in by default
    })

    console.log('AuthContext state', state)
    
    return (
        <AuthContext.Provider vsslue = {{...state, dispatch}}>
            {childern}
        </AuthContext.Provider>
    )
}