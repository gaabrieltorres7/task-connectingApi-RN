import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView } from 'react-native';
import React, { useState } from "react";

import api from './src/services/api';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function App() {

  const [advice, setAdvice] = useState('');

  async function consulta() {
    const response = await api.get('/advice').then((response) => {
      setAdvice(response.data.slip.advice);
    }).catch((error) => {
      return error;
    });
    return response 
  }

  return (
    <SafeAreaView style={styles.bg}> 
      <ImageBackground source={require("./assets/bg1.png")} style={styles.bg}>
        <View style={styles.container}>
          <TouchableOpacity onPress={consulta} style={styles.button}>
            <Text style={styles.text}>Show me an advice</Text>
          </TouchableOpacity>
      <StatusBar style="auto" />
      <Text style={styles.advice}>{advice}</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: screenHeight * 0.2,
    alignItems: 'center',
  },
  bg: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    maxWidth: 200,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  advice: {
    fontSize: 20,
    color: "gray",
    margin: 30,
    fontStyle: "italic",
    textAlign: "center",
  },
});