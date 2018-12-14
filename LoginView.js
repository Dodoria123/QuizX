import React from 'react';
import { StyleSheet, Text, TextInput,
     View, Button, Platform, Image, Alert } from 'react-native';
import * as firebase from 'firebase';
import ApiKeys from './FirebaseApiKeys';

export default class LoginView extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', errorMessage: null };
        //this.showDetails = this.onClick.bind(this);// you should bind this to the method that call the props
    }
    componentWillMount() {
        console.log("componentWillMount")
    }
    componentDidMount() {
        console.log("componentDidMount")  
    }

    // async signIn(email, password) {
    //     try {
    //         var credentials = await firebase.auth().signInWithEmailAndPassword(email, password);    
    //         console.log(credentials.user.email);
    //         return credentials
    //     } 
    //     catch (error) {
    //         console.log((error.toString()))
    //     }
    // }

    _handleLogin = () => {
        // TODO: Firebase stuff...
        console.log('handleLogin')
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            
        }, (error) => {
            Alert.alert(error.message);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: 'white', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 23, color: 'black'}}>Quiz - Você só tem uma chance!</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}> </Text>
                </View>
                {/* <View style={{flex: 2, backgroundColor: 'steelblue', alignItems: 'center'}}>
                    
                </View> */}
                <Text>Login</Text>
                    {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="E-mail"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Senha"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Text style={{fontWeight: 'bold', fontSize: 5}}> </Text>
                <Button title="Login" onPress={this._handleLogin} />
                <Text style={{fontWeight: 'bold', fontSize: 5}}> </Text>
                <Button
                    // title="Don't have an account? Sign Up"
                    title="Não possui uma conta? Cadastre-se"
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
            </View>
            // <View style={styles.container}>
            //     <View style={{flex: 1}}>
            //         <View style={{flex: 3, backgroundColor: 'steelblue', alignItems: 'center'}}>
            //             <Text style={{fontWeight: 'bold', fontSize: 110}}> </Text>
            //             <Text style={{fontWeight: 'bold', fontSize: 23, color: 'white'}}>Quiz - Você só tem uma chance!</Text>
            //         </View>
            //         {/* <View style={{flex: 2, backgroundColor: 'skyblue'}}>
            //         </View> */}
            //         <View style={{flex: 3, backgroundColor: 'powderblue'}}>
            //             <Button style={styles.button}
            //                 onPress={() => this.props.navigation.navigate('Quiz')}
            //                 title="Efetuar Login"/>
            //             <Text style={{fontWeight: 'bold', fontSize: 10}}> </Text>
            //             <Text style={{fontWeight: 'bold', fontSize: 15}}>Cadastrar Login</Text>
            //         </View>
            //     </View>
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    }
})

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: 'space-between',
//     },
//     text: { 
//       backgroundColor: Platform.OS === 'android' ? '#ff0000' : '#00ff00',
//     },
//     input: {
//       height: 40,
//       width: 100,
//       borderColor: 'gray',
//       backgroundColor: '#ddd'
//     },
//     button: {
//       fontSize: 55,
//       borderColor: 'red',
//       borderWidth: 5,
//       borderRadius: 15,
//       backgroundColor: '#00aeef'
//     },
//     containerresultado: {
//       flex: 1,
//       flexDirection: "row",
//       backgroundColor: 'blue',
//       justifyContent: 'space-evenly',
//       alignItems: 'center',
//     },
//   });