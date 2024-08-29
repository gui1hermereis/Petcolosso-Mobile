import { Image, TextInput, View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { StackActions } from '@react-navigation/native';
import { ApiURL } from '../configs';
import Modal from 'react-native-modal';
import styles from '../styles/styles';

const Recuperar = ({ navigation }) => {
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [email, setEmail] = useState("");
  const [codigoVisivel, setCodigoVisivel] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  function validateFields() {
    if (!email) {
      setModalMessage('O email é obrigatório.');
      setModalVisible(true);
      return false;
    }
    if (codigoVisivel && !codigo) {
      setModalMessage('O código de recuperação é obrigatório.');
      setModalVisible(true);
      return false;
    }
    if (newPassword) {
      if (!senha) {
        setModalMessage('A nova senha é obrigatória.');
        setModalVisible(true);
        return false;
      }
      if (senha !== confirmaSenha) {
        setModalMessage('As senhas não coincidem.');
        setModalVisible(true);
        return false;
      }
    }
    return true;
  }

  async function postEnviarCodigo() {
    if (!validateFields()) return;

    setIsLoading(true); 
    try {
      const url = `${ApiURL}/enviarCodigo`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email: email }),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      });

      const responseJson = await response.json();

      if (response.ok) {
        setModalMessage(responseJson.message);
        setModalVisible(true);
        setCodigoVisivel(true);
      } else {
        setModalMessage(responseJson.message);
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage('Informação não atualizada: ' + error.message);
      setModalVisible(true);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }

  async function postValidarCodigo() {
    if (!validateFields()) return;

    setIsLoading(true); 
    try {
      const url = `${ApiURL}/validarCodigo`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email: email, codigo: codigo }),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      });

      const responseJson = await response.json();

      if (response.ok) {
        setModalMessage(responseJson.message);
        setModalVisible(true);
        setNewPassword(true);
      } else {
        setModalMessage(responseJson.message);
        setModalVisible(true);
        setNewPassword(false);
      }
    } catch (error) {
      setModalMessage('Informação não atualizada: ' + error.message);
      setModalVisible(true);
      setNewPassword(false);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }

  async function putSalvarSenha() {
    if (!validateFields()) return;

    setIsLoading(true); 
    try {
      const url = `${ApiURL}/novaSenha`;
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ email: email, senha: senha }),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      });

      const responseJson = await response.json();

      if (response.ok) {
        setModalMessage(responseJson.message);
        setModalVisible(true);
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('Login'));
        }, 1000);
      } else {
        setModalMessage(responseJson.message);
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage('Informação não atualizada: ' + error.message);
      setModalVisible(true);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <View style={styles.card}>
        {!newPassword ? (
          <>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={'Email'}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
            {codigoVisivel && (
              <TextInput
                value={codigo}
                onChangeText={setCodigo}
                placeholder={'Código de recuperação'}
                style={styles.input}
                placeholderTextColor="#aaa"
              />
            )}
            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={codigoVisivel ? postValidarCodigo : postEnviarCodigo}
              disabled={isLoading} 
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" /> 
              ) : (
                <Text style={styles.buttonText}>
                  {codigoVisivel ? 'Verificar Código' : 'Enviar Código'}
                </Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              value={senha}
              onChangeText={setSenha}
              placeholder={'Nova Senha'}
              style={styles.input}
              placeholderTextColor="#aaa"
              secureTextEntry={true}
            />
            <TextInput
              value={confirmaSenha}
              onChangeText={setConfirmaSenha}
              placeholder={'Confirmar Nova Senha'}
              style={styles.input}
              placeholderTextColor="#aaa"
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]} 
              onPress={putSalvarSenha}
              disabled={isLoading} 
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" /> 
              ) : (
                <Text style={styles.buttonText}>
                  Salvar senha
                </Text>
              )}
            </TouchableOpacity>
          </>
        )}
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
        isVisible={isModalVisible}
        backdropColor="rgba(0, 0, 0, 0.5)"
        backdropOpacity={0.5}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalMessage}</Text>
        </View>
      </Modal>
    </View>
  );
}

export default Recuperar;