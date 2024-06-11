import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import Login from './views/Login';
import Cadastro from './views/Cadastro';
import Menu from './views/Menu';
import InformarPessoas from './views/InformarPessoas';
import ListasSalvas from './views/ListasSalvas';
import Sobre from './views/Sobre';
import CalculoFinal from './views/CalculoFinal';
import useLoginControl from './LoginControl';

const Stack = createStackNavigator();

export default function App() {
  const { isAuthenticated, setIsAuthenticated, setUsername, setPassword, attemptAuthentication } = useLoginControl();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');

        if (token) {
          const response = await fetch('https://myapi.com/verifyToken', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            await handleInvalidToken();
          }
        }
      } catch (error) {
        console.error('Error checking token:', error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [setIsAuthenticated]);

  const handleInvalidToken = async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('refreshToken');
    setIsAuthenticated(false);
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('refreshToken');
    setIsAuthenticated(false);
  };

  const handleRefreshToken = async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (refreshToken) {
        const response = await fetch('https://myapi.com/refreshToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
          const { newToken } = await response.json();
          await SecureStore.setItemAsync('userToken', newToken);
          setIsAuthenticated(true);
        } else {
          await handleInvalidToken();
        }
      } else {
        await handleInvalidToken();
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      await handleInvalidToken();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        handleRefreshToken();
      }
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="InformarPessoas" component={InformarPessoas} />
            <Stack.Screen name="ListasSalvas" component={ListasSalvas} />
            <Stack.Screen name="Sobre" component={Sobre} />
            <Stack.Screen name="CalculoFinal" component={CalculoFinal} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <Login
                  {...props}
                  setUsername={setUsername}
                  setPassword={setPassword}
                  attemptAuthentication={attemptAuthentication}
                  onLoginFailed={() => alert('Login failed. Please try again.')}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Cadastro" component={Cadastro} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
