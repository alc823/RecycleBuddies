import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Platform, Alert, Yellowbox} from 'react-native';


export default function Settings({ route, navigation }) {
    return (
      <View style={styles.container}>
        <Text style={styles.header1}>What does this do?</Text>
        <View style = {styles.lineStyle}><Text>_______________________________________________________</Text></View>
        <Text style={styles.paragraph1}>This app lets you take a picture of an object and tells you if it's recyclable or not in your city.</Text>
        <Text style={styles.header2}>Isn't recycling the same everywhere?</Text>
        <View style = {styles.lineStyle2}><Text>_______________________________________________________</Text></View>
        <Text style={styles.paragraph2}>Each city or country has their own guidelines for what is acceptable or not. This is because each recycling center has different processing machines.</Text>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#69735A',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    header1: {
      top: -100,
      fontSize: 40,
      fontWeight: 'bold',
      color: 'white',
    },
  
    header2: {
        top: -40,
        marginLeft: '7%',
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
  
    paragraph1: {
        top: -80,
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        fontSize: 20,
        color: 'white',
    },
  
    paragraph2: {
      top: -20,
        marginLeft: '5%',
        marginRight: '2%',
        fontSize: 20,
        color: 'white',
    },
  
    lineStyle: {
      top: -100,
      left: 0,
      right: 0,
      bottom: 100,
      borderBottomWidth: 1,
      borderBottomColor:'white',
  },
  
  lineStyle2: {
    top: -40,
    left: 0,
    right: 0,
    bottom: 100,
    borderBottomWidth: 1,
    borderBottomColor:'white',
  }
  
  
  });
  
  