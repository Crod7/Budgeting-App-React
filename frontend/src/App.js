import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'


//pages and componenets
import Home from './components/Home'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import Setup from './components/Setup'



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
                element={user ? <Home />: <Navigate to ="/login" />}
              />
              <Route 
                path="/login"
                element={!user ? <Login />: <Navigate to ="/" />}
              />
              <Route 
                path="/signup"
                element={!user ? <Signup />: <Navigate to ="/"/>}
              />
              <Route 
                path="/setup"
                element={(user) ? <Setup />: <Navigate to ="/"/>}

              />
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
