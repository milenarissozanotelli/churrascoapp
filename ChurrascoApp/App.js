import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
  const { isAuthenticated, setUsername, setPassword } = useLoginControl();
  const [username, setUsernameState] = useState('');
  const [password, setPasswordState] = useState('');

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
              {props => <Login {...props} setUsername={setUsername} setPassword={setPassword} />}
            </Stack.Screen>
            <Stack.Screen name="Cadastro">
              {props => <Cadastro {...props} setUsername={setUsername} setPassword={setPassword} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}