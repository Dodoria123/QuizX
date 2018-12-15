import React from 'react';
import { StyleSheet, Text, TextInput,
     View, Button, Platform, Image, FlatList } from 'react-native';
import * as firebase from 'firebase';

var qtdAcertos = 0;
var rankingUsuarios;

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
        this.state = { qtdAcertosTeste: 0, listaRanking: [] };
    }

    async componentWillMount() {
        rankingUsuarios = await this.listarRankingUsuarios();
        
        let items = [];
        rankingUsuarios.forEach(childSnapshot => {
          items.push(childSnapshot.val());
        });

        let itemsRankeados = items.sort(function(a,b){
            return b.qtdAcertosUsuario - a.qtdAcertosUsuario
        });

        this.setState({ listaRanking: itemsRankeados });
    }

    async listarRankingUsuarios() {
        try {
            const currentUser = await firebase.auth().currentUser
            const result = firebase.database().ref('users').once('value');
            return result;
          } catch (error) {
            console.log(error.toString())
          } 
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
                    <View style={{flex: 3, backgroundColor: 'steelblue', alignItems: 'center'}}>
                        <FlatList 
                            data={this.state.listaRanking}
                            renderItem={({item}) => 
                                <View>
                                    <Text style={{fontWeight: 'bold', fontSize: 7}}>  </Text>
                                    <Text style={{fontWeight: 'bold', fontSize: 18, color: 'red'}}>Nome: {item.username} - Acertos: {item.qtdAcertosUsuario} - Data: {item.dataJogo}</Text>
                                </View>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
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