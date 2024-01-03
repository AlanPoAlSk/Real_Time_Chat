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
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"

                    alt="Your Company"
                />
                {/* <h1>Chat - Chit</h1>
                <img src="/3794420-200.png" alt="" /> */}
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                            <input
                                type="email"
                                name='email'
                                // placeholder='Email'
                                value={formData.email}
                                onChange={handleInputChange}
                                autoComplete="email"
                                // required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                name='password'
                                // placeholder='Password'
                                value={formData.password}
                                onChange={handleInputChange}
                                autoComplete="current-password"
                                // required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <span style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }} onClick={switchPage}>
                        Register!
                    </span>
                </p>
            </div>
        </div>
        // <div className='logContainer'>
        //     <div className='logWrapper'>
        //         <span className="logo">Chat-Chit</span>
        //         <span className="title">Login</span>
        //         <form onSubmit={handleSubmit}>
        //             {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        //             <input
        //                 type="email"
        //                 name='email'
        //                 placeholder='Email'
        //                 value={formData.email}
        //                 onChange={handleInputChange}
        //                 className="border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
        //             />
        //             <input
        //                 type="password"
        //                 name='password'
        //                 placeholder='Password'
        //                 value={formData.password}
        //                 onChange={handleInputChange}
        //                 className="border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
        //             />
        //             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Sign in</button>
        //         </form>
        //         <p>You don't have an account?{' '}
        //             <span style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }} onClick={switchPage}>
        //                 Register!
        //             </span>
        //         </p>
        //     </div>
        // </div>

    );
};

export default LoginComponent;
