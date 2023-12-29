import { useState, useContext } from 'react';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
// import validator from'validator';


const RegisterComponent = ({ switchPage }) => {
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
        <div className='regContainer'>
            <div className='regWrapper'>
                <span className="logo">Chat-Chit</span>
                <span className="title">Register</span>
                {/* <span className="title">{user.name}</span> */}

                {regErrors.form && <p style={{ color: 'red' }}>{regErrors.form}</p>}
                <form onSubmit={handleSubmit}>
                    {regErrors.firstName && <p style={{ color: 'red' }}>{regErrors.firstName}</p>}
                    <input
                        type="text"
                        name='firstName'
                        placeholder='First Name'
                        onChange={(e) => updateRegisterInfo({ ...registerInfo, firstName: e.target.value })}
                    />
                    {regErrors.lastName && <p style={{ color: 'red' }}>{regErrors.lastName}</p>}
                    <input
                        type="text"
                        name='lastName'
                        placeholder='Last Name'
                        onChange={(e) => updateRegisterInfo({ ...registerInfo, lastName: e.target.value })}
                    />
                    {regErrors.email && <p style={{ color: 'red' }}>{regErrors.email}</p>}
                    <input
                        type="email"
                        name='email'
                        placeholder='Email'
                        onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
                    />
                    <label style={{ display: 'flex' }}>
                        Add image
                        <input
                            type="file"
                            name='image'
                            onChange={(e) => updateRegisterInfo({ ...registerInfo, image: e.target.value })}
                        />
                    </label>
                    <button>Sign up</button>
                </form>
                <p>You have an account?{' '}
                    <span style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }} onClick={switchPage}>
                        Login!
                    </span>
                </p>
            </div>
        </div>
    );
};

export default RegisterComponent;
