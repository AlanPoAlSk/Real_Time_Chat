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
        <div className="relative inline-block text-left mr-4">
            <div>
                <button
                    type="button"
                    className="group inline-flex justify-center items-center rounded-full bg-primary-500 text-white shadow-xl focus:outline-none p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                    >
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                    {unreadNotifications?.length !== 0 && (
                        <span className="notification-count bg-red-500 text-white rounded-full px-2 py-1 absolute -top-1 -right-1 text-xs">
                            {unreadNotifications.length}
                        </span>
                    )}
                </button>
            </div>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                        <div className="text-sm text-gray-700 px-4 py-2 font-medium border-b border-gray-200">
                            Notifications
                        </div>
                        {modNotifications?.length === 0 ? (
                            <span className="block px-4 py-2">0 notifications</span>
                        ) : (
                            modNotifications.map((notification, index) => {
                                const date = formatTime(notification.date);
                                return (
                                    <div
                                        key={index}
                                        className={`${notification.isRead
                                            ? 'bg-gray-100 cursor-pointer'
                                            : 'bg-white cursor-pointer font-bold'
                                            } px-4 py-2 border-b border-gray-200`}
                                        onClick={() => {
                                            markOneAsRead(
                                                notification,
                                                userChats,
                                                user,
                                                notifications
                                            );
                                            setIsOpen(false);
                                        }}
                                    >
                                        <span>{`${notification.senderName} sent you a new message`}</span>
                                        <span className="text-gray-500 text-xs ml-2">
                                            ({date})
                                        </span>
                                    </div>
                                );
                            })
                        )}
                        {modNotifications?.length !== 0 && (
                            <div
                                className="text-sm text-primary-500 px-4 py-2 cursor-pointer border-t border-gray-200 hover:bg-gray-100"
                                onClick={() => markAsRead(notifications)}
                            >
                                Mark all as read
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;