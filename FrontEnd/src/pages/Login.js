import { Image, TextInput, View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { ApiURL } from '../configs';
import Modal from 'react-native-modal';
import styles from '../styles/styles';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function postLogin() {
    setIsLoading(true);
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
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Erro na requisição');
      }

      const responseJson = await response.json();

      if (responseJson.token) {
        await AsyncStorage.setItem('userToken', responseJson.token);
        navigation.navigate('MainTabs', {
          screen: 'InicioStack',
          params: {
            screen: 'Inicio'
          }
        });
      } else {
        setModalMessage(responseJson.message || 'Usuário ou senha inválidos.');
        setErrorModalVisible(true);
      }
    } catch (error) {
      setModalMessage(error.message || 'Erro desconhecido.');
      setErrorModalVisible(true);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <View style={styles.card}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder={'Login'}
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

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={() => postLogin()}
          disabled={isLoading} 
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" /> 
          ) : (
            <Text style={styles.buttonText}>LOGIN</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.dispatch(StackActions.replace('Cadastro', { atualizarParams: null }))}
        >
          <Text style={styles.footerText}>Não tem uma conta? <Text style={styles.link}>Cadastre-se</Text></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.dispatch(StackActions.replace('Recuperar', { atualizarParams: null }))}
        >
          <Text style={styles.footerText}>Esqueceu sua senha? <Text style={styles.link}>Recuperar</Text></Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isErrorModalVisible}
        backdropColor="rgba(0, 0, 0, 0.5)"
        backdropOpacity={0.5}
        onBackdropPress={() => setErrorModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalMessage}</Text>
        </View>
      </Modal>
    </View>
  );
}

export default Login;