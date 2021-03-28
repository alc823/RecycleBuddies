import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Alert,
  Platform,
  StatusBar,
  defaultSource,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";

export default function Navbar({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("Settings");
  };

  const pressHandler2 = () => {
    navigation.navigate("Newsfeed");
  };

  const pressHandler3 = () => {
    navigation.navigate("Myaccount", {
      userID: firebase.auth().currentUser.uid,
    });
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        // navigation.navigate("Signup");
        navigation.popToTop();
      })
      .catch(function (error) {
        // An error happened.
        console.log(error + ": " + error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={pressHandler2} style={styles.backButton}>
        <Image
          style={{ width: 25 / 1.75, height: 43.67 / 1.75 }}
          source={require("../assets/backicon.png")}
        />
      </TouchableOpacity>
      <Image
        style={styles.closeIcon1}
        source={require("../assets/message.png")}
      />
      <Image
        style={styles.closeIcon2}
        source={require("../assets/account.png")}
      />
      <Image
        style={styles.closeIcon3}
        source={require("../assets/fromfrom.png")}
      />
      <Image
        style={styles.closeIcon4}
        source={require("../assets/settings.png")}
      />
      <Image
        style={styles.closeIcon5}
        source={require("../assets/documents.png")}
      />

      <Image
        style={styles.searchbar}
        source={require("../assets/searchbox.png")}
      />
      <View style={styles.closeIcon12}>
        <Button
          color="black"
          title="Messages"
          onPress={() => navigation.navigate("Messages")}
        />
      </View>

      <View style={styles.closeIcon22}>
        <Button color="black" title="My Profile" onPress={pressHandler3} />
      </View>

      <View style={styles.closeIcon32}>
        <Button
          color="black"
          title="FromFrom"
          onPress={() => console.log("FromFrom button tapped")}
        />
      </View>

      <View style={styles.closeIcon42}>
        <Button
          color="black"
          title="Settings"
          onPress={() => navigation.navigate("Settings")}
        />
      </View>

      <View style={styles.closeIcon52}>
        <Button
          color="black"
          title="Disclosures"
          onPress={() => console.log("Disclosure button tapped")}
        />
      </View>

      <View style={styles.closeIcon62}>
        <Button
          color="black"
          title="Newsfeed"
          onPress={() => navigation.navigate("Newsfeed")}
        />
      </View>

      <View style={styles.closeIcon72}>
        <Button
          color="black"
          title="Log Out"
          onPress={handleLogout}
        />
      </View>

      <TextInput
        placeholder="Find someone..."
        placeholderTextColor="white"
        style={styles.input}
      />
    </SafeAreaView>
  );
}
// return (
//   <SafeAreaView style={styles.container}>
//     <Text numberOfLines={1} onPress={handlePress}>
//       Hellow 2!
//     </Text>
//     <Image source={require("./assets/incon.png")} />
//   </SafeAreaView>
// );
// }

// function GradientTest() {
//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={["#48F10E", "#078716", "#093203"]}
//         style={styles.buttonComtainer}
//       >
//         <Text style={styles.buttonText}>Login to read</Text>
//       </LinearGradient>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  searchbar: {
    width: Dimensions.get("window").width * 0.7,
    height: 80 / 1.9,
    position: "absolute",
    top: Dimensions.get("window").height * 0.09,
    alignSelf: "center",
    resizeMode: "contain",
  },
  backButton: {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
    position: "absolute",
    top: Dimensions.get("window").height * 0.103,
    left: Dimensions.get("window").width - Dimensions.get("window").width * 0.1,
  },
  closeIcon1: {
    width: 78 / 1.3,
    height: 61 / 1.3,
    position: "absolute",
    top: 200,
    left: 50,
  },
  closeIcon2: {
    width: 56.47 / 1.3,
    height: 35.61 / 1.3,
    position: "absolute",
    top: 275,
    left: 52,
  },
  closeIcon3: {
    width: 50 / 1.3,
    height: 50 / 1.3,
    position: "absolute",
    top: 350,
    left: 51,
  },
  closeIcon4: {
    width: 50 / 1.65,
    height: 50 / 1.65,
    position: "absolute",
    top: 425,
    left: 53,
  },
  closeIcon5: {
    width: 50 / 1.5,
    height: 50 / 1.5,
    position: "absolute",
    top: 500,
    left: 53,
  },
  closeIcon6: {
    width: 50 / 2,
    height: 50 / 2,
    position: "absolute",
    top: 79,
    left: 295,
  },
  closeIcon12: {
    position: "absolute",
    top: 200,
    left: 135,
  },
  closeIcon22: {
    position: "absolute",
    top: 275,
    left: 135,
  },
  closeIcon32: {
    position: "absolute",
    top: 350,
    left: 135,
  },
  closeIcon42: {
    position: "absolute",
    top: 425,
    left: 135,
  },
  closeIcon52: {
    position: "absolute",
    top: 500,
    left: 135,
  },
  closeIcon62: {
    position: "absolute",
    top: 575,
    left: 135,
  },
  closeIcon72: {
    position: "absolute",
    top: 650,
    left: 135,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(100, 90, 255, 1)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  input: {
    //borderWidth: 1,
    // borderColor: 'black',
    padding: 10,
    margin: 10,
    width: Dimensions.get("window").width * 0.5,
    left: 60,
    top: Dimensions.get("window").height * 0.03,
    borderRadius: 30,
    // backgroundColor: 'white',
    opacity: 0.75,
    color: "white",
  },

  touchop: {
    // alignSelf: 'flex-start',
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  touchop2: {
    // alignSelf: 'flex-start',
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  touchop3: {
    // alignSelf: 'flex-start',
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  // buttonContainer: {
  //   padding: 15,
  //   alignItems: "center",
  //   borderRadius: 5,
  // },
  // buttonText: {
  //   fontWeight: "bold",
  //   fontSize: 18,
  //   color: "#fff",
  // },
});
