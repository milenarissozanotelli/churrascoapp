import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

const ListasSalvas = ({ navigation }) => {

  const listasSalvas = [
    { id: 1, nome: 'Lista 1' },
    { id: 2, nome: 'Lista 2' },
    { id: 3, nome: 'Lista 3' },
  ];

  // Função para lidar com o clique em um item da lista
  const handleListaPress = (lista) => {
    navigation.navigate("Cálculo Final");
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.image} />
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Listas Salvas</Text>
        <View style={styles.line}></View>
      </View>

      <View style={styles.separator} />

      <FlatList
        data={listasSalvas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listaContainer}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleListaPress(item)}>
            <Text style={styles.item}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 40, 
  },
  image: {
    height: 100,
    aspectRatio: 677/238,
    marginBottom: 20,
  },
  titleContainer: {
    marginBottom: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '50%', 
    marginBottom: 20, 
  },
  listaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    fontSize: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ListasSalvas;
