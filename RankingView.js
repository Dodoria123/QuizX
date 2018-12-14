import React from 'react';
import { StyleSheet, Text, TextInput,
     View, Button, Platform, Image, FlatList } from 'react-native';
import * as firebase from 'firebase';

var qtdAcertos = 0;

export default class RankingView extends React.Component {
    static navigationOptions = {
        title: 'Ranking',
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
        this.state = { qtdAcertosTeste: 0 };
        //this.showDetails = this.onClick.bind(this);// you should bind this to the method that call the props
    }
    componentWillMount() {
        console.log("componentWillMount")
        // qtdAcertos = this.props.navigation.state.params.param;
        // if (qtdAcertos == null){
        //     console.log('parm está nulo');
        //     qtdAcertos = 0;
        // }
        // this.setState({ qtdAcertosTeste: qtdAcertos }); 
    }
    componentDidMount() {
        console.log("componentDidMount")  
    }

    onSignout = () => {
        firebase.auth().signOut();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={{flex: 7, backgroundColor: 'steelblue', alignItems: 'center'}}>
                        {/* <FlatList 
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
                        /> */}
                    </View>
                    <View style={{flex: 1, backgroundColor: 'steelblue'}}>
                    </View>
                    <View style={{flex: 2, backgroundColor: 'steelblue'}}>
                        <Button style={styles.button}
                            onPress={() => this.props.navigation.navigate('Quiz')}
                            title="Jogar novamente"/>
                        <Text style={{fontWeight: 'bold', fontSize: 10}}> </Text>
                        <Button style={styles.button}
                            onPress={() => this.onSignout()}
                            title="Logoff"/>
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