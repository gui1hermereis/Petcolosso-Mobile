import { Image, Alert, TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { ApiURL } from '../configs';

const Cadastro = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function postCadastro() {
    try {
      const url = `${ApiURL}/Cadastro`;
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

      const responseJson = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', responseJson.message);
        navigation.dispatch(StackActions.replace('Login', { atualizarParams: null }));
      } else {
        Alert.alert('Erro', responseJson.message);
      }
    } catch (error) {
      Alert.alert('Erro', 'Informação não atualizada: ' + error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <View style={styles.card}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder={'Username'}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={'Senha'}
          secureTextEntry={true}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.button} onPress={postCadastro}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.dispatch(StackActions.replace('Login', { atualizarParams: null }))}
        >
          <Text style={styles.footerText}>Já tem uma conta? <Text style={styles.link}>Fazer Login</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Cadastro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    marginBottom: 40,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: '#bd75f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 15,
    borderWidth: 1,
    borderColor: '#bd75f0',
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#bd75f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#555',
    fontSize: 14,
  },
  link: {
    color: '#bd75f0',
    fontWeight: 'bold',
  },
});