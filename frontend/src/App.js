import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'


//pages and componenets
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'



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
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
