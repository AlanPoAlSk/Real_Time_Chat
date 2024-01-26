import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/service";

export const useFetchLastMessage = (chat) => {
    const { newMessage, notifications } = useContext(ChatContext);
    const [lastMessage, setLastMessage] = useState(null);
    const [error, setError] = useState(null); // Add a state for error

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await getRequest(`${baseUrl}/messages/${chat._id}`);

                if (response.error) {
                    setError(response.message); // Set the error state
                    return console.log('Error!!!', response.message);
                }

                const lastUserMessage = response[response?.length - 1];
                setLastMessage(lastUserMessage);
            } catch (error) {
                setError(error.message); // Set the error state
                console.log('Error!!!', error.message);
            }
        };

        getMessages();
    }, [newMessage, notifications]);

};