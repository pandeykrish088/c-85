import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

export default class LoginScreen extends Component {

  isUserEqual = (googleUser, firebaseUser) => {
  if(firebaseUser) {
  var google = firebaseUser.google;
  for(var i = 0; i < google.length; i++) {

   if(
    google[i].providerId === firebaseUser.auth.GoogleAuthProvider.PROVIDER_ID
    && google[i].uid === googleUser
    .getBasicProfile()
    .getId()
   ) {
    return true;
   }

  }
  }
   return false;
  }

  SignIn = googleUser => {
   var Gmail = firebase.auth().onAuthStateChanged(firebaseUser =>{
    Gmail();

   if(!this.isUserEqual(googleUser, firebaseUser)) {
    
 var credential = firebase.auth.GoogleAuthProvider.credential(
   googleUser.idToken,
   googleUser.accessToken
  )

  firebase.auth()
  .signInWithCredential(credential)
  .then(function(result) {

   if(result.additionalUserInfo.isNewUser) {
    firebase.database()
    .ref("/user" + result.user.uid)
    .set({

    gmail: result.user.email,
    profile_picture: result.additionalUserInfo.profile.picture,
    locale: result.additionalUserInfo.profile.locale,
    first_name: result.additionalUserInfo.profile.given_name,
    last_name: result.additionalUserInfo.profile.family_name,
    current_theme: "dark"

    })
   .then(function(snapshot) {})
   }

  })

  .catch(error => {

   var Code = error.code;
   var Message = error.message;

   var email = error.email;
   var credential = error.credential;
    
  })
    
   }
   else {
    console.log("This user already signed-in Firebase.")
   }

   })
  }

  SignInWithGoogle = async () => {
   try {
   const result = await Google.logInAsync({
    behaviour: "web",
    androidClientId: "958076585750-911sqiv3ob14jcr76o7hc7cm1k7dp3t2.apps.googleusercontent.com",
    iosClientId: "958076585750-56pt0064f2vl5sckg868je0du93umqde.apps.googleusercontent.com",
    scopes: ["profile", "email"]
   })

   if(result.type === "success") {
    this.SignIn(result)
    return result.accessToken
   }

   else {
    return {cancelled: true}
   }
   }

   catch (error) {
    console.log(error.message)
   }

  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
        onPress={() => this.SignInWithGoogle()}>
        <Text> Sign in with google </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});