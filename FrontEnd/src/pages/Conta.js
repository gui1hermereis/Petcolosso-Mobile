import { View, Text, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import styles from '../styles/styles';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Conta = () => {
  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deslogar: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingBottom: 0, alignItems: 'center' }}>
          <Image style={{ height: 300, width: 300 }} source={require("../assets/logo.png")} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Conta;