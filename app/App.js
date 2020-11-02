import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import ComponentTest from './src/Component';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Hello Guys</Text>
      <TextInput style={styles.textInputStyle}></TextInput>
      <ComponentTest param="Id"></ComponentTest>
      <ComponentTest param="Password"></ComponentTest>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    height: 40,
    width: '80%',
    borderColor: 'black',
    borderWidth: 2
  }
});
