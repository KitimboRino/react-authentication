import { useState } from 'react';


export const useToken = () => {
    const [token, setTokenInternal] = useState(() => {
        // Sets token from localStorage as initial value for token state
        const token = localStorage.getItem('token');
        return token;
    });

    // Sets token to localStorage if the user wants to change it
    const setToken = newToken => {
        localStorage.setItem('token', newToken);
        setTokenInternal(newToken);
    }

    return [token, setToken];
}
