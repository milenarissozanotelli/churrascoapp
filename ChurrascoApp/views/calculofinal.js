import { Button, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';

// Quantidades por pessoa
const CARNE_POR_PESSOA = 0.55; // em kg
const LINGUICA_POR_PESSOA = 0.20; // em kg
const PAO_POR_PESSOA = 3; // em unidades
const CERVEJA_POR_PESSOA = 10; // em unidades
const REFRIGERANTE_POR_PESSOA = 1; // em litros
const FAROFA_POR_PESSOA = 1; // em pacotes
const SAL_GROSSO_POR_PESSOA = 1; // em pacotes
const CARVAO_POR_PESSOA = 1; // em pacotes

export function calcularChurrasco(numHomens, numMulheres, numCriancas) {
    let totalPessoas = numHomens + numMulheres + numCriancas;

    let carne = CARNE_POR_PESSOA * totalPessoas;
    let linguica = LINGUICA_POR_PESSOA * totalPessoas;
    let pao = PAO_POR_PESSOA * totalPessoas;
    let cerveja = CERVEJA_POR_PESSOA * totalPessoas;
    let refrigerante = REFRIGERANTE_POR_PESSOA * totalPessoas;
    let farofa = FAROFA_POR_PESSOA * totalPessoas;
    let sal_grosso = SAL_GROSSO_POR_PESSOA * totalPessoas;
    let carvao = CARVAO_POR_PESSOA * totalPessoas;

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
}

export default function CalculoFinal({navigation}) {
    const [numHomens, setNumHomens] = useState(0);
    const [numMulheres, setNumMulheres] = useState(0);
    const [numCriancas, setNumCriancas] = useState(0);
    const [resultado, setResultado] = useState({});

    const handleCalculate = () => {
        const res = calcularChurrasco(numHomens, numMulheres, numCriancas);
        setResultado(res);
    };

    useEffect(() => {
        const res = calcularChurrasco(numHomens, numMulheres, numCriancas);
        setResultado(res);
      }, [numHomens, numMulheres, numCriancas]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resultado:</Text>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Carne: 3 kg</Text>
                <Text style={styles.text}>Linguiça: 1 kg</Text>
                <Text style={styles.text}>Pão: 6 unidades</Text>
                <Text style={styles.text}>Cerveja: 5 litros</Text>
                <Text style={styles.text}>Refrigerante: 2 litros</Text>
                <Text style={styles.text}>Farofa: 1 pacote</Text>
                <Text style={styles.text}>Sal Grosso: 500 gramas</Text>
                <Text style={styles.text}>Carvão: 1 kg</Text>
            </View>
            <View style={styles.button}>
                <Button color={'#870517'} title="Compartilhar"></Button>
            </View>
            <View style={styles.button}>
                <Button color={'#870517'} title="Salvar"></Button>
            </View>         
        </View>
      );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});
