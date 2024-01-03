import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChatsUser = () => {

    const { user } = useContext(AuthContext)
    const { userPotentialChats, createChat, onlineUsers } = useContext(ChatContext);
    // console.log("PotentialChatUser", userPotentialChats)
    return (
        <>
            <div>
                {userPotentialChats && userPotentialChats.map((userdb, index) => {
                    return (
                        <div key={index} onClick={() => createChat(user._id, userdb._id)}>
                            {userdb.firstName}
                            <span
                                className={
                                    onlineUsers?.some((user) => user?.userId === userdb?._id)
                                        ? 'userOnline'
                                        : 'userNotOnline'
                                }
                            > status</span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default PotentialChatsUser;