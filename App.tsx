import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserProvider } from './context/UserContext';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import ListaUsuariosScreen from './screens/ListaUsuariosScreen';

// aqui defino os nomes das telas e os parametros que cada uma recebe
// por enquanto nenhuma precisa de parametro, so a tipagem basica
export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  ListaUsuarios: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // TODO: colocar um tema com cores bonitas depois
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="Cadastro"
            component={CadastroScreen}
            options={{ title: 'Cadastro' }}
          />
          <Stack.Screen
            name="ListaUsuarios"
            component={ListaUsuariosScreen}
            options={{ title: 'Usuarios Cadastrados' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
