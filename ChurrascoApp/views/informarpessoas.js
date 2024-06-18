import { useState, useEffect} from 'react';
import {Text, Image, Button, View, StyleSheet, TextInput, ScrollView, BackHandler} from 'react-native';
import * as SecureStore from 'expo-secure-store';

const InformarPessoas = ({navigation}) => {
    
    const [homens, setHomens] = useState('0');
    const [mulheres, setMulheres] = useState('0');
    const [criancas, setCriancas] = useState('0');

    const handleCalcular = async () => {
      const homensValue = homens === '' ? '0' : homens;
      const mulheresValue = mulheres === '' ? '0' : mulheres;
      const criancasValue = criancas === '' ? '0' : criancas;
      await SecureStore.setItemAsync('homens', homensValue);
      await SecureStore.setItemAsync('mulheres', mulheresValue);
      await SecureStore.setItemAsync('criancas', criancasValue);
      navigation.navigate("Cálculo Final");
    }

    useEffect(() => {
      const backAction = () => {
        navigation.navigate('Menu'); 
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, []);

    return (
      <ScrollView>
            <View style={styles.container}>
                <Image source={require('../assets/logo.png')} style={styles.image} />
                <Text style={styles.text}>Informe a quantidade de pessoas para realizar o cálculo:</Text>

                <Text style={styles.label}>Mulheres</Text>
                <TextInput
                    style={styles.textinput}
                    keyboardType="numeric"
                    onChangeText={text => setMulheres(text)} 
                    value={mulheres} 
                />

                <Text style={styles.label}>Homens</Text>
                <TextInput
                    style={styles.textinput}
                    keyboardType="numeric"
                    onChangeText={text => setHomens(text)}
                    value={homens}
                />

                <Text style={styles.label}>Crianças</Text>
                <TextInput
                    style={styles.textinput}
                    keyboardType="numeric"
                    onChangeText={text => setCriancas(text)}
                    value={criancas}
                />

                <View style={styles.calcularButton}>
                    <Button color={'#870517'} title="Calcular" onPress={handleCalcular} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center',
},
text:{
  margin: '5%',
  fontSize: 20,
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
calcularButton:{
  marginTop: 20,
}
})

export default InformarPessoas;