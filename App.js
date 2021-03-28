import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  Image 
} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import axios from 'axios';
import * as firebase from "firebase";
import {APIKEY, AUTHDOMAIN, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID, MEASUREMENTID} from "@env";
const fireBaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID
};

if (!firebase.apps.length) {
  firebase.initializeApp(fireBaseConfig);
}

export default function App() {

  const [imageValue, onChangeImageValue] = React.useState(null);
  const [predictorValue, onChangePredictorValue] = React.useState(-1);
  const [hasImage, onChangeHasImage] = React.useState(false);

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

  /*
   * uploads image to Firebase Realtime Database
   */
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("image");
    ref
      .getDownloadURL()
      .then((url) => {
      })
      .catch((e) => console.log("getting downloadURL of image error => ", e));
    return ref.put(blob);
  };
  /*
   * opens up photo library and makes changes to internal variables; also calls upload image based on image picked
   */
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      uploadImage(result.uri);
      onChangeImageValue(result.uri);
      onChangeHasImage(true);
    }
  };

  const hitAPI = async () => {
    // help with axios get: https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
    console.log("===========================hitAPI===========================")
    axios.get('http://10.0.2.2:5000/hoohacks/api/v1.0/classify-trash')
      .then((response) => {
        console.log('response: ' + response.data);
        onChangePredictorValue(response.data);
      });
    console.log("============================================================")
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {hasImage && 
            <Image
              source={{ uri: imageValue }}
              style={{ width: 200, height: 200 }}
            />
      }

      <TouchableOpacity onPress={pickImage} style={{backgroundColor:"lightblue", padding:20, margin:10, borderRadius:5}}>
        <Text style={{color:"black"}}>Upload image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={hitAPI} style={{backgroundColor:"lightblue", padding:20, margin:10, borderRadius:5}}>
        <Text style={{color:"black"}}>Classify!</Text>
      </TouchableOpacity>
      {predictorValue!==-1 &&
        <View>
          {predictorValue===0 && <Text>This is compostable!</Text>}
          {predictorValue===1 && <Text>This is recyclable!</Text>}
          {predictorValue===2 && <Text>This is garbage!</Text>}
        </View>
      }
      {/* <StatusBar style="auto" /> */}
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
});

/* Resources
 * Calling REST services in React Native: https://rapidapi.com/blog/how-to-make-rest-api-calls-in-react-native/
 * Axios GET: https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/ 
 * Uploading images in React Native: https://www.reactnativeschool.com/how-to-upload-images-in-a-react-native-app
 * Uploading images help: https://stackoverflow.com/questions/66195179/get-downloadurl-in-react-native-after-uploading-image
 * Uploading images help: https://stackoverflow.com/questions/57797083/how-to-upload-image-to-firebase-using-react-native 
 * Handling images and Firebase: https://medium.com/@sultanbutt820/react-native-image-upload-retrieve-delete-from-firebase-cloud-storage-ios-android-e05c7cdbf1d2
 * Opening up image picker: https://docs.expo.io/versions/latest/sdk/imagepicker/ 
 * PUT request for REST: https://stackoverflow.com/questions/40284338/javascript-fetch-delete-and-put-requests
 * File data to REST servers: https://www.appcoda.com/restful-api-tutorial-how-to-upload-files-to-server/
 * Sending images with axios: https://stackoverflow.com/questions/39663961/how-do-you-send-images-to-node-js-with-axios 
 * Python and React Native: https://stackoverflow.com/questions/59952284/how-to-link-a-python-script-to-react-native-app 
 * Python and React Native: https://hashnode.com/post/how-to-integrate-python-into-a-react-native-app-ciyadm0vb000mts53x2m9zn6a
 * axios and data: https://gist.github.com/ibreathebsb/a104a9297d5df4c8ae944a4ed149bcf1
 * jpg vs. jpeg: https://stackoverflow.com/questions/33692835/is-the-mime-type-image-jpg-the-same-as-image-jpeg 
 * content types for REST call: https://www.geeksforgeeks.org/http-headers-content-type/
 * axios and React Native: https://aboutreact.com/react-native-axios/ 
 * REST APIs and images: https://stackoverflow.com/questions/33279153/rest-api-file-ie-images-processing-best-practices 
 * Debug help: https://stackoverflow.com/questions/33117449/invariant-violation-objects-are-not-valid-as-a-react-child 
 * Protecting API keys: https://gist.github.com/derzorngottes/3b57edc1f996dddcab25
 */