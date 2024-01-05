import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/service";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    const recipientId = chat?.users?.find((id) => id !== user?._id);
    // console.log(recipientId)
    

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;

            try {
                const response = await getRequest(`${baseUrl}/find/${recipientId}`);
                console.log('API Response:', response);

                if (!response.error) {
                    console.log('Setting recipientUser:', response);
                    setRecipientUser(response);
                } else {
                    setError(response);
                }
            } catch (error) {
                console.error('API Error:', error);
                setError(error);
            }
        };

        getUser();
    }, [recipientId]);

    return { recipientUser, error };
};
