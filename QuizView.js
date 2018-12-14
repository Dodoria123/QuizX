import React from 'react';
import { StyleSheet, Text, TextInput,
     View, Button, Platform, Image, FlatList } from 'react-native';
import Style from './Style';
import listaQuizLocal from './quizquestionlist.json';

var qtdAcertos = 0;

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
        //this.showDetails = this.onClick.bind(this);// you should bind this to the method that call the props
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

        console.log(itemCode);
        console.log(this.state.gameData[this.state.perguntaAtual].quiz_option_code);
        console.log(qtdAcertos + ' anterior');
        if (itemCode == this.state.gameData[this.state.perguntaAtual].quiz_option_code) {
            if (qtdAcertos == 0) {
                qtdAcertos = 1;   
            } else {
                qtdAcertos = qtdAcertos + 1;
            }
            console.log('entrou no if do acerto'); 
        }
        console.log(qtdAcertos + ' depois');

        this.setState({perguntaAtual: this.state.perguntaAtual + 1});
        // console.log(this.state.perguntaAtual);
        var arrLength = this.state.gameData.length - 1;
        // console.log(arrLength);
        if (this.state.perguntaAtual >= arrLength) {
            this.setState({perguntaAtual: 0});
            this.props.navigation.navigate('Resultado', { param: qtdAcertos});
            qtdAcertos = 0;
        } else {
            this.props.navigation.navigate('Quiz'); 
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={{flex: 4, backgroundColor: 'steelblue', alignItems: 'center'}}>
                        {/* <Text style={{fontWeight: 'bold', fontSize: 110}}> </Text> */}
                        <Image
                            style={{width: 190, height: 120}}
                            // source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
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
                                // <Text>{item.description} teste</Text>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    {/* <View style={{flex: 2, backgroundColor: 'skyblue'}}>
                    </View> */}
                    {/* <View style={{flex: 1, backgroundColor: 'powderblue'}}>
                    </View> */}
                </View>
            </View>
            // <View style={Style.rootContainer}>
            //     <View style={Style.displayContainer}>
            //         <Text style={Style.displayText}>{this.state.inputValue}</Text>
            //     </View>
            // </View>
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