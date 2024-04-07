import { StyleSheet, Text, View, Button, Image, TextInput} from 'react-native';
import {useState} from 'react';
import SobreButton from '../components/sobreButton';

const Login = ({navigation}) => {
  
  const handleLogin = () => {
    // Implementar a lógica de login
    navigation.navigate('Menu')
  }
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
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
  },
  loginbutton: {

  },
  cadastroButton: {
    position: 'absolute',
    bottom: 50,

  },
});

export default Login;