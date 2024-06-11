import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';
import Login from './views/login';
import Menu from './views/menu';
import Cadastro from './views/cadastro';
import InformarPessoas from './views/informarpessoas';
import ListasSalvas from './views/listassalvas';
import Sobre from './views/sobrenos';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CalculoFinal from './views/calculofinal';

const Stack = createStackNavigator();

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticateUser = async (username, password) => {
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
  
    authenticateUser('your_username', 'your_password');
  }, []);
  
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator initialRouteName="Menu">
          <Stack.Screen name="Menu" component={Menu} />

        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Sobre Nós" component={Sobre} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Informar Pessoas" component={InformarPessoas} />
          <Stack.Screen name="Listas Salvas" component={ListasSalvas} />
          <Stack.Screen name="Cálculo Final" component={CalculoFinal} />
        </Stack.Navigator>
      )}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
