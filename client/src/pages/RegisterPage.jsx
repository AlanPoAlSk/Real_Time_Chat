import { useState, useContext } from 'react';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';



const RegisterComponent = ({ switchPage }) => {
    const navigate = useNavigate();
    const { registerInfo, updateRegisterInfo } = useContext(AuthContext);
    // const [formData, setFormData] = useState({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     password: '',
    //     image: null,
    // });
    const [regErrors, setRegErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        form: '',
    });



    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = { ...regErrors };

        // Basic frontend validation
        if (!registerInfo.firstName) {
            errors.firstName = 'First name is required';
        }
        if (!registerInfo.lastName) {
            errors.lastName = 'Last name is required';
        }
        if (!registerInfo.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(registerInfo.email)) {
            errors.email = 'Invalid email address';
        }
        if (!registerInfo.password) {
            errors.password = 'Password is required';
        } else if (registerInfo.password.length < 6) {
            errors.password = 'Password should be at least 6 characters long';
        }

        if (Object.values(errors).some((error) => error)) {
            setRegErrors(errors);
            return;
        }

        try {
            // Make a POST request to the /register endpoint
            const response = await axios.post('http://localhost:8000/auth/register', registerInfo);

            console.log('Registration successful:', response.data);
            navigate('/auth/user');

            // Clear the form after successful registration
            updateRegisterInfo({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                image: null,
            });
            setRegErrors({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                form: '',
            });
            // Handle success: show a success message or redirect the user
        } catch (error) {
            console.error('Error registering user:', error);
            // Handle error: display error message to the user
            if (error.response && error.response.data) {
                setRegErrors({ ...regErrors, form: error.response.data.message });
            } else {
                setRegErrors({ ...regErrors, form: 'Something went wrong. Please try again.' });
            }
        }
    };

    return (

        <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-8 lg:px-8 dark:bg-gray-800">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* <img
                    className="mx-auto h-25 w-auto"
                    src="/3794420-200.png"
                    
                    alt="Chat Chit AS"
                /> */}
                <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                    Create your Account
                </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                {regErrors.form && <p style={{ color: 'red' }}>{regErrors.form}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <div className="flex items-center justify-between">
                            {regErrors.firstName && <p style={{ color: 'red' }}>{regErrors.firstName}</p>}
                            <label className="block text-xl font-medium leading-6 text-gray-900 dark:text-white">
                                First Name
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                name='firstName'
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, firstName: e.target.value })}
                                autoComplete="firstName"
                                style={{ border: '3px solid black' }}
                                // required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            {regErrors.lastName && <p style={{ color: 'red' }}>{regErrors.lastName}</p>}
                            <label className="block text-xl font-medium leading-6 text-gray-900 dark:text-white">
                                Last Name
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                name='lastName'
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, lastName: e.target.value })}
                                autoComplete="lastName"
                                style={{ border: '3px solid black' }}
                                // required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            {regErrors.email && <p style={{ color: 'red' }}>{regErrors.email}</p>}
                            <label className="block text-xl font-medium leading-6 text-gray-900 dark:text-white">
                                Email address
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="email"
                                name='email'
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
                                autoComplete="email"
                                style={{ border: '3px solid black' }}
                                // required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            {regErrors.password && <p style={{ color: 'red' }}>{regErrors.password}</p>}
                            <label className="block text-xl font-medium leading-6 text-gray-900 dark:text-white">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                name='password'
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
                                autoComplete="current-password"
                                style={{ border: '3px solid black' }}
                                // required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-xl font-medium leading-6 text-gray-900 dark:text-white">
                                Add image
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="file"
                                name='image'
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, image: e.target.value })}
                                style={{ border: '3px solid black' }}
                                className="block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <p className="mt-6 font-bold text-center text-xl text-black-700 dark:text-white">
                    Already a member?{' '}
                    <span
                        className="cursor-pointer underline text-blue-500 dark:text-lightBlue-500"
                        onClick={switchPage}
                    >
                        Log In!
                    </span>
                </p>
            </div>
        </div>

    );
};

export default RegisterComponent;
