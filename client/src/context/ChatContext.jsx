import { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/service";
import { io } from 'socket.io-client';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [userPotentialChats, setUserPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    // console.log('notifications', notifications);
    // console.log('onlineUsers', onlineUsers);

    // console.log('messages', messages)

    // console.log('currentChat',currentChat);

    //initial socket

    useEffect(() => {
        const newSocket = io('http://localhost:8001/'); // Connect to port 8001
        setSocket(newSocket);



        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    // add online Users
    useEffect(() => {
        if (socket === null) return;
        socket.emit('addNewUser', user?._id);
        socket.on('getOnlineUsers', (res) => {
            setOnlineUsers(res);
        });

        return () => {
            socket.off('getOnlineUsers');
        }

    }, [socket]);

    // send message
    useEffect(() => {
        if (socket === null) return
        const recipientId = currentChat?.users?.find((id) => id !== user?._id);
        socket.emit('sendMessage', { ...newMessage, recipientId });

    }, [newMessage]);

    // receive message and notifications
    useEffect(() => {
        if (socket === null) return

        socket.on('getMessage', res => {
            if (currentChat?._id !== res.chatId) return;

            setMessages((prev) => [...prev, res]);
        });

        socket.on('getNotification', (res) => {
            const isChatOpen = currentChat?.users.some(id => id === res.senderId)

            if (isChatOpen) {
                setNotifications(prev => [{ ...res, isRead: true }, ...prev])
            } else {
                setNotifications(prev => [res, ...prev]);
            }
        });

        return () => {
            socket.off('getMessage');
            socket.off('getNotification');
        };

    }, [socket, currentChat]);

    useEffect(() => {
        const getUsers = async () => {
            if (!user) {
                return; // Exit early if user is null
            }

            const response = await getRequest(`${baseUrl}/users`);
            if (response.error) {
                return console.log('Error getting Users', response)
            }

            const potChats = response.filter((userdb) => {
                if (user._id === userdb._id) return false;

                let isChatCreated = false;
                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat.users[0] === userdb._id || chat.users[1] === userdb._id;
                    })
                }

                return !isChatCreated;
            });
            setUserPotentialChats(potChats);
            setAllUsers(response);
        }

        getUsers();

    }, [user, userChats]);

    useEffect(() => {
        const getUserChats = async () => {
            if (!user || !user._id) {
                return; // Exit early if user or user._id is null
            }

            setIsUserChatsLoading(true);
            setUserChatsError(null);

            try {
                const response = await getRequest(`${baseUrl}/chats/${user._id}`);

                setIsUserChatsLoading(false);

                if (response && response.error) {
                    return setUserChatsError(response);
                }

                setUserChats(response);
            } catch (error) {
                setIsUserChatsLoading(false);
                setUserChatsError(error);
            }
        }

        getUserChats();
    }, [user, notifications]);

    useEffect(() => {
        const getMessages = async () => {
            // if (!user || !user._id) {
            //     return; // Exit early if user or user._id is null
            // }
            if (!currentChat || !currentChat._id) {
                return;
            }

            setIsMessagesLoading(true);
            setMessagesError(null);

            try {
                const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

                setIsMessagesLoading(false);

                if (response && response.error) {
                    return setMessagesError(response);
                }

                setMessages(response);
            } catch (error) {
                setIsUserChatsLoading(false);
                setUserChatsError(error);
            }
        }

        getMessages();
    }, [currentChat])

    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return console.log('Cannot send empty text')

        const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage
        }));
        if (response && response.error) {
            return setSendTextMessageError(response);
        }

        setNewMessage(response);
        setMessages((prev) => [...prev, response])
        setTextMessage('');

    }, [])

    const updateCurrentChat = useCallback((chat) => {
        console.log('Updating current chat:', chat);
        setCurrentChat(chat)
    }, []);

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(`${baseUrl}/chats/`, JSON.stringify({
            firstId,
            secondId,
        })
        );
        if (response.error) {
            return console.log('Error!!!', response)
        }
        setUserChats((prev) => [...prev, response]);
    }, []);

    const markAsRead = useCallback((notifications) => {
        const modNotifications = notifications.map(notification => {
            return { ...notification, isRead: true }
        })

        setNotifications(modNotifications);
    }, []);

    const markOneAsRead = useCallback((notification, userChats, user, notifications) => {
        //find chat to open
        const thatChat = userChats.find(chat => {
            const chatUsers = [user._id, notification.senderId];
            const isThatChat = chat?.users.every((user) => {
                return chatUsers.includes(user);
            });
            return isThatChat
        });

        // mark notification as read
        const markNotifications = notifications.map(element => {
            if (notification.senderId === element.senderId) {
                return { ...notification, isRead: true };
            } else {
                return element;
            }
        })
        updateCurrentChat(thatChat)
        setNotifications(markNotifications)
    }, [])

    const markSpecificUserNotificationAsRead = useCallback((specificUserNotifications, notifications) => {

        const modNotifications = notifications.map(element => {
            let n;

            specificUserNotifications.forEach(notification => {
                if (notification.senderId === element.senderId) {
                    n = { ...notification, isRead: true }
                } else {
                    n = element;
                }
            });
            return n;
        });
        setNotifications(modNotifications);
    }, []);

    return (
        <ChatContext.Provider
            value={{
                userChats,
                isUserChatsLoading,
                userChatsError,
                userPotentialChats,
                createChat,
                updateCurrentChat,
                messages,
                isMessagesLoading,
                messagesError,
                currentChat,
                sendTextMessage,
                onlineUsers,
                notifications,
                allUsers,
                markAsRead,
                markOneAsRead,
                markSpecificUserNotificationAsRead,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
