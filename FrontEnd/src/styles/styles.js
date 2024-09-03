import { Header } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f8f8f8',  
    alignItems: 'center',
    justifyContent: 'space-between', 
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',  
  },
  searchInput: {
    flex: 1,  
    height: 40,
    borderColor: '#ddd',  
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff', 
  },
  iconCart:{
    padding: 10,
    alignItems: 'left',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    marginBottom: 40,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: '#bd75f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 15,
    borderWidth: 1,
    borderColor: '#bd75f0',
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#bd75f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#555',
    fontSize: 14,
  },
  link: {
    color: '#bd75f0',
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: -550,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
  fontTexto: {
    margin: 4,
    fontWeight: 'italic',
    fontSize: 10,
    fontFamily: 'century gothic',
    color: "black"
  },
});

export default styles;