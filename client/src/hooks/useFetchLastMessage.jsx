import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/service";

export const useFetchLastMessage = (chat) => {
    const { newMessage, notifications } = useContext(ChatContext);
    const [lastMessage, setLastMessage] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMessages = async () => {
            try {
                setLoading(true); // Set loading to true while fetching data
                setError(null); // Reset error state

                const response = await getRequest(`${baseUrl}/messages/${chat._id}`);

                if (response.error) {
                    setError(response.message); // Set the error state
                    return console.error('Error!!!', response.message);
                }

                const lastUserMessage = response[response?.length - 1];
                setLastMessage(lastUserMessage);
            } catch (error) {
                setError(error.message); // Set the error state
                console.error('Error!!!', error.message);
            } finally {
                setLoading(false); // Set loading to false after fetching data (success or error)
            }
        };

        getMessages();
    }, [newMessage, notifications]);

    return { lastMessage, loading, error }; // Return loading state along with lastMessage and error
};

