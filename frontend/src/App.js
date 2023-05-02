import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'


//pages and componenets
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Setup from './pages/Setup'



function App() {
const {user} = useAuthContext()


  return (
    <div className="App">
        <BrowserRouter>
        <Navbar />
          <div className='pages'>
            <Routes>
              <Route 
                path="/"
                // Do we have a user? TRUE : FALSE
                // If true go to Home
                //                        If false go to Login
                element={user ? <Home />: <Navigate to ="/login" />} //Redirects the user depending on login status
              />
              <Route 
                path="/login"
                element={!user ? <Login />: <Navigate to ="/" />}    //Redirects the user depending on login status
              />
              <Route 
                path="/signup"
                element={!user ? <Signup />: <Navigate to ="/"/>}    //Redirects the user depending on login status
              />
              <Route 
                path="/setup"
                element={(user) ? <Setup />: <Navigate to ="/"/>}    //Redirects the user to Monthly Bills Set Up Page.
                //element={<Setup />}    //Redirects the user to Monthly Bills Set Up Page.

              />
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
