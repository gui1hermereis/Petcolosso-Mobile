import * as React from 'react';
import { StyleSheet,View, Text, SafeAreaView, TouchableOpacity,Image } from 'react-native';
import {StackActions} from '@react-navigation/native';

const Incio = ({ route, navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text
          style={{
          fontSize: 25,
          textAlign: 'center',
          marginBottom: 0,
          fontFamily:'Anton',
          color:'#7c553a',      
        }}>
        </Text>
        <View style={{paddingBottom:0, alignItems: 'center',}}>
          <Image style={{height:300, width:300}} 
          source={require("../assets/logo.png")}/>
        </View>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.dispatch(StackActions.replace('Servico', {atualizarParams: null}))}>
          <Text>Serviços</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.dispatch(StackActions.replace('Login'))}>
          <Text>Sair</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
};

export default Incio;
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