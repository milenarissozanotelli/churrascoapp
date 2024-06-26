import {Text, Image, Button, View, StyleSheet, BackHandler} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

const Menu = ({navigation}) => {

    const handleLogout = async () => {
        try{
            await SecureStore.deleteItemAsync('id');
            navigation.navigate('Login');  
        } catch (error) {
            console.error('Failed to reload the app:', error);
        }
    };

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
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style = {styles.image}></Image>
            <View style={styles.dividingLine}>
                <Text style = {styles.text}>Escolha o que deseja:</Text>
            </View>
            <View style = {styles.button}>
                <Button color={'#870517'} title="Calcular" onPress={() => navigation.navigate('Informar Pessoas')} />
            </View>
            <View style = {styles.button}>
                <Button color={'#870517'} title="Listas Salvas" onPress={() => navigation.navigate('Listas Salvas')} />
            </View>   
            <View style = {styles.logoutButton}>
                <Button color={'#870517'} title="Sair" onPress={handleLogout} />
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
      fontSize: 20,
      fontWeight: 'bold',
    },
    image:{
      height: 100,
      aspectRatio: 677/238,
      marginBottom: 20,
    },
    button: {
        marginBottom:30,
    },
    logoutButton:{
        position:'absolute',
        bottom: 20,

    },
    dividingLine:{
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#870517',
        marginBottom: 30
    }
  })
  

export default Menu;