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
        //this.showDetails = this.onClick.bind(this);// you should bind this to the method that call the props
    }
    componentWillMount() {
        console.log("componentWillMount")
        qtdAcertos = this.props.navigation.state.params.param;
        if (qtdAcertos == null){
            console.log('parm está nulo');
            qtdAcertos = 0;
        }
        this.setState({ qtdAcertosTeste: qtdAcertos });

        this.atualizarQuantidadeaAcerto();
    }
    componentDidMount() {
        console.log("componentDidMount")  
    }

    async atualizarQuantidadeaAcerto() {
        try {
            const currentUser = await firebase.auth().currentUser
            const id  = await currentUser.uid
            console.log(currentUser)
            console.log(id)
            console.log('acertos atualizado para: ' + qtdAcertos)
            // const result = firebase.database()
            //     .ref('users/' + id).child.set({
            //         qtdAcertosUsuario: qtdAcertos
            //         });
            const result = firebase.database().ref('users/' + id);
            result.update({
                qtdAcertosUsuario: qtdAcertos});
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
            {/* <PropComponent sexo={2} dataNasc="asadd"></PropComponent>
            <Text style={styles.text}>{this.props.name}</Text>
            <Text style={styles.text}>{this.state.myName}</Text>
             <Button style={styles.button}
              onPress={() => this.props.navigation.navigate('Details')}
              color="#ff0000"
              title="Meu Primeiro Button"/>
    
            <TextInput style={styles.input}
            onChangeText={(text) => {
                this.setState({
                myName : text
                })
            }}>
              
            </TextInput>
            <Image
            style={{height: 50, width: 50}}
            source={{uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}}/> */}
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