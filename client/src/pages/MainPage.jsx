import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import UserChat from '../components/chat/ChatUser';
import PotentialChatsUser from '../components/chat/PotChatsUser';
import Notification from '../components/chat/Notification';

const Main = () => {
    const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } = useContext(ChatContext);
    const { user, logoutUser } = useContext(AuthContext);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [showPotentialChats, setShowPotentialChats] = useState(false); // State to control the visibility of potential chats

    useEffect(() => {
        const currentTheme = localStorage.getItem('color-theme');
        setIsDarkTheme(currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches));
    }, []);

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

    const handleShowPotentialChats = () => {
        setShowPotentialChats(true); // Set the state to display potential chats window
    };

    console.log(user);

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <div className="bg-gray-200 p-4 flex justify-between items-center dark:bg-gray-600">
                <button
                    id="theme-toggle-main"
                    type="button"
                    className="text-gray-700 bg-yellow-300 dark:bg-gray-100 dark:text-gray-400 hover:bg-yellow-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-yellow-400 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 ml-2"
                    onClick={handleClick}
                >
                    {isDarkTheme ? (
                        <svg
                            id="theme-toggle-dark-icon"
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                            ></path>
                            {/* Dark mode icon */}
                        </svg>
                    ) : (
                        <svg
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
                            {/* Light mode icon */}
                        </svg>
                    )}
                </button>
                <h1 className="text-xl font-light">Welcome '<span className="italic font-bold">{user?.firstName} {user?.lastName}' </span>, it's time to Chit</h1>
                <div className="flex items-center">
                    <Notification />
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300"> {user?.firstName} </span>
                    </div>
                    <button onClick={() => logoutUser()} className="bg-red-500 text-white px-2 py-1 rounded ml-4">Logout</button>

                </div>
            </div>
            {/* Chat Interface */}
            <div className="flex flex-1">
                {/* Left section wrapper */}
                <div className="flex-3 w-2/6">
                    <div className="w-4/4 bg-gray-300 p-4 dark:bg-gray-500">
                        {/* Show Potential Chats button */}
                        <button onClick={handleShowPotentialChats} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
                            Find a Chat-Chitter
                        </button>

                        {/* Chat List */}
                        <div className="mt-4">
                            {isUserChatsLoading && <p>Loading...</p>}
                            {userChats?.map((chat, index) => (
                                <div key={index} className="m-2 " onClick={() => updateCurrentChat(chat)}>
                                    <UserChat chat={chat} user={user} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Right section */}
                <div className="w-3/4 bg-gray-300 p-4 dark:bg-gray-500">
                    {/* Open Chat */}
                    <ChatWindow />
                </div>
            </div>

            {/* Potential Chats Window */}
            {showPotentialChats && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-lg dark:bg-gray-400">
                        <PotentialChatsUser />
                        <button onClick={() => setShowPotentialChats(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Main;
