import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from 'react-native-vector-icons';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Carrinho from './pages/Carrinho';
import Finalizarcompra from './pages/Finalizarcompra';
import Cadastro from './pages/Cadastro';
import Recuperar from './pages/Recuperar';
import Conta from './pages/Conta';
import { CartProvider } from '../src/contexts/CartContext';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#fff' }}
      activeColor="#3b5998"
      inactiveColor="#000"
      shifting={false}
    >
      <Tab.Screen
        name="InicioStack"
        component={InicioStack}
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ContaStack"
        component={ContaStack}
        options={{
          title: 'Conta',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function InicioStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Carrinho" component={Carrinho} />
      <Stack.Screen name="Finalizarcompra" component={Finalizarcompra} />
    </Stack.Navigator>
  );
}

function ContaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Conta" component={Conta} />
      <Stack.Screen name="Carrinho" component={Carrinho} />
      <Stack.Screen name="Finalizarcompra" component={Finalizarcompra} />
    </Stack.Navigator>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "MainTabs" : "Login"} screenOptions={{ headerShown: false }} >
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Recuperar" component={Recuperar} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

export default App;