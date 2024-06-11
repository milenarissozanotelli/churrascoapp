// LoginControl.js
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function useLoginControl() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');

        if (!token) {
          const response = await fetch('https://myapi.com/authenticate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });

          if (response.ok) {
            const { token } = await response.json();
            await SecureStore.setItemAsync('token', token);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    };

    authenticateUser();
  }, [username, password]);

  return { isAuthenticated, setUsername, setPassword };
}