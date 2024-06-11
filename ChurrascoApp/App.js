import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './views/login';
import Cadastro from './views/cadastro';
import Menu from './views/menu';
import InformarPessoas from './views/informarpessoas';
import ListasSalvas from './views/listassalvas';
import Sobre from './views/sobrenos';
import CalculoFinal from './views/calculofinal';
import useLoginControl from './LoginControl';

const Stack = createStackNavigator();

export default function App() {
  const { isAuthenticated, setIsAuthenticated, setUsername, setPassword, attemptAuthentication } = useLoginControl();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const response = await fetch('http://192.168.1.182:8080/verifyToken', {
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
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  const handleRefreshToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken) {
        const response = await fetch('http://192.168.1.182:8080/refreshToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
          const { newToken } = await response.json();
          await AsyncStorage.setItem('userToken', newToken);
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
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
                  onLoginFailed={() => Alert.alert('Login failed. Please try again.')}
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