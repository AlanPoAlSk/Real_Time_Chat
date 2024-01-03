import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatList = () => {
    // const [chats, setChats] = useState([]);

    // useEffect(() => {
    //     const fetchUserChats = async () => {
    //         try {
    //             const userId = 'user._id'; // Replace with the actual user ID
    //             const response = await axios.get(`/auth/chats/${userId}`);
    //             console.log('Response:', response.data); // Log the response data for further inspection
    //             setChats(response.data); // Assuming the response contains an array of chats
    //         } catch (error) {
    //             console.error('Error fetching chats:', error);
    //         }
    //     };

    //     fetchUserChats();
    // }, []);

    // console.log('Chats:', chats); // Add this line to check the state of chats

    return (
        <div style={{ borderRight: '1px solid #ddd', height: '100%', overflowY: 'scroll', flex:'1' }}>
            {/* Your chat list content goes here */}
            {/* Example: List of chats */}
            <h2>Chats</h2>
            <ul>
                {/* {Array.isArray(chats) && chats.length > 0 ? (
                    chats.map((chat) => (
                        <li key={chat._id}>{chat.users}</li>
                    ))
                ) : (
                    <li>No chats found</li>
                )} */}
            </ul>
        </div>
    );
};

export default ChatList;
