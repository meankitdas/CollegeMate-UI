import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Vibration,
 
} from "react-native";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";

import AppText from "../components/Text";
import { createStackNavigator } from "@react-navigation/stack";

// import colors from "../config/colors";
import MainScreen from "../screens/MainScreen";
import ChatScreen from "../screens/ChatScreen";
import FriendScreen from "../screens/FriendScreen";
import AccountScreen from "../screens/AccountScreen"

import MainHeader from "../components/MainHeader"

import { useSelector } from "react-redux";


const ONE_SECOND_IN_MS = 40;

export default function ChatNavigator() {
  const theme = useSelector((state) => state.themeReducer.theme);
  
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="chat"
        component={ChatScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: "",
          headerTintColor: "#000",
          headerStyle: {
            backgroundColor: theme.BACKGROUND_COLOR,
            // elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
          headerLeft: () => (
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ paddingRight: 10 }}
                onPress={() => {
                  Vibration.vibrate(1 * ONE_SECOND_IN_MS);
                  navigation.goBack();
                }}
              >
                <Ionicons
                  name="ios-chevron-back-circle-outline"
                  size={30}
                  color={theme.TEXT_COLOR}
                />
              </TouchableOpacity>
              <Image
                source={route.params.image}
                style={{ height: 40, width: 40, borderRadius: 35 }}
              />

              <View
                style={{
                  paddingLeft: 10,
                  justifyContent: "center",
                }}
              >
                <AppText style={{ color: theme.TEXT_COLOR }}>
                  {route.params.name}
                </AppText>
                <Text style={{ color: theme.HEADER_COLOR, fontWeight: "300" }}>
                  online
                </Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 10 }}
              onPress={() => {
                Vibration.vibrate(1 * ONE_SECOND_IN_MS);
                console.log("Delete");
              }}
            >
              <MaterialIcons name="delete-outline" size={30} color={theme.TEXT_COLOR} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="friend"
        component={FriendScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
