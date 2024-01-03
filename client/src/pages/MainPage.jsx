import React, { useContext } from 'react';
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

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <div className="bg-gray-200 p-4 flex justify-between items-center">
                <h1 className="text-xl font-light">Time to chat <span className="italic">{user?.fullName}</span></h1>
                <div className="flex items-center">
                    <Notification/>
                    <img
                        src={user?.avatarUrl} // Replace with actual avatar URL
                        alt="Avatar"
                        className="w-8 h-8 rounded-full mr-2"
                    />
                    <button onClick={() => logoutUser()} className="bg-red-500 text-white px-2 py-1 rounded">Logout</button>
                </div>
            </div>

            {/* Chat Interface */}
            <div className="flex flex-1">
                <PotentialChatsUser />
                {/* Chat List */}
                {userChats?.length < 1 ? null : (
                    <div className="mt-4 d-flex">
                        {isUserChatsLoading && <p>Loading...</p>}
                        {userChats?.map((chat, index) => (
                            <div key={index} className="m-2 " onClick={() => updateCurrentChat(chat)}>
                                <UserChat chat={chat} user={user} />
                            </div>
                        ))}
                        {/* 
            Here, UserChat component is wrapped in a div with margin to create spacing.
            Adjust the 'm-2' class as needed for your layout.
        */}
                    </div>
                )}

                {/* Open Chat */}
                <div className="w-3/4 bg-gray-300 p-4">
                    <ChatWindow />

                </div>
            </div>
        </div>
    );
};

export default Main;
