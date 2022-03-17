import { useState, useEffect } from "react";
import { useToken } from './useToken';

export const useUser = () => {
    const [token] = useToken();

    // Function for getting payload from the token
    const getPayloadFromToken = (token) => {
        const encodedPayload = token.split('.')[1];
        return JSON.parse(atob(encodedPayload));
    }

    // Defining a user state
    const [user, setUser] = useState(() =>{
        if(!token) return null;
        return getPayloadFromToken(token);
    })

    // Watching the token for changes
    useEffect(() => {
        if(token) {
            const { id, isVerified, email, info } = getPayloadFromToken(token);
            setUser({ id, isVerified, email, info });
        } else {
            setUser(null);
        }
    }, [token]);

    return user;
}