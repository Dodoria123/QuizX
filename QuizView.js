import React from 'react';
import { StyleSheet, Text, TextInput,
     View, Button, Platform, Image, FlatList } from 'react-native';
import Style from './Style';
import listaQuizLocal from './quizquestionlist.json';

var qtdAcertos = 0;
var foiParaTelaResultado = false;

export default class LoginView extends React.Component {
    static navigationOptions = {
        title: 'Responda correto ou morra!',
        headerStyle: {
          backgroundColor: 'steelblue',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
        }
    };
    constructor(props) {
        super(props);
        this.state = { gameData: listaQuizLocal.games,
                       perguntaAtual: 0,
                       qtdAcertosTeste: 0 };
    }
    componentWillMount() {
        console.log("componentWillMount")
        this.setState({ gameData: listaQuizLocal.games });
        this.setState({ perguntaAtual: 0 });
        this.setState({ qtdAcertos: 0 });
        qtdAcertos = 0;
    }
    componentDidMount() {
        console.log("componentDidMount")  
    }

    _handleAnswerClick(itemCode){
        if (itemCode == this.state.gameData[this.state.perguntaAtual].quiz_option_code) {
            if (qtdAcertos == 0) {
                qtdAcertos = 1;   
            } else {
                qtdAcertos = qtdAcertos + 1;
            }
        }

        this.setState({perguntaAtual: this.state.perguntaAtual + 1});
        var arrLength = this.state.gameData.length - 1;

        if(!foiParaTelaResultado) {
            if (this.state.perguntaAtual >= arrLength) {
                this.props.navigation.navigate('Resultado', { param: qtdAcertos });
                this.setState({perguntaAtual: 0});
                qtdAcertos = 0;
                foiParaTelaResultado = true;                
            } else {
                this.props.navigation.navigate('Quiz');
            }
        } else {
            this.setState({perguntaAtual: 0});
            qtdAcertos = 0;
            foiParaTelaResultado = false;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={{flex: 4, backgroundColor: 'steelblue', alignItems: 'center'}}>
                        <Image
                            style={{width: 190, height: 120}}
                            source={{uri: this.state.gameData[this.state.perguntaAtual].image_url}}
                        />
                        <Text style={{fontWeight: 'bold', fontSize: 23, color: 'white'}}>{this.state.gameData[this.state.perguntaAtual].question}</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}> </Text>
                        <FlatList 
                            data={this.state.gameData[this.state.perguntaAtual].options}
                            renderItem={({item}) => 
                                <View>
                                    <Text style={{fontWeight: 'bold', fontSize: 5}}> </Text>
                                    <Button style={styles.button}
                                    onPress={() => 
                                        this._handleAnswerClick(item.code)
                                    }
                                    title={item.description}/>
                                </View>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
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