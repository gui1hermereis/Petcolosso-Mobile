import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import { MaterialIcons } from 'react-native-vector-icons';
import styles from '../styles/styles';
import { useCart } from '../contexts/CartContext'; 

const Conta = ({ navigation }) => {
  const { carrinho } = useCart(); 

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
      <View style={{ flex: 1 }}>
        <View style={[styles.header, { justifyContent: 'flex-start' }]}>
          <TouchableOpacity
            style={[styles.iconCart, { marginLeft: 0 }]} 
            onPress={() => navigation.navigate('Carrinho', { carrinhoParams: carrinho })}
          >
            <MaterialIcons name="shopping-cart" size={40} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={{ paddingBottom: 0, alignItems: 'center' }}>
          <Image style={{ height: 300, width: 300 }} source={require("../assets/logo.png")} />
        </View>
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

export default Conta;
