import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import LoginView from './LoginView';
import QuizView from './QuizView';
import ResultadoView from './ResultadoView';
import SignUpView from './SignUpView';
import RankingView from './RankingView';
import { createStackNavigator, createAppContainer } from "react-navigation";
import * as firebase from 'firebase';
import ApiKeys from './FirebaseApiKeys';

export default class App extends React.Component {

  constructor(props) { 
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false
    };

    YellowBox.ignoreWarnings(['Setting a timer']);

    if(!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  }

  onAuthStateChanged = (user) => {
    this.setState({isAuthenticationReady: true});
    this.setState({isAuthenticated: !!user});
  }

  componentWillMount() {
    console.log("componentWillMount")
    firebase.auth().signOut();
  }
  componentDidMount() {
      console.log("componentDidMount")  
  }

  render() {
    return (
      (this.state.isAuthenticated) ? <MainAppContainer/> : <AppContainer />
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: LoginView,
  SignUp: SignUpView 
}, {
  initialRouteName: "Home"
});

const QuizAppNavigator = createStackNavigator({
  Quiz: QuizView,
  Resultado: ResultadoView,
  Ranking: RankingView
}, {
  initialRouteName: "Quiz"
});

const AppContainer = createAppContainer(AppNavigator);
const MainAppContainer = createAppContainer(QuizAppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
