import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Platform, Alert, Yellowbox} from 'react-native';
import StyledButton from "../components/StyledButton";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import axios from 'axios';

export default function Results({ route, navigation }) {
  const { city, imageURI, hasImage } = route.params;
//   const [imageValue, onChangeImageValue] = React.useState(null);
  const [predictorValue, onChangePredictorValue] = React.useState(-1);
//   const [hasImage, onChangeHasImage] = React.useState(false);

  useEffect(() => {
    // gets permissions for camera roll
    
    (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await Permissions.getAsync(Permissions.MEDIA_LIBRARY);
          if (status !== 'granted') {
            // alert('Sorry, we need camera roll permissions to make this work!');
            console.log("permissions problem")
          }
        }
    })();
  })

  const test = () => {
    console.log("imageURI: " +  imageURI);
    console.log("city: " + city);
    console.log("predictorValue: " + predictorValue);
  }

  const hitAPI = async () => {
    // help with axios get: https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
    console.log("===========================hitAPI===========================")
    // axios.get('http://10.0.2.2:5000/hoohacks/api/v1.0/classify-trash')
    //   .then((response) => {
    //     console.log('response: ' + response.data);
    //     onChangePredictorValue(response.data);
    //   });
    console.log("city: " + city);
    axios
      .put(
          "http://10.0.2.2:5000/hoohacks/api/v1.0/classify-trash", 
          city, 
          {headers: {"Content-Type": "text/plain"}}
      )
      .then((response) => {
            console.log('response: ' + response.data);
            onChangePredictorValue(response.data);
      })
      .catch(e => console.log(e));
    console.log("============================================================")
  }

  return (

    <View style={styles.container}>
      {/* <View style = {styles.earthContainer}> */}
      {hasImage && 
            <Image
              source={{ uri: imageURI }}
              style={{ width: 200, height: 200 }}
            />
      }

      {/* <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={{color:"black"}}>Upload image</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={hitAPI} style={styles.button}>
        <Text style={{color:"black"}}>Classify!</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={test} style={styles.button}>
        <Text style={{color:"black"}}>test:(</Text>
      </TouchableOpacity> */}
      {predictorValue!==-1 &&
        <View style={{flexDirection:"row", marginTop:30, fontSize:40}}>
          <Text>Result: </Text>
          {predictorValue===0 && <Text>This is recyclable!</Text>}
          {predictorValue===1 && <Text>This is compostable!</Text>}
          {predictorValue===2 && <Text>This is garbage!</Text>}
          {predictorValue===101 && <Text>Unknown! Try again!</Text>}
        </View>
      }
      <TouchableOpacity onPress={() =>  navigation.navigate("AnalyzeImage", {city: city})} style={{marginTop:50}}>
        <Text>Upload another image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{marginTop:10}}>
        <Text>Return to home</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#69735A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  earthContainer: {
    width: '111%',
    height: '100%',
  },

  titles: {
    width: '100%',
    alignItems: 'center'
  },

  title: {
    top: 200,
    fontSize: 40,
    fontWeight: '500',
    color: 'white',
  },

  subtitle1: {
    width: '100%',
    alignItems: 'center'
  },

  title1: {
    top: 480,
    fontSize: 20,
    fontWeight: '100',
    alignItems: 'center',
    color: 'white',
  },

  subtitle2: {
    width: '100%',
    alignItems: 'center'
  },

  title2: {
    top: 550,
    fontSize: 20,
    fontWeight: '100',
    alignItems: 'center',
    color: 'white',
  },

  image: {
    top: 290,
    marginLeft: '23%',
    width: 195,
    height:195,
    position: 'absolute',
  },

  dropdown: {
    top: -295,
    width: '80%',
    
  },

  dropdown2: {
    top: -240,
    width: '80%',
  },

  button: {
    backgroundColor: '#B9714B',
    color: 'black',
    // height: 40,
    // width: 170,
    margin:20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop:20,
    marginBottom:5,
    padding: 20
  }

});
