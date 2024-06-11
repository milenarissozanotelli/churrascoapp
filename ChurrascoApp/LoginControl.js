import { useState, useEffect, useRef } from 'react';
import * as SecureStore from 'expo-secure-store';

const useLoginControl = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const attemptAuthentication = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await SecureStore.setItemAsync('userToken', data.token);
        if (isMounted.current) {
          setIsAuthenticated(true);
        }
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message || 'Falha na autenticação' };
      }
    } catch (error) {
      console.error(error);
      if (isMounted.current) {
        setIsAuthenticated(false);
      }
      return { success: false, message: 'Erro no servidor' };
    }
  };

  return { isAuthenticated, attemptAuthentication };
};

export default useLoginControl;
