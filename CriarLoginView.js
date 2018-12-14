import React from 'react';
import { StyleSheet, Text, TextInput,
     View, Button, Platform, Image } from 'react-native';

export default class LoginView extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = { myName: "" };
        //this.showDetails = this.onClick.bind(this);// you should bind this to the method that call the props
    }
    componentWillMount() {
        console.log("componentWillMount")
    }
    componentDidMount() {
        console.log("componentDidMount")  
    }

    render() {
        return (
            <View style={styles.container}>
            <View style={{flex: 1}}>
                <View style={{flex: 3, backgroundColor: 'steelblue', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 110}}> </Text>
                    <Text style={{fontWeight: 'bold', fontSize: 23, color: 'white'}}>Se divirta com estas calculadoras!</Text>
                </View>
                {/* <View style={{flex: 2, backgroundColor: 'skyblue'}}>
                </View> */}
                <View style={{flex: 3, backgroundColor: 'powderblue'}}>
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