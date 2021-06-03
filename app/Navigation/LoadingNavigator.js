import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "../screens/MainScreen"
import AuthScreen from "../screens/AuthScreen"
import Loader from "../components/Loader"
import ChatNavigator from "./ChatNavigator";

export default function LoadingScreen() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator mode="modal">
    <Stack.Screen
        name="Loader"
        component={Loader}
        options={{
          headerTitle: false,
          // headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="MainScreen"
        component={ChatNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{
          headerTitle: false,
          // headerTransparent: true,
        }}
      />
      
      
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
