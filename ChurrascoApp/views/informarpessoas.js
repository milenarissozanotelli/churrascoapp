import {Text, Image, Button, View, StyleSheet, TextInput} from 'react-native';

const InformarPessoas = ({navigation}) => {
    
    const handleCalcular = () => {
        // Implementar a lógica do cálculo
    }

    return (
        <View style={styles.container} >
            <Image source={require('../assets/logo.png')} style = {styles.image}></Image>
            <Text style={styles.text}>Informe a quantidade de pessoas para realizar o cálculo:</Text>
            <Text style={styles.label}>Mulheres</Text>
            <TextInput style ={styles.textinput}></TextInput>
            <Text style={styles.label}>Homens</Text>
            <TextInput style ={styles.textinput}></TextInput>
            <Text style={styles.label}>Crianças</Text>
            <TextInput style ={styles.textinput}></TextInput>
            <View style = {styles.cadastroButton}>
                <Button color={'#870517'} title="Calcular" onPress={handleCalcular} />
            </View>
        </View>
    );
};

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

export default InformarPessoas;