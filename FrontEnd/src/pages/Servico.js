import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { ApiURL } from '../configs';
import Modal from 'react-native-modal';
import styles from '../styles/styles';

const Servico = ({ route, navigation }) => {
  const [servicos, setServicos] = useState([]);
  const [listaServicosSelecionados, setListaServicosSelecionados] = useState([]);
  const [atualizar, setAtualizar] = useState(route.params.atualizarParams);
  const [isErrorModalServicos, setErrorModalServicos] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  function getServicos() {
    fetch(`${ApiURL}/servicos`)
      .then((resp) => resp.json())
      .then((json) => setServicos(json))
  }

  useEffect(() => {
    getServicos();

    if (atualizar) {
      setListaServicosSelecionados(atualizar);
      setAtualizar(null);
    }
  }, []);

  const clickItemFlatList = (item) => {
    let exist = false;
    for (var i = 0; i < listaServicosSelecionados.length; i++) {
      if (item.id === listaServicosSelecionados[i].id) {
        exist = true;
        break;
      }
    }

    let total = 0
    if (!exist) {
      listaServicosSelecionados.push({ id: item.id, descricao: item.descricao, valor: item.valor });

      for (i = 0; i < listaServicosSelecionados.length; i++) {
        total = total + listaServicosSelecionados[i].valor
      }
      setModalMessage("Serviço " + item.descricao + " adicionado ao pedido.");
      setErrorModalServicos(true);
    } else { 
      setModalMessage("Serviço ja selecionado!!");
      setErrorModalServicos(true);
    }

    global.totalPago = total
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <FlatList
          data={servicos}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => clickItemFlatList(item)}>
              <View style={{
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderRadius: 5,
                backgroundColor: "white",
                padding: 10,
                marginBottom: 5,
              }}>

                <View style={[
                  {
                    flexDirection: 'row',
                    alignContent: "center"
                  },
                  styles.elementsContainer]
                }>
                  <View style={
                    {
                      width: "50%",
                      height: 150,
                      alignItems: "center",
                      backgroundColor: 'white',
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
          onPress={() => navigation.dispatch(StackActions.replace('Carrinho', { carrinhoParams: listaServicosSelecionados }))}>
          <Text style={styles.buttonText}>Ver pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.dispatch(StackActions.replace('Inicio'))}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <Modal
          isVisible={isErrorModalServicos}
          backdropColor="rgba(0, 0, 0, 0.5)"
          backdropOpacity={0.5}
          onBackdropPress={() => setErrorModalServicos(false)}
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

export default Servico;