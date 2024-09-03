import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import styles from '../styles/styles';
import { CartContext } from '../contexts/CartContext';

const Carrinho = () => {
  const { carrinho, removeServ, getTotal } = useContext(CartContext);
  const [isErrorModalCarrinho, setErrorModalCarrinho] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 17,
              textAlign: 'center',
            }}>
            {carrinho.length > 0 ? (
              "Selecione o item caso queira excluir"
            ) : (
              "Nenhum produto no carrinho"
            )}
          </Text>
        </View>
        <FlatList
          data={carrinho}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              removeServ(item);
              setModalMessage("Serviço removido!!");
              setErrorModalCarrinho(true);
            }}>
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

                  <View style={{
                    width: "50%",
                    height: 100,
                    alignItems: "center",
                    backgroundColor: 'white'
                  }}>
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
        {carrinho.length > 0 &&
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalMessage('Valor total: ' + getTotal() + ' Reais');
              setErrorModalCarrinho(true);
            }}
          >
            <Text style={styles.buttonText}>Finalizar compra</Text>
          </TouchableOpacity>
        }

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