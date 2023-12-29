import { useContext, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginComponent = ({switchPage}) => {
    const { loginUser } = useContext(AuthContext);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState('');




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the login endpoint
            const response = await axios.post('http://localhost:8000/auth/login', formData);
            
            console.log('Login successful:', response.data);

             // Store user data in localStorage after successful login
            try {
                localStorage.setItem('user', JSON.stringify(response.data));
                console.log('user data stored in localStorage:', response.data);
            } catch (error) {
                console.error('Error storing user data in localStorage:', error);
            }
            console.log(localStorage)
            loginUser(response.data);

            setLoginSuccess(true);

            // Clear the form after successful login if needed
            setFormData({
                email: '',
                password: ''
            });

            // Handle success: show a success message or redirect the user
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error: display error message to the user
            if (error.response && error.response.status === 400) {
                setLoginError('Invalid credentials');
            } else {
                setLoginError('Something went wrong. Please try again.');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    if (loginSuccess) {
        return <Navigate to="/auth/user" />;
    }


    return (
    <div className='logContainer'>
        <div className='logWrapper'>
            <span className="logo">Chat-Chit</span>
            <span className="title">Login</span>
            <form onSubmit={handleSubmit}>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                <input 
                type="email"
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleInputChange}
                />
                <input 
                type="password"
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleInputChange}
                />
                <button>Sign in</button>
            </form>
            <p>You don't have an account?{' '}
                    <span style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue'}} onClick={switchPage}>
                        Register!
                    </span>
            </p>
        </div>
    </div>
    );
};

export default LoginComponent;
