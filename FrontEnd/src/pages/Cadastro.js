import { Image, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { StackActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { ApiURL } from '../configs';
import Modal from 'react-native-modal';
import styles from '../styles/styles';

const Cadastro = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  async function postCadastro() {
    if (!username || !password || !email) {
      setModalMessage('Por favor, preencha todos os campos.');
      setErrorModalVisible(true);
      return;
    }

    try {
      const url = `${ApiURL}/Cadastro`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      const responseJson = await response.json();

      if (response.ok) {
        setModalMessage('Cadastro realizado com sucesso!');
        setSuccessModalVisible(true);
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('Login', { atualizarParams: null }));
        }, 1500);
      } else {
        setModalMessage(responseJson.message);
        setErrorModalVisible(true);
      }
    } catch (error) {
      setModalMessage('Informação não atualizada: ' + error.message);
      setErrorModalVisible(true);
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
          value={email}
          onChangeText={setEmail}
          placeholder={'Email'}
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
          <Text style={styles.buttonText}>Cadastrar</Text>
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

      <Modal
        isVisible={isSuccessModalVisible}
        backdropColor="rgba(0, 0, 0, 0.5)"
        backdropOpacity={0.5}
        onBackdropPress={() => setSuccessModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalMessage}</Text>
        </View>
      </Modal>

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

export default Cadastro;