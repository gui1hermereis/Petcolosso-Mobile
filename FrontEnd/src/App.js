import 'react-native-gesture-handler';
import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/Login';
import Inicio from './components/Inicio'
import Servico from './components/Servico';
import Carrinho from './components/Carrinho';
import Finalizarcompra from './components/Finalizarcompra';

global.totalPago

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;