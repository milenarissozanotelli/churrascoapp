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
    const checkAuthentication = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('token');
        setIsAuthenticated(!!storedToken);
      } catch (error) {
        console.error('Error retrieving token:', error);
        // Handle error appropriately, e.g., redirect to login screen
      }
    };
    checkAuthentication();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator initialRouteName="Menu">
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Informar Pessoas" component={InformarPessoas} />
          <Stack.Screen name="Listas Salvas" component={ListasSalvas} />
          <Stack.Screen name="Cálculo Final" component={CalculoFinal} />

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
