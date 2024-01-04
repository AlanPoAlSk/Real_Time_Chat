import { useEffect, useState } from 'react';
import RegisterComponent from '../pages/RegisterPage';
import LoginComponent from '../pages/LoginPage';

const WelcomeMessage = () => {
    return (
        <div className="text-center mt-10 w-96">
            <h1 className="text-5xl font-extrabold text-blue-600 dark:text-yellow-400">
                Welcome to <br/> Chat Chit
            </h1>
            <img
                className="mx-auto h-25 w-auto"
                src="/3794420-200.png"
                alt="Chat Chit AS"
            />
        </div>
    );
};

const Authentication = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const currentTheme = localStorage.getItem('color-theme');
        setIsDarkTheme(currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches));
    }, []);

    const switchPage = () => {
        setShowLogin(!showLogin); // Toggle between login and register pages
    };

    const handleClick = () => {
        const currentTheme = localStorage.getItem('color-theme');
        if (currentTheme === 'dark') {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            setIsDarkTheme(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            setIsDarkTheme(true);
        }
    };

    return (
        <div className="authentication-container flex h-screen">
            <div className="w-1/2 flex flex-col justify-between"> {/* Left-side content */}
                <div className="flex justify-start items-center mt-4 ml-4"> {/* Button in the top-left corner */}
                    <button
                        id="theme-toggle"
                        type="button"
                        className="text-gray-700 bg-yellow-300 dark:bg-gray-100 dark:text-gray-400 hover:bg-yellow-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-yellow-400 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                    >
                        {isDarkTheme ? (
                            <svg
                                onClick={handleClick}
                                id="theme-toggle-dark-icon"
                                className="w-7 h-7"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                                ></path>
                            </svg>
                        ) : (
                            <svg
                                onClick={handleClick}
                                id="theme-toggle-light-icon"
                                className="w-8 h-8"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        )}
                    </button>
                </div>
                <div className="flex justify-center items-center h-full">
                    <div className="max-w-md">
                        <div className="flex flex-col items-center mb-14 dark:bg-gray-800"> {/* Centering welcome message */}
                            <WelcomeMessage />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 flex justify-center items-center"> {/* Right-side content */}
                <div className="max-w-md">
                    {showLogin ? (
                        <LoginComponent switchPage={switchPage} />
                    ) : (
                        <RegisterComponent switchPage={switchPage} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Authentication;
