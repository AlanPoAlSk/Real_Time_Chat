import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useFetchRecipientUser } from '../hooks/useFetchRecipient';

const ChatWindow = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading, messagesError, sendTextMessage } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState('');
    const scroll = useRef();
    const [showNoConversation, setShowNoConversation] = useState(!recipientUser);


    // console.log('text', textMessage)

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    const handleClose = () => {
        setShowNoConversation(true);
    };

    useEffect(() => {
        setShowNoConversation(!recipientUser);
    }, [recipientUser]);

    // console.log('currentChat:', currentChat);
    // console.log('user:', user);
    // console.log('recipientUser from ChatWindow:', recipientUser);
    if (showNoConversation || !recipientUser) return (
        <div className="border border-gray-400 p-4">
            <p style={{ textAlign: 'center', width: '100%' }}>
                Select or start a conversation
            </p>
        </div>
    )
    if (isMessagesLoading) return (
        <p style={{ textAlign: 'center', width: '100%' }}>
            Loading chat...
        </p>
    )

    return <>
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-400">
            {/* Header */}
            <div className="bg-gray-200 py-4 px-6 flex justify-between items-center dark:bg-gray-600">
                <h1 className="text-xl font-semibold">{recipientUser?.firstName} {recipientUser?.lastName}</h1>
                <button onClick={handleClose} className="text-white bg-red-500 px-3 py-1 rounded">Close</button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
                {messages &&
                    messages.map((message, index) => {
                        const messageTime = new Date(message.createdAt);
                        const currentTime = new Date();

                        const isSameDay = messageTime.toDateString() === currentTime.toDateString();
                        let formattedTime = '';

                        if (isSameDay) {
                            formattedTime = `Today, ${messageTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
                        } else {
                            formattedTime = messageTime.toLocaleString([], { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
                        }

                        return (
                            <div
                                key={index}
                                className={`p-3 rounded-lg max-w-md ${message.senderId === user?._id ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'
                                    }`}
                                style={{
                                    marginLeft: message.senderId === user?._id ? 'auto' : 'none',
                                    marginRight: message.senderId === user?._id ? 'none' : 'auto',
                                    borderTopLeftRadius: message.senderId === user?._id ? '1.5rem' : '1.5rem',
                                    borderTopRightRadius: message.senderId === user?._id ? '1.5rem' : '1.5rem',
                                    borderBottomLeftRadius: message.senderId === user?._id ? '1.5rem' : '0.5rem',
                                    borderBottomRightRadius: message.senderId === user?._id ? '0.5rem' : '1.5rem',
                                    // textAlign: message.senderId === user?._id ? 'left' : 'left',
                                    marginBottom: '10px',
                                }}
                                ref={scroll}
                            >
                                {/* <span className="block">{message.text}</span>
                                <span className="text-xs text-black-500">{formattedTime}</span> */}
                                <div className="flex items-start gap-2.5">
                                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                                        <div className="flex items-center space-x-2 rtl:space-x-reverse justify-between">
                                            {message.senderId === user?._id
                                                ?
                                                <span className="text-md font-semibold text-gray-900 dark:text-black"> {user.firstName} </span>
                                                :
                                                <span className="text-md font-semibold text-gray-900 dark:text-black"> {recipientUser.firstName} </span>}
                                            <span className="text-sm font-normal text-gray-600 dark:text-gray-700">{formattedTime}</span>
                                        </div>
                                        <p className="text-md font-normal py-2 text-gray-900 dark:text-black"> {message.text} </p>
                                        {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-600">message read icon</span> */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>


            {/* Message Input */}
            <div className="bg-white p-4 flex dark:bg-black ">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    className="border-2 border-gray-300 rounded-l-full py-2 px-4 flex-1 focus:outline-none dark:bg-gray-600 dark:text-white"
                />
                <button className="bg-blue-500 h-11 text-white px-4 py-2 rounded-r-full" onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>Send</button>
            </div>
        </div>
    </>;



};

export default ChatWindow;
