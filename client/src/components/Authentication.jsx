import { useState } from 'react';
import RegisterComponent from '../pages/RegisterPage';
import LoginComponent from '../pages/LoginPage';

const Authentication = () => {
    const [showLogin, setShowLogin] = useState(true);

    const switchPage = () => {
        setShowLogin(!showLogin); // Toggle between login and register pages
    };

    return (
        <div className="authentication-container">
            
        {showLogin ? (
            <LoginComponent switchPage={switchPage} />
        ) : (
            <RegisterComponent switchPage={switchPage} />
        )}
        </div>
    );
};

export default Authentication;
