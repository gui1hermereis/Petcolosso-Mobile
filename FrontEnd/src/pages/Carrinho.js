import { useState, useEffect } from 'react';
import { FlatList, View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/styles';
import { ApiURL } from '../../configs';

const Carrinho = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCarrinho = async () => {
      try {
        const response = await fetch(`${ApiURL}/carrinho`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Erro ao buscar itens do carrinho:', error);
      }
    };

    fetchCarrinho();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 17,
              textAlign: 'center',
            }}>
          </Text>
        </View>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <TouchableOpacity>
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
        <TouchableOpacity >
          <Text style={styles.buttonText}>Finalizar compra</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Carrinho;