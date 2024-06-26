import { Button, StyleSheet, Text, View, TextInput, ScrollView, BackHandler} from 'react-native';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

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
export default function CalculoFinal({navigation}) {

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

        getPessoas();
    }, []);

    useEffect(() => {
        const backAction = () => {
          navigation.navigate('Informar Pessoas');  // Substitua 'Specific' pela tela específica desejada
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    const handleSalvar = async(e) => {
        e.preventDefault();
        const userId = await SecureStore.getItemAsync('id');
        const numHomens = await SecureStore.getItemAsync('homens');
        const numMulheres = await SecureStore.getItemAsync('mulheres');
        const numCriancas = await SecureStore.getItemAsync('criancas');
        try{
            const response = await fetch('https://apichurrascoapp.onrender.com/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title:nome, userId, people: [{man: numHomens, woman: numMulheres, children: numCriancas}] }),
            });
            const data = await response.json();
            if (response.ok){
                await SecureStore.setItemAsync('listTitle', data.title);
                await SecureStore.setItemAsync('listId', data._id);
                alert('Lista salva com sucesso!');
                navigation.navigate('Exibir Lista');
            } else {
                alert(data.message || data);
            }
        }
        catch(error){
            console.error('Network error:', error);
            Alert.alert('Network error, please try again later');
        }
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            <TextInput style ={styles.textinput} placeholder="De um nome a sua lista:" onChangeText={setNome} value={nome}></TextInput>
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
                <Button color={'#870517'} title="Salvar" onPress={handleSalvar} />
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
