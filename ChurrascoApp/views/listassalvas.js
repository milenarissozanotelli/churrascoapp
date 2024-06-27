import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, BackHandler, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

const ListasSalvas = ({ navigation }) => {
  const [listasSalvas, setListasSalvas] = useState([]);

  const handleListaPress = async (lista) => {
    const listId = lista._id;
    const listTitle = lista.title;
    const people = lista.people[0];
    const homens = people.man;
    const mulheres = people.woman;
    const criancas = people.children;

    try {
      await SecureStore.setItemAsync('listId', listId);
      console.log('listId:', await SecureStore.getItemAsync('listId'));
      await SecureStore.setItemAsync('listTitle', listTitle);
      console.log('listTitle:', await SecureStore.getItemAsync('listTitle'));
      await SecureStore.setItemAsync('homens', homens.toString());
      console.log('homens:', await SecureStore.getItemAsync('homens'));
      await SecureStore.setItemAsync('mulheres', mulheres.toString());
      console.log('mulheres:', await SecureStore.getItemAsync('mulheres'));
      await SecureStore.setItemAsync('criancas', criancas.toString());
      console.log('criancas:', await SecureStore.getItemAsync('criancas'));
      navigation.navigate("Exibir Lista");
    } catch (error) {
      console.error('Erro ao salvar dados da lista:', error);
    }
    
  };

  const getListasSalvas = async () => {
    const userId = await SecureStore.getItemAsync('id');
    try {
      const response = await fetch(`https://apichurrascoapp.onrender.com/list/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setListasSalvas(result.lists);
    } catch (error) {
      console.error('Erro ao buscar listas salvas:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getListasSalvas();
    }, [])
  );

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Menu');
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView>
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.image} />
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Listas Salvas</Text>
        <View style={styles.line}></View>
      </View>

      <View style={styles.separator} />

      <FlatList
        data={listasSalvas}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listaContainer}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleListaPress(item)}>
            <Text style={styles.item}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
    </ScrollView>
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
