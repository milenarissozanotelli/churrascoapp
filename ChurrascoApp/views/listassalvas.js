import {Image, View, StyleSheet} from 'react-native';

const ListasSalvas = ({navigation}) => {

    return (
        <View style={styles.container} >
            <Image source={require('../assets/logo.png')} style = {styles.image}></Image>           
        </View>
    );
};

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
})

export default ListasSalvas;