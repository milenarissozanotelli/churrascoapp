import { Button, StyleSheet, Text, View, ScrollView, BackHandler} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

//de onde pegar os dados, mudar textinput para nome lista, trocar salvar por deletar, listId secureStore

// Quantidades por pessoa
const CARNE_POR_PESSOA = 0.5; // em kilogramas
const LINGUICA_POR_PESSOA = 0.06; // em kilogramas
const PAO_POR_PESSOA = 1.5; // em unidades
const CERVEJA_POR_PESSOA = 1; // em litros
const REFRIGERANTE_POR_PESSOA = 0.75; // em litros
const FAROFA_POR_PESSOA = 0.35; // em pacotes
const SAL_GROSSO_POR_PESSOA = 0.15; // em pacotes
const CARVAO_POR_PESSOA = 5; // em kgs

const calcularChurrasco = (numHomens, numMulheres, numCriancas) => {
    let totalPessoas = parseInt(numHomens) + parseInt(numMulheres) * 3/4 + parseInt(numCriancas) * 2/3;
    let totalAdultos = parseInt(numHomens) + parseInt(numMulheres);

    let carne = (CARNE_POR_PESSOA * totalPessoas).toFixed(2);
    let linguica = (LINGUICA_POR_PESSOA * totalPessoas).toFixed(2); 
    let pao = Math.ceil(PAO_POR_PESSOA * totalPessoas);
    let cerveja = (CERVEJA_POR_PESSOA * totalAdultos).toFixed(2);
    let refrigerante = (REFRIGERANTE_POR_PESSOA * (totalAdultos/2 + numCriancas)).toFixed(2);
    let farofa = Math.ceil(FAROFA_POR_PESSOA * totalPessoas);
    let sal_grosso = Math.ceil(SAL_GROSSO_POR_PESSOA * totalPessoas);
    let carvao = (CARVAO_POR_PESSOA * totalPessoas).toFixed(2);

    return {
        carne: carne,
        linguica: linguica,
        pao: pao,
        cerveja: cerveja,
        refrigerante: refrigerante,
        farofa: farofa,
        sal_grosso: sal_grosso,
        carvao: carvao
    };
};
export default function ExibirLista({navigation}) {

    const [nome, setNome] = useState('');

    const [resultados, setResultados] = useState({
        carne: '0.00',
        linguica: '0.00',
        pao: 0,
        cerveja: 0,
        refrigerante: 0,
        farofa: 0,
        sal_grosso: 0,
        carvao: 0
    });

    useEffect(() => {
        const backAction = () => {
          navigation.navigate('Listas Salvas');  // Substitua 'Specific' pela tela específica desejada
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);


    const getPessoas = async () => {
        try {
            const numHomens = await SecureStore.getItemAsync('homens');
            const numMulheres = await SecureStore.getItemAsync('mulheres');
            const numCriancas = await SecureStore.getItemAsync('criancas');

            const resultadosCalculados = calcularChurrasco(numHomens, numMulheres, numCriancas);
            setResultados(resultadosCalculados);
        } catch (error) {
            console.error('Erro ao obter dados do SecureStore:', error);
            alert('Erro ao obter dados do SecureStore. Tente novamente.');
        }
    };

    const getTitleAndPessoas = async () => {
        try {
            const listTitle = await SecureStore.getItemAsync('listTitle');
            setNome(listTitle);
            await getPessoas();
        } catch (error) {
            console.error('Erro ao obter o título da lista do SecureStore:', error);
            alert('Erro ao obter o título da lista do SecureStore. Tente novamente.');
        }
    };

    useFocusEffect(
        useCallback(() => {
          getTitleAndPessoas();
        }, [])
      );

    const handleDeletar = async(e) => {
        e.preventDefault();
        try{
            const listId = await SecureStore.getItemAsync('listId');
            const response = await fetch(`https://apichurrascoapp.onrender.com/list/${listId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok){
                alert('Lista excluída com sucesso!');
                navigation.navigate('Listas Salvas');
            } else {
                alert('Erro ao excluir lista. Tente novamente.');
            }
        } catch (error){
            console.error('Erro ao excluir lista:', error);
            alert('Erro ao excluir lista. Tente novamente.');
        }
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.title}>{nome}</Text>
            <Text style={styles.title}>Resultado do Churrasco:</Text>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Carne: {resultados.carne} kg</Text>
                <Text style={styles.text}>Linguiça: {resultados.linguica} kg</Text>
                <Text style={styles.text}>Pão: {resultados.pao} unidades</Text>
                <Text style={styles.text}>Cerveja: {resultados.cerveja} litros</Text>
                <Text style={styles.text}>Refrigerante: {resultados.refrigerante} litros</Text>
                <Text style={styles.text}>Farofa: {resultados.farofa} pacote(s)</Text>
                <Text style={styles.text}>Sal Grosso: {resultados.sal_grosso} pacote(s)</Text>
                <Text style={styles.text}>Carvão: {resultados.carvao} kg</Text>
            </View>
            <View style={styles.button}>
                <Button color={'#870517'} title="Excluir Lista" onPress={handleDeletar} />
            </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10%'
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
    },
    title:{
        fontSize:25,
        fontWeight: 'bold',
    },
    button:{
        margin: 10,
    },
    textinput:{
        width: '80%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        fontSize: 20,
      },
});
