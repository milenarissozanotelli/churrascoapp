import { StyleSheet, Text, View, Image} from 'react-native';

const Sobre = () => {
    return (
        <View style = {styles.container}>
            <Image source={require('../assets/logo.png')} style = {styles.image}></Image>
            <View style = {styles.textContainer}>
                <Text style = {styles.text}>  O ChurrascoApp é seu companheiro essencial para planejar churrascos memoráveis com facilidade. Não importa se você está
                    organizando uma reunião casual com amigos ou um grande evento, este aplicativo intuitivo está aqui para simplificar o processo
                    de organização, permitindo que você se concentre no que realmente importa: aproveitar o tempo com seus convidados.
                </Text>
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
    image:{
        height: 100,
        aspectRatio: 677/238,
        marginBottom: 20,
    },
    text:{
        fontSize: 20,
        textAlign: 'justify',
    },
    textContainer:{
        margin: 20,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#870517',
    }
});

export default Sobre;