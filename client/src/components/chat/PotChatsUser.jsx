import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChatsUser = () => {

    const { user } = useContext(AuthContext)
    const { userPotentialChats, createChat, onlineUsers } = useContext(ChatContext);
    // console.log("PotentialChatUser", userPotentialChats)

    // Sort potential chat users by email in ascending order
    const sortedPotentialChats = userPotentialChats.slice().sort((a, b) => a.email.localeCompare(b.email));

    return (
        
            <div className="flex flex-col gap-4">
                {userPotentialChats && sortedPotentialChats.map((userdb, index) => (
                    <div
                        className="flex items-center justify-between px-4 py-2 rounded-lg border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700"
                        key={index}
                        onClick={() => createChat(user._id, userdb._id)}
                    >
                        <p className="text-lg text-gray-800 dark:text-white font-semibold">{userdb.firstName} - {userdb.email}</p>
                        <span className={`text-sm font-medium ${onlineUsers?.some((user) => user?.userId === userdb?._id) ? "text-green-500" : "text-red-500"}`}>
                            {onlineUsers?.some((user) => user?.userId === userdb?._id) ? "Online" : "Offline"}
                        </span>
                    </div>
                ))}
            </div>
        
    );
};

export default PotentialChatsUser;