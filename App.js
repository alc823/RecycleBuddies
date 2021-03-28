import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Button, Platform, Alert, Yellowbox} from 'react-native';
import StyledButton from "./components/StyledButton";
import DropDownPicker from 'react-native-dropdown-picker';

export default function App() {

  return (

    <View style={styles.container}>

      <View style = {styles.earthContainer}>

      <Image
        source={require('./assets/images/recyclingCans.png')}
        style={styles.image}
      />


        <View style = {styles.titles}>
            <Text style = {styles.title}>App Name</Text>
        </View>

        <View style = {styles.subtitle1}>
            <Text style = {styles.title1}>Select a State</Text>
        </View>

        <View style = {styles.subtitle2}>
            <Text style = {styles.title2}>Select a City</Text>
        </View>

      </View>

      <StatusBar style="auto" />

      <StyledButton/>


      <DropDownPicker style = {styles.dropdown}
          items={[
              {label: 'Item 1', value: 'item1'},
              {label: 'Item 2', value: 'item2'},
          ]}
          defaultIndex={0}
          defaultNull
          placeholder="Select your State"
          containerStyle={{height: 40}}
          onChangeItem={item => console.log(item.label, item.value)}
      />

      <DropDownPicker style = {styles.dropdown2}
          items={[
              {label: 'Item 1', value: 'item1'},
              {label: 'Item 2', value: 'item2'},
          ]}
          defaultIndex={0}
          containerStyle={{height: 40}}
          onChangeItem={item => items}
      />



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
  }

});

// import { StatusBar } from 'expo-status-bar';
// import React, {useState} from 'react';
// import { StyleSheet, Text, View, Image, Button, Platform, Alert, Yellowbox} from 'react-native';
// import StyledButton from "./components/StyledButton";
// import DropDownPicker from 'react-native-dropdown-picker';

// export default function App() {
//   return (

  
//   )};



