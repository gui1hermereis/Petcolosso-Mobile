import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ApiURL } from '../configs';
import Modal from 'react-native-modal';
import styles from '../styles/styles';
import { MaterialIcons } from 'react-native-vector-icons';
import { CartContext } from '../contexts/CartContext'; 
import { useApi } from '../contexts/ApiContext'; 

const Inicio = ({ route, navigation }) => {
  const [servicos, setServicos] = useState([]);
  const [isErrorModalServicos, setErrorModalServicos] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [searchText, setSearchText] = useState('');

  const { carrinho, addServ, getTotal } = useContext(CartContext); 

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await fetch(`${ApiURL}/servicos`);
        const data = await response.json();
        setServicos(data);
      } catch (error) {
        console.error('Erro ao buscar serviços:', error);
      }
    };

    fetchServicos();
  }, []);

  const clickItemFlatList = (item) => {
    const exist = carrinho.find(serv => serv.id === item.id);

    if (!exist) {
      addServ({ id: item.id, descricao: item.descricao, valor: item.valor });
      setModalMessage(`Serviço ${item.descricao} adicionado ao pedido.`);
    } else {
      setModalMessage("Serviço já selecionado!!");
    }

    setErrorModalServicos(true);
  };

  const filteredServicos = servicos.filter(servico =>
    servico.descricao.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar serviços..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            style={styles.iconCart}
            onPress={() => navigation.navigate('Carrinho')}
          >
            <MaterialIcons name="shopping-cart" size={40} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, padding: 16 }}>
          <FlatList
            data={filteredServicos}
            keyExtractor={(item) => item.id.toString()}
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
                    styles.elementsContainer
                  ]}>
                    <View style={{
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
      </View>
    </SafeAreaView>
  );
};

export default Inicio;