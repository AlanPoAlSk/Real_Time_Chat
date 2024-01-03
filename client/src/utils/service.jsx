export const baseUrl = 'http://localhost:8000/auth';

export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });

    const data = await response.json();

    if (!response.ok) {
        let message;

        if (data?.message) {
            message = data.message;
        } else {
            message = data;
        }

        return { error: true, message }
    }

    return data;
};

export const getRequest = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            let message = 'An error occurred!';

            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                if (data.message) {
                    message = data.message;
                }
            } else {
                // Handle non-JSON error responses
                const text = await response.text();
                message = text || message;
            }

            return { error: true, message };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

