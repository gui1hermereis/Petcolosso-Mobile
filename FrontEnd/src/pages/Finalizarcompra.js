import * as React from 'react';
import { Image, View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';
import styles from '../styles/styles';

const Finalizarcompra = ({ route, navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 17 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>

          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 6,
            }}>
          </Text>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontWeight: 'bold' }}>
              Tem certeza que deseja finalizar a compra?
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.dispatch(StackActions.replace('Inicio')) +
            alert("Pedido concluido com sucesso, obrigado pela confiança")}>
          <Text style={styles.buttonText}>Confirmar compra</Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.dispatch(StackActions.replace('Inicio'))}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Finalizarcompra;