import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useContext } from 'react';

import { AuthProvider, AuthContext } from './src/contexts/AuthContext';

import Login from './src/pages/Login';
import Cadastro from './src/pages/Cadastro';
import Recuperar from './src/pages/Recuperar';
import Inicio from './src/pages/Inicio';
import Conta from './src/pages/Conta';
import Carrinho from './src/pages/Carrinho';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Routes() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === null) return null;

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator initialRouteName="Inicio">
          <Drawer.Screen name="Inicio" component={Inicio} />
          <Drawer.Screen name="Conta" component={Conta} />
          <Drawer.Screen name="Carrinho" component={Carrinho} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Recuperar" component={Recuperar} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}