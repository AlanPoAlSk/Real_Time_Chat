import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useFetchRecipientUser } from '../hooks/useFetchRecipient';

const ChatWindow = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading, messagesError, sendTextMessage } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState('');
    const scroll = useRef()


    console.log('text', textMessage)

    useEffect(() => {
        scroll.current?.scrollIntoView({behavior: 'smooth'});
    },[messages])

    // console.log('currentChat:', currentChat);
    // console.log('user:', user);
    // console.log('recipientUser from ChatWindow:', recipientUser);
    if (!recipientUser) return (
        <p style={{ textAlign: 'center', width: '100%' }}>
            No conversation selected
        </p>
    )
    if (isMessagesLoading) return (
        <p style={{ textAlign: 'center', width: '100%' }}>
            Loading chat...
        </p>
    )

    return <>
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-gray-200 py-4 px-6 flex justify-between items-center">
                <h1 className="text-xl font-semibold">{recipientUser?.firstName} {recipientUser?.lastName}</h1>
                <button className="text-white bg-red-500 px-3 py-1 rounded">Close</button>
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
                                    textAlign: message.senderId === user?._id ? 'right' : 'left',
                                    marginBottom: '10px',
                                }}
                                ref={scroll}
                            >
                                <span className="block">{message.text}</span>
                                <span className="text-xs text-black-500">{formattedTime}</span>
                            </div>
                        );
                    })}
            </div>


            {/* Message Input */}
            <div className="bg-white p-4 flex items-center">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    className="border-2 border-gray-300 rounded-l-full py-2 px-4 flex-1 focus:outline-none"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-r-full" onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>Send</button>
            </div>
        </div>
    </>;



};

export default ChatWindow;
