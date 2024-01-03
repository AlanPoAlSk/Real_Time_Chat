import { useState, useContext } from 'react';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// import validator from'validator';


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

    // const handleInputChange = (e) => {
    //     if (e.target.type === 'file') {
    //         // For file input, store the selected file in formData
    //         setFormData({ ...formData, image: e.target.files[0] });
    //     } else {
    //         // For other inputs, update form data state
    //         setFormData({ ...formData, [e.target.name]: e.target.value });
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!registerInfo.firstName || !registerInfo.lastName || !registerInfo.email || !registerInfo.password) {
        //     setRegError('Please provide all the required fields');
        //     return;
        // }
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
                {regErrors.form && <p style={{ color: 'red' }}>{regErrors.form}</p>}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <div className="flex items-center justify-between">
                            {regErrors.firstName && <p style={{ color: 'red' }}>{regErrors.firstName}</p>}
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                First Name
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                name='firstName'
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, firstName: e.target.value })}
                                autoComplete="firstName"
                                // required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            {regErrors.lastName && <p style={{ color: 'red' }}>{regErrors.lastName}</p>}
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Last Name
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                name='lastName'
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, lastName: e.target.value })}
                                autoComplete="lastName"
                                // required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            {regErrors.email && <p style={{ color: 'red' }}>{regErrors.email}</p>}
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="email"
                                name='email'
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
                                autoComplete="email"
                                // required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            {regErrors.password && <p style={{ color: 'red' }}>{regErrors.password}</p>}
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                name='password'
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
                                autoComplete="current-password"
                                // required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Add image
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="file"
                                name='image'
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, image: e.target.value })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?{' '}
                    <span style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }} onClick={switchPage}>
                        Log In!
                    </span>
                </p>
            </div>
        </div>
        // <div className='regContainer'>
        //     <div className='regWrapper'>
        //         <span className="logo">Chat-Chit</span>
        //         <span className="title">Register</span>
        //         {/* <span class="title">{user.name}</span> */}

        //         {regErrors.form && <p style={{ color: 'red' }}>{regErrors.form}</p>}
        //         <form onSubmit={handleSubmit}>
        //             {regErrors.firstName && <p style={{ color: 'red' }}>{regErrors.firstName}</p>}
        //             <input
        //                 type="text"
        //                 name='firstName'
        //                 placeholder='First Name'
        //                 onChange={(e) => updateRegisterInfo({ ...registerInfo, firstName: e.target.value })}
        //                 className="border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
        //             />
        //             {regErrors.lastName && <p style={{ color: 'red' }}>{regErrors.lastName}</p>}
        //             <input
        //                 type="text"
        //                 name='lastName'
        //                 placeholder='Last Name'
        //                 onChange={(e) => updateRegisterInfo({ ...registerInfo, lastName: e.target.value })}
        //                 className="border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
        //             />
        //             {regErrors.email && <p style={{ color: 'red' }}>{regErrors.email}</p>}
        //             <input
        //                 type="email"
        //                 name='email'
        //                 placeholder='Email'
        //                 onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
        //                 className="border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
        //             />
        //             <input
        //                 type="password"
        //                 name='password'
        //                 placeholder='Password'
        //                 onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
        //                 className="border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
        //             />
        //             <label style={{ display: 'flex' }} className="mt-2">
        //                 Add image
        //                 <input
        //                     type="file"
        //                     name='image'
        //                     onChange={(e) => updateRegisterInfo({ ...registerInfo, image: e.target.value })}
        //                     className="ml-2"
        //                 />
        //             </label>
        //             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Sign up</button>
        //         </form>
        //         <p>You have an account?{' '}
        //             <span className="cursor-pointer underline text-blue-500" onClick={switchPage}>
        //                 Login!
        //             </span>
        //         </p>
        //     </div>
        // </div>

    );
};

export default RegisterComponent;
