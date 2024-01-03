import { useContext } from "react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunction } from "../../utils/unreadNotifications";
import { useFetchLastMessage } from "../../hooks/useFetchLastMessage";

const ChatUser = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
    const { onlineUsers, notifications, markSpecificUserNotificationAsRead } = useContext(ChatContext);
    const {lastMessage} = useFetchLastMessage(chat);

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
        let partText = text.substring(0,20);

        if(text.length > 20) {
            partText = partText + '...'
        }
        return partText;
    }

    // Mock data for demonstration
    // const lastMessage = "Hey, how's it going?";
    // const messageDate = "Dec 29";
    // const messageHour = "11:30 AM";
    // const numberOfMessages = 5;
    // const isUserOnline = true;

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-200" onClick={() => {
            if (specificUserNotifications?.length !== 0) {
                markSpecificUserNotificationAsRead(
                    specificUserNotifications,
                    notifications,
                )
            }
        }}>
            <div className="flex items-center space-x-4">
                <img
                    className="h-12 w-12 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
                <div>
                    <p className="text-lg font-semibold cursor-pointer">
                        {recipientUser?.firstName} {recipientUser?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{
                        lastMessage?.text && (
                            <span> {previewText(lastMessage?.text)} </span>
                        )
                    }</p>
                </div>
            </div>
            <div className="text-sm text-gray-500 flex flex-col items-end">
                <p className="mb-1"> {date} </p>
                <p className={specificUserNotifications?.length > 0 ? "mb-1 bg-red-600 rounded-full w-5 text-center text-white" : ''} >
                    {specificUserNotifications?.length > 0 ? specificUserNotifications.length : ''}</p>
                <p>{isOnline ? "Online" : "Offline"}</p>
            </div>
        </div>
    );
};

export default ChatUser;
