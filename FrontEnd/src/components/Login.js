import { Image, Alert, TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { ApiURL } from '../configs';

const Login = ({ navigation }) => { 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function postLogin() {
    try {
      const url = `${ApiURL}/login`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const responseJson = await response.json();

      if (responseJson.token) {
        await AsyncStorage.setItem('userToken', responseJson.token);
        navigation.dispatch(StackActions.replace('Inicio'));
      } else {
        Alert.alert('Acesso não permitido', 'Usuário ou senha inválidos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Informação não atualizada: ' + error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 0 }}>
        <Image style={{ height: 300, width: 300 }} source={require("../assets/logo.png")} />
      </View>

      <TextInput
        value={username}
        onChangeText={setUsername} 
        placeholder={'Login'}
        style={styles.input}
      />

      <TextInput
        value={password}
        onChangeText={setPassword} 
        placeholder={'Senha'}
        secureTextEntry={true}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={postLogin}>
        <Text style={{ color: "white", padding: 10 }}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 50,
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#bd75f0',
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: '#bd75f0',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#bd75f0",
    alignItems: 'center',
  },
});