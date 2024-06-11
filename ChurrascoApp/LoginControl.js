import { useState, useEffect, useRef } from 'react';
import * as SecureStore from 'expo-secure-store';

const useLoginControl = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [shouldAuthenticate, setShouldAuthenticate] = useState(false);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const authenticateUser = async () => {
        try {
            const response = await fetch('https://myapi.com/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                
                if (data.token && data.refreshToken) {
                    await SecureStore.setItemAsync('userToken', data.token);
                    await SecureStore.setItemAsync('refreshToken', data.refreshToken);
                }

                if (isMounted.current) {
                    setIsAuthenticated(true);
                }
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Authentication failed');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            if (isMounted.current) {
                alert(error.message);
                setIsAuthenticated(false);
            }
        }

        if (isMounted.current) {
            setShouldAuthenticate(false);
        }
    };

    useEffect(() => {
        if (shouldAuthenticate) {
            authenticateUser();
        }
    }, [shouldAuthenticate]);

    const attemptAuthentication = () => {
        setShouldAuthenticate(true);
    };

    return { isAuthenticated, setUsername, setPassword, attemptAuthentication, setIsAuthenticated };
};

export default useLoginControl;
