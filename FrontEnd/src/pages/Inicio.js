import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import * as React from 'react';
import styles from '../styles/styles';

const Inicio = ({ navigation }) => {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('Token removido com sucesso');
      navigation.dispatch(StackActions.replace('Login'));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deslogar: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            marginBottom: 20,
            fontFamily: 'Anton',
            color: '#7c553a',
          }}
        >
          Bem-vindo!
        </Text>
        <View style={{ paddingBottom: 0, alignItems: 'center' }}>
          <Image style={{ height: 300, width: 300 }} source={require("../assets/logo.png")} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.dispatch(StackActions.replace('Servico', { atualizarParams: null }))}
        >
          <Text style={styles.buttonText}>Serviços</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={logout}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Inicio;  