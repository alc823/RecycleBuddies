import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
// import Navbar from "./Pages/navbar";
import AnalyzeImage from "./Pages/analyze-image";
import Settings from "./Pages/settings";
import MoreInfo from "./Pages/more-info";
import Home from "./Pages/home";
import Results from "./Pages/results";

const Stack = createStackNavigator();

export const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        header: () => null,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="AnalyzeImage" component={AnalyzeImage} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="MoreInfo" component={MoreInfo} />
      <Stack.Screen name="Results" component={Results}/>
    </Stack.Navigator>
  </NavigationContainer>
);
