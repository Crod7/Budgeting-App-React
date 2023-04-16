// This is meant to be a global variable that lets the frontend know that the user is authenticated

import { createContext, useReducer, useEffect } from "react"

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
    // Only fire the useEffect once, when the component renders(When the app laods) to check if a token exists in
    // local storage(checking to see if a user is still logged in)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        // Log the user in from information at local storage, else keep token null
        if (user){
            dispatch({ type: 'LOGIN', payload: user})
        }
    }, [])

    //Check the token status in console
    //console.log('AuthContext state', state)
    
    return (
        <AuthContext.Provider value = {{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}