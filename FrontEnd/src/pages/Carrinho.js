import React, { Component, useState, useEffect } from 'react';
import { FlatList, View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { StackActions } from '@react-navigation/native';
import Modal from 'react-native-modal';
import styles from '../styles/styles';

const Carrinho = ({ route, navigation }) => {
  const [carrinho, setCarrinho] = useState(route.params.carrinhoParams);
  const [isErrorModalCarrinho, setErrorModalCarrinho] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (carrinho.length < 1) {
      setModalMessage("Nenhum serviço no carrinho!!");
      setErrorModalCarrinho(true);
      setTimeout(() => {
        navigation.dispatch(StackActions.replace('Servico', { atualizarParams: null }));
      }, 500);
    }
  }, [carrinho, navigation]);

   const removeServ = (item) => {
    let carrinho_temp = carrinho.filter((item2) => item2.id !== item.id);

    setCarrinho(carrinho_temp);

    if (carrinho_temp.length < 1) {
      setModalMessage("Nenhum serviço no carrinho!!");
      setErrorModalCarrinho(true);
      setTimeout(() => {
        navigation.dispatch(StackActions.replace('Servico', { atualizarParams: null }));
      }, 500);
    } else {
      setModalMessage("Serviço removido!!");
      setErrorModalCarrinho(true);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text
          style={{
            fontSize: 17,
            textAlign: 'center',
            marginBottom: 15,
          }}>
          Selecione o item caso queira excluir
        </Text>
        <FlatList
          data={carrinho}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => removeServ(item)}>
              <View style={{
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderRadius: 5,
                backgroundColor: "white"
              }}>

                <View style={[
                  {
                    flexDirection: 'row',
                    alignContent: "center"
                  },
                  styles.elementsContainer
                ]}>

                  <View style={{
                    width: "50%",
                    height: 150,
                    alignItems: "center",
                    backgroundColor: 'white'
                  }}>

                    <View style={{ padding: 10 }}>
                      <Image style={{ height: 150, width: 150 }}
                        source={require("../assets/logo1.png")} />
                    </View>
                  </View>

                  <View style={
                    {
                      width: "50%",
                      height: 100,
                      alignItems: "center",
                      backgroundColor: 'white'
                    }
                  }>
                    <View style={{ padding: 10 }}>
                      <Text style={styles.fontTexto}>Código: {item.id}</Text>
                      <Text style={styles.fontTexto}>Nome: {item.descricao} </Text>
                      <Text style={styles.fontTexto}>Valor: R$ {item.valor}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.dispatch(StackActions.replace('Servico', { atualizarParams: carrinho }))}>
          <Text style={styles.buttonText}>Ver serviços</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.dispatch(StackActions.replace('Finalizarcompra'));
            setModalMessage('Valor total: ' + global.totalPago + ' Reais');
            setErrorModalCarrinho(true);
          }}>
          <Text style={styles.buttonText}>Finalizar compra</Text>
        </TouchableOpacity>

        <Modal
          isVisible={isErrorModalCarrinho}
          backdropColor="rgba(0, 0, 0, 0.5)"
          backdropOpacity={0.5}
          onBackdropPress={() => setErrorModalCarrinho(false)}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
};

export default Carrinho;