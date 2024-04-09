import {Text, Image, Button, View, StyleSheet} from 'react-native';

const Menu = ({navigation}) => {

    const handleLogout = () => {
        navigation.navigate('Login');
    };
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
                <Button color={'#870517'} title="Listas Salvas" onPress={() => navigation.navigate('ListasSalvas')} />
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