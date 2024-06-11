import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './views/login';
import Menu from './views/menu';
import Cadastro from './views/cadastro';
import InformarPessoas from './views/informarpessoas';
import ListasSalvas from './views/listassalvas';
import Sobre from './views/sobrenos';
import CalculoFinal from './views/calculofinal';

const Stack = createStackNavigator();

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('token');
        if (!storedToken) {
          const response = await fetch('http://localhost:8081/login', {
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
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}