import { useContext, useState } from "react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunction } from "../../utils/unreadNotifications";
import { useFetchLastMessage } from "../../hooks/useFetchLastMessage";

const ChatUser = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
    const { onlineUsers, notifications, markSpecificUserNotificationAsRead } = useContext(ChatContext);
    const { lastMessage } = useFetchLastMessage(chat);

    const unreadNotifications = unreadNotificationsFunction(notifications);
    const specificUserNotifications = unreadNotifications?.filter(
        notification => notification.senderId === recipientUser?._id
    )

    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id)



    let date = '';
    if (lastMessage) {
        const messageTime = new Date(lastMessage.createdAt);
        const currentTime = new Date();
        const isSameDay = messageTime.toDateString() === currentTime.toDateString();

        if (isSameDay) {
            date = `Today, ${messageTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
        } else {
            date = messageTime.toLocaleString([], { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
        }
    }


    const previewText = (text) => {
        if (typeof text !== 'string') {
            return ''; // Return an empty string or handle this case as appropriate
        }
        let partText = text.substring(0, 20);

        if (text.length > 20) {
            partText = partText + '...'
        }
        return partText;
    }

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-200 bg-gray-200 dark:bg-gray-400" onClick={() => {
            if (specificUserNotifications?.length !== 0) {
                markSpecificUserNotificationAsRead(
                    specificUserNotifications,
                    notifications,
                )
            }
        }}>
            <div className="flex items-center space-x-4">
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
                <div>
                    <p className="text-lg font-semibold cursor-pointer dark:text-white">
                        {recipientUser?.firstName} {recipientUser?.lastName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{
                        lastMessage?.text && (
                            <span> {previewText(lastMessage?.text)} </span>
                        )
                    }</p>
                </div>
            </div>
            <div className="text-sm text-gray-500 flex flex-col items-end">
                <p className="mb-1 dark:text-white"> {date} </p>
                <p className={specificUserNotifications?.length > 0 ? "mb-1 bg-red-600 rounded-full w-5 text-center text-white" : ''} >
                    {specificUserNotifications?.length > 0 ? specificUserNotifications.length : ''}</p>
                {isOnline ? <p className="userOnline">Online</p> : <p className="userNotOnline">Offline</p>}
            </div>
        </div>
    );
};

export default ChatUser;
