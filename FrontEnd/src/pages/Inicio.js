import { useState, useEffect } from 'react';
import { FlatList, View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ApiURL } from '../../configs';
import styles from '../styles/styles';
import { MaterialIcons } from 'react-native-vector-icons';

const Inicio = ({ route, navigation }) => {
  const [produtos, setProdutos] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch(`${ApiURL}/produtos`);
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  const adicionarAoCarrinho = async (item) => {
    try {
      console.log('Item adicionado ao carrinho', item);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  const filteredProdutos = Array.isArray(produtos)
    ? produtos.filter(produto =>
      produto.descricao.toLowerCase().includes(searchText.toLowerCase())
    )
    : [];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar Produtos..."
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
            data={filteredProdutos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => adicionarAoCarrinho(item)}>
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Inicio;