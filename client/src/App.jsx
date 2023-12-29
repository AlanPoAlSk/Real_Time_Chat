import { useContext, useState } from 'react'
import MainPage from './pages/MainPage';
import {Route, Routes, Navigate} from 'react-router-dom'
import Authentication from './components/Authentication';
import { AuthContext } from './context/AuthContext';

// import './App.css'

function App() {

  const [showLogin, setShowLogin] = useState(true);

  const{user} = useContext(AuthContext)

    const switchPage = () => {
        setShowLogin(!showLogin); // Toggle between login and registration pages
    };

  return (
    <>
        <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/auth/user" /> : <Authentication />  }
        />
        <Route path="/auth/user" element={<MainPage />} />
            {/* Route for the main page */}
            {/* <Route path="/main" element={<MainPage />} /> */}
        </Routes>
    </>
  )
}

export default App
