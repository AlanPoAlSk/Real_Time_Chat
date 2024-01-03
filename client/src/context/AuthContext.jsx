import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [regError, setRegError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        image: 'null'
    })

    const [loginInfo, setLoginInfo] = useState({
        
        email: '',
        password: '',
        
    })

    const navigate = useNavigate();
    // console.log('registerInfo', registerInfo);

    // console.log('user', user )
    
    useEffect(() => {
        const user = localStorage.getItem('user')
        
        
        if (user) {
            setUser(JSON.parse(user));
            console.log('user', JSON.parse(user)); // Log only when user is available
        }
        
    }, []);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, []);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, []);

    const loginUser = (userData) => {
        setUser(userData);
    };

    const logoutUser = useCallback(() => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/'); // Redirect to the homepage after logout
    }, []);


    return (
    <AuthContext.Provider
        value={{ 
            user,
            registerInfo,
            updateRegisterInfo,
            logoutUser,
            loginInfo,
            updateLoginInfo,
            loginUser,
            }}
        >
        {children}
    </AuthContext.Provider>
    );
}