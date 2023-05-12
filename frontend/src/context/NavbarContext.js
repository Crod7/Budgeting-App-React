

import { createContext, useReducer } from "react"

export const NavbarContext = createContext()

export const navbarReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                //activeUser: state.activeUser.findOne((transaction) => transaction._id !== action.payload._id)
                activeUser: action.payload
            }
        case 'UPDATE_NAVBAR':
            return {
                activeUser: action.payload
            }
        case 'UPDATE_MONTHLYNETBALANCE':
            return {
                monthlyNetBalance: action.payload
            }
        default:
            return state
    }
}

export const NavbarContextProvider = ({children}) => {
    const [state, dispatchNavbar] = useReducer(navbarReducer, {
        activeUser: null,
        monthlyNetBalance: null
    })


    // Any components inside this will be effected by this 
    // context, and since we put the entire Application inside
    // the context will effect the entire program.
    return (
        <NavbarContext.Provider value={{...state, dispatchNavbar}}>
            {children}
        </NavbarContext.Provider>
    )
}