import { StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';
import {useState} from 'react';

const Cadastro = ({navigation}) => {

    const handleCadastro = () => {
        // Implementar a lógica de cadastro
        navigation.navigate('Login')
    };
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    return (
        <View style={styles.container} >
            <Image source={require('../assets/logo.png')} style = {styles.image}></Image>
            <Text style={styles.text}>Para se cadastrar, informe os dados a seguir:</Text>
            <Text style={styles.label}>Nome</Text>
            <TextInput style ={styles.textinput} placeholder="Digite seu Nome" onChangeText={setNome} value={nome}></TextInput>
            <Text style={styles.label}>Email</Text>
            <TextInput style ={styles.textinput} placeholder="Digite seu Email" onChangeText={setEmail} value={email} autoCapitalize='none'/>
            <Text style={styles.label}>Senha</Text>
            <TextInput style ={styles.textinput} placeholder="Digite sua Senha" onChangeText={setPassword} value={password} secureTextEntry = {true} autoCapitalize='none'/>
            <Text style={styles.label}>Confime sua Senha</Text>
            <TextInput style ={styles.textinput} placeholder="Confirme sua Senha" onChangeText={setPasswordConfirmation} value={passwordConfirmation} secureTextEntry = {true} autoCapitalize='none'/>
            <View style = {styles.cadastroButton}>
                <Button color={'#870517'} title="Cadastrar" onPress={handleCadastro} />
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
    text:{
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
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
    label:{
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 5,
      marginTop: 10,
    },
    cadastroButton:{
      marginTop: 20,
    }
  })
  

export default Cadastro;