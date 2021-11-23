import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from "firebase";

export default class LoadingScreen extends Component {

  checkIfLoggedIn = () => {
  firebase.auth()
  .onAuthStateChanged(user => {
   if(user) {
    this.props.navigation.navigate("DashboardScreen")
   }

   else {
    this.props.navigation.navigate("LoginScreen")
   }

  })
  }

  componentDidMount() {
   this.checkIfLoggedIn();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> LoadingScreen </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center"
 }
})
