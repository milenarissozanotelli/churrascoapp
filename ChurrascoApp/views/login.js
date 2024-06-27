import { StyleSheet, Text, View, Button, Image, TextInput, Alert} from 'react-native';
import {useState} from 'react';
import SobreButton from '../components/sobreButton';
import * as SecureStore from 'expo-secure-store';

const Login = ({navigation}) => {
  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch('https://apichurrascoapp.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok){
        await SecureStore.setItemAsync('id', data._id);
        result = await SecureStore.getItemAsync('id');
        console.log(result);
        setEmail('');
        setPassword('');
        navigation.navigate('Menu');
      } else {
        Alert.alert('Email ou senha incorretos');
      }
    }catch(error){
      console.log(error);
    }
  }
  
  
  return (
    <View style = {styles.container}>
      <View style = {styles.sobre}>
        <SobreButton navigation ={navigation} style = {styles.sobre} />
      </View>
      <Text style={styles.text} >Seja bem-vindo(a)!</Text>
      <Image source={require('../assets/logo.png')} style = {styles.image}></Image>
      <TextInput style ={styles.textinput} placeholder="Digite seu Email" onChangeText={setEmail} value={email} autoCapitalize='none'/>
      <TextInput style ={styles.textinput} placeholder="Digite sua Senha" onChangeText={setPassword} value={password} secureTextEntry = {true} autoCapitalize='none'/>
      <View style = {styles.loginbutton}>
        <Button color={'#870517'} title="Login" onPress = {handleLogin} />  
      </View>
      <View style = {styles.cadastroButton}>
        <Text>Não tem uma conta?</Text>
        <Button color={'#870517'} title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    height: '100%',
  },
  sobre:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 20,
  },
  text:{
    fontSize: 25,
    fontWeight: 'bold',
  },
  image:{
    height: 100,
    aspectRatio: 677/238,
    marginBottom: 20,
  },
  textinput:{
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  loginbutton: {
    marginBottom: 20,

  },
  cadastroButton: {
    marginTop: '55%',
  },
})

export default Login;