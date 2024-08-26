import React, {Component, useState, useEffect} from 'react';
import {FlatList, StyleSheet,View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import {StackActions} from '@react-navigation/native';

const Carrinho = ({ route, navigation }) => {
const [carrinho, setCarrinho] = useState(route.params.carrinhoParams);

if(carrinho < 1){
 alert ("Nenhum serviço no carrinho!!");
 navigation.dispatch(StackActions.replace('Servico', {atualizarParams: null}))
}

const removeServ = (item) => {
  let carrinho_temp = carrinho.filter((item2) => item2.id != item.id).map(({
      id,
      descricao,
      valor
    }) => ({
      id,
      descricao,
      valor
    })
  )

  setCarrinho(carrinho_temp);
  alert("Serviço removido!!");
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
        renderItem={({item}) => (
          <TouchableOpacity onPress={ () => removeServ(item)}>  
            <View style={{
              borderBottomWidth:1, 
              borderTopWidth:1, 
              borderLeftWidth:1, 
              borderRightWidth:1, 
              borderRadius:5,                             
              backgroundColor: "white"
            }}> 

            <View style={[
              {flexDirection:'row', 
              alignContent:"center"}, 
              styles.elementsContainer
            ]}>    

            <View style={{ 
              width: "50%", 
              height:100, 
              alignItems:"center", 
              backgroundColor: 'white'
            }}>

              <View style={{padding:10}}>
                  <Image style={{height:80, width:80}} 
                  source={require("../assets/logo1.png")}/>  
              </View>  
            </View> 

            <View style={
              {width: "50%", 
              height:100, 
              alignItems:"center", 
              backgroundColor: 'white'}
            }>

            <View style={{padding:10}}>
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
          onPress={() => navigation.dispatch(StackActions.replace('Servico', {atualizarParams: carrinho}))}>
          <Text>Ver serviços</Text>
        </TouchableOpacity>

         <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.dispatch(StackActions.replace('Finalizarcompra'))+
          alert('Valor total: '+  global.totalPago + ' Reais')}>
          <Text>finalizar compra</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default Carrinho;

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

    fontTexto: { 
      margin: 4,
      fontWeight: 'italic',
      fontSize:10,
      fontFamily:'century gothic',
      color:"black"
    },
});