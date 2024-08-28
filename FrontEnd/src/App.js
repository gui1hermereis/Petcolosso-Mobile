import 'react-native-gesture-handler';
import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './components/Login';
import Inicio from './components/Inicio';
import Servico from './components/Servico';
import Carrinho from './components/Carrinho';
import Finalizarcompra from './components/Finalizarcompra';
import Cadastro from './components/Cadastro';
import Recuperar from './components/Recuperar';

const Stack = createStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "Inicio" : "Login"}
        screenOptions={{
          headerStyle: { backgroundColor: '#bd75f0' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{ title: 'Inicio' }}
        />
        <Stack.Screen
          name="Servico"
          component={Servico}
          options={{ title: 'Serviços' }}
        />
        <Stack.Screen
          name="Carrinho"
          component={Carrinho}
          options={{ title: 'Carrinho' }}
        />
        <Stack.Screen
          name="Finalizarcompra"
          component={Finalizarcompra}
          options={{ title: 'Finalizarcompra' }}
        />

        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ title: 'Cadastro' }}
        />

        <Stack.Screen
          name="Recuperar"
          component={Recuperar}
          options={{ title: 'Recuperar' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;