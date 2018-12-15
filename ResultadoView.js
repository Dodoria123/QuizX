import React from 'react';
import { StyleSheet, Text, TextInput,
     View, Button, Platform, Image } from 'react-native';
import * as firebase from 'firebase';

var qtdAcertos = 0;

export default class ResultadoView extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = { qtdAcertosTeste: 0 };
    }
    componentWillMount() {
        console.log("componentWillMount")
        qtdAcertos = this.props.navigation.state.params.param;
        if (qtdAcertos == null){
            qtdAcertos = 0;
        }
        this.setState({ qtdAcertosTeste: qtdAcertos });

        this.atualizarQuantidadeaAcerto();
    }
    componentDidMount() {
        console.log("componentDidMount")  
    }

    dataAtualFormatada() {
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(),
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }

    async atualizarQuantidadeaAcerto() {
        try {
            const currentUser = await firebase.auth().currentUser
            const id  = await currentUser.uid
            var today = new Date();
            var options = {year: 'numeric', month: '2-digit', day: '2-digit'};
            const result = firebase.database().ref('users/' + id);
            result.update({
                qtdAcertosUsuario: qtdAcertos,
                dataJogo: this.dataAtualFormatada() });
          } catch (error) {
            console.log(error.toString())
          } 
    }

    render() {
        return (
            <View style={styles.container}>
            <View style={{flex: 1}}>
                <View style={{flex: 2, backgroundColor: 'powderblue', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 110}}> </Text>
                    <View style={{flex: 1, backgroundColor: 'red', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 23, color: 'white'}}>Você acertou {qtdAcertos} perguntas de um total de 5!</Text>
                    </View>
                </View>
                <View style={{flex: 1, backgroundColor: 'steelblue'}}>
                </View>
                <View style={{flex: 2, backgroundColor: 'steelblue'}}>
                    <Button style={styles.button}
                        onPress={() => this.props.navigation.navigate('Ranking')}
                        title="Ranking"/>
                    <Text style={{fontWeight: 'bold', fontSize: 10}}> </Text>
                </View>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-between',
    },
    text: { 
      backgroundColor: Platform.OS === 'android' ? '#ff0000' : '#00ff00',
    },
    input: {
      height: 40,
      width: 100,
      borderColor: 'gray',
      backgroundColor: '#ddd'
    },
    button: {
      fontSize: 55,
      borderColor: 'red',
      borderWidth: 5,
      borderRadius: 15,
      backgroundColor: '#00aeef'
    },
    containerresultado: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: 'blue',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  });