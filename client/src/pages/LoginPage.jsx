import { useContext, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginComponent = ({ switchPage }) => {
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
        <div className="flex flex-1 flex-col justify-center items-center px-4 py-8 lg:px-8 dark:bg-gray-800">
            <div className="sm:w-full sm:max-w-sm md:max-w-md">
                
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                    <div>
                        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                        <label htmlFor="email" className="block text-xl font-medium leading-6 text-gray-900 dark:text-white">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                autoComplete="email"
                                style={{border: '3px solid black', width: '100%'}} // Adjusted width
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xl font-medium leading-6 text-gray-900 dark:text-white">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                                autoComplete="current-password"
                                style={{border: '3px solid black', width: '100%'}} // Adjusted width
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 font-bold text-center text-xl text-black-700 dark:text-white">
                    Not a member?{' '}
                    <span
                        className="cursor-pointer underline text-blue-500 dark:text-lightBlue-500"
                        onClick={switchPage}
                    >
                        Register!
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginComponent;
