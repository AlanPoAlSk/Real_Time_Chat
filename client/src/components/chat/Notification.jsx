import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { unreadNotificationsFunction } from "../../utils/unreadNotifications";

const Notification = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const { notifications, userChats, allUsers, markAsRead, markOneAsRead } = useContext(ChatContext);


    const unreadNotifications = unreadNotificationsFunction(notifications);
    const modNotifications = notifications.map((notification) => {
        const sender = allUsers.find((user) => user._id === notification.senderId)

        return {
            ...notification,
            senderName: sender.firstName + ' ' + sender.lastName
        }
    })

    console.log('un', unreadNotifications);
    console.log('mn', modNotifications);

    const formatTime = (createdAt) => {
        const messageTime = new Date(createdAt);
        const currentTime = new Date();

        const isSameDay = messageTime.toDateString() === currentTime.toDateString();
        let date = '';

        if (isSameDay) {
            date = `Today, ${messageTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
        } else {
            date = messageTime.toLocaleString([], {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
            });
        }
        return date;
    };


    return (
        <div className="notifications">
            <div className="flex items-center justify-center rounded-lg mr-4 bg-primary-500 px-2 py-2 text-center text-white shadow-xl dark:text-gray-200 cursor-pointer"  onClick={() => setIsOpen(!isOpen)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="blue"
                    className="h-6 w-8">
                    <path
                        d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path
                        d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                {unreadNotifications?.length === 0 ? null : (
                    <span className="notification-count">
                        <span style={{ color: 'red' }}> {unreadNotifications?.length} </span>
                    </span>
                )}
            </div>
            {isOpen ?
                <div className="notification-box">
                    <div className="notifications-header">
                        <h3>Notifications</h3>
                        <div className="mark-as-read cursor-pointer" onClick={() => markAsRead(notifications)}>
                            mark all as read
                        </div>
                        {modNotifications?.length === 0 ? <span> 0 notifications </span> : null}
                        {modNotifications && modNotifications.map((notification, index) => {
                            const date = formatTime(notification.date);
                            return <div key={index} className= {notification.isRead ? 'notification cursor-pointer' : 'notification-not-read cursor-pointer'} onClick={() => {
                                markOneAsRead(notification, userChats, user, notifications);
                                setIsOpen(false);
                            }}>
                                <span> - {`${notification.senderName} sent you a new message`}  </span>
                                <span> ({date}) </span>
                            </div>
                        })}
                    </div>
                </div>
                : null
            }
        </div>
    )
}

export default Notification;