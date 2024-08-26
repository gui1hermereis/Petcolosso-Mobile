import * as React from 'react';
import {Image, View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import {StackActions} from '@react-navigation/native';

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
							<Text style={{fontWeight: 'bold'}}>
								Tem certeza que deseja finalizar a compra?
							</Text>
        </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.dispatch(StackActions.replace('Inicio')) +
          alert("Pedido concluido com sucesso, obrigado pela confiança")}>
          <Text>Confirmar compra</Text>
        </TouchableOpacity>

       <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.dispatch(StackActions.replace('Inicio'))}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Finalizarcompra;
const styles = StyleSheet.create({
button: {
    width: "100%",
    height: 40,   
    padding: 10,
    marginTop: 5,     
    borderWidth: 1,
    borderColor: '#bd75f0',
    marginBottom: 10,
    borderRadius:5,
    backgroundColor: "#bd75f0",
    alignItems: 'center',
    color: 'white',    
  },
});