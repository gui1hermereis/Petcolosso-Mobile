import React, { useState } from 'react';
import { Image, Alert, Button, TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import {StackActions} from '@react-navigation/native';

const Login = ({ route, navigation }) => {  
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  
async function postLogin() {
    var url= "https://demo2830366.mockable.io/login"
      const infoResponse = await   fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
      })
        
      .then((response) => response.json()) 
      .then((responseJson) => { 
              
      if ((responseJson.username==username)&&(responseJson.password==password)){
          global.TOKEN=responseJson.token
          navigation.dispatch(StackActions.replace('Inicio'))
          }
      else{
          global.TOKEN=''
          alert("acesso não permitido")
          }
      })
      .catch((error) => {
        
          alert('Informação não atualizada: '+error)
      });
    }

    return (      
      <View style={styles.container}>        
        <View style={{paddingBottom:0,}}>
          <Image style={{height:300, width:300}} 
            source={require("../assets/logo.png")}/>
        </View>

        <TextInput
          value={username}
          onChangeText={(username) => setUsername(username)}
          placeholder={'Login'}
          style={styles.input}/>

        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder={'Senha'}
          secureTextEntry={true}
          style={styles.input}/>

        <TouchableOpacity
              style={styles.button}
              onPress={() => postLogin()}>
              <Text style={{color:"white", padding:10}}>LOGIN </Text>
        </TouchableOpacity>
      </View>
    );
  }
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding:50,
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#bd75f0',
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 40,        
    borderWidth: 1,
    borderColor: '#bd75f0',
    marginBottom: 10,
    borderRadius:5,
    backgroundColor: "#bd75f0",
     alignItems: 'center',
  },
});