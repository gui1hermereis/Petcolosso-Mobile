import React, {Component, useState, useEffect} from 'react';
import {FlatList, StyleSheet,View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import {StackActions} from '@react-navigation/native';

const Servico = ({ route, navigation }) => {
const [corBack,setBack] = useState("yellow");
const [visualizaSelecionados,setVisualizaSelecionados]=useState(false);
const [servicos, setServicos] = useState([]);
  useEffect(() => {
  if (servicos == ""){
    getServicos();
  }
  if (atualizar) {
    setListaServicosSelecionados(atualizar);
    setAtualizar(null);
  }
});

const [listaServicosSelecionados, setListaServicosSelecionados]=useState([]);
const [atualizar, setAtualizar]=useState(route.params.atualizarParams);

const clickItemFlatList = (item) =>{
		let exist = false;
    for (var i=0; i < listaServicosSelecionados.length; i++) {
      if (item.idServ === listaServicosSelecionados[i].idServ) {
        exist = true;
        break;
      }
    }
    
    let total=0   
    if (!exist) {
      // somar
      listaServicosSelecionados.push({idServ: item.idServ, servico: item.servico, precoServico: item.precoServico});

      for ( i=0; i < listaServicosSelecionados.length; i++) {
        total = total + listaServicosSelecionados[i].precoServico
      }
      alert("Serviço "+item.servico+" adicionado ao pedido.");
    } else alert("Serviço ja selecionado!!");
    
   global.totalPago= total
}

function getServicos(){
  fetch('https://demo5233258.mockable.io/servicos')
  .then((resp) => resp.json())
  .then((json) => setServicos(json))
}

return (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, padding: 16 }}>
    <FlatList
      data={servicos}
      renderItem={({item}) => (
      <TouchableOpacity onPress={ () => clickItemFlatList(item)}>

        <View style={{
          borderBottomWidth:1, 
          borderTopWidth:1, 
          borderLeftWidth:1, 
          borderRightWidth:1, 
          borderRadius:5,                             
          backgroundColor: "white"}}> 

        <View style={[
          {flexDirection:'row', 
          alignContent:"center"}, 
          styles.elementsContainer]
        }>    

        <View style={
          {width: "50%", 
          height:100, 
          alignItems:"center", 
          backgroundColor: 'white'}}>

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

          <Text style={styles.fontTexto}>Código: {item.idServ}</Text>          
          <Text style={styles.fontTexto}>Nome: {item.servico} </Text> 
          <Text style={styles.fontTexto}>Valor: R$ {item.precoServico}</Text> 

        </View>  
        </View>                                    
        </View> 
        </View>   
        </TouchableOpacity>
      )}
    /> 
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.dispatch(StackActions.replace('Carrinho', {carrinhoParams:listaServicosSelecionados}))}>
        <Text>Ver pedidos</Text>
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

export default Servico;

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