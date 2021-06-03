// Native import statement ---------------------->

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
  Image,
  Animated,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");

import { useSelector } from "react-redux";
import { switchTheme } from "../components/redux/themeActions";
import { lightTheme, darkTheme } from "../components/Theme";

// Custom Components ------------------------->

import ListItem from "../components/Lists/ListItem";
import ListItemDelete from "../components/Lists/ListItemDelete";
import ListItemSeparator from "../components/Lists/ListItemSeparator";
import ThreeBtn from "../components/ThreeBtn";
import AppText from "../components/Text";

//import Socket io -------------------------------->

import io from "socket.io-client";

//color config file import ------------------------>

import color from "../config/color";

const middle = width / 2;

// Database importing ---------------------------->



// Initial Messages ------------------------------>

const initialMessages = [
  {
    id: 1,
    title: "Mosh Hamida",
    description: "Hey! How are you buddy?",
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 2,
    title: "Ankit",
    description:
      "Do know what happened yesterday...That boy whom we saw at the store is Justin Bieber",
    image: require("../assets/ankit.jpg"),
  },
  {
    id: 3,
    title: "Ankit",
    description:
      "Do know what happened yesterday...That boy whom we saw at the store is Justin Bieber",
    image: require("../assets/ankit.jpg"),
  },
  {
    id: 4,
    title: "Ankit",
    description:
      "Do know what happened yesterday...That boy whom we saw at the store is Justin Bieber",
    image: require("../assets/ankit.jpg"),
  },
  {
    id: 5,
    title: "Mosh Hamida",
    description: "Hey! How are you buddy?",
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 6,
    title: "Mosh Hamida",
    description: "Hey! How are you buddy?",
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 7,
    title: "Mosh Hamida",
    description: "Hey! How are you buddy?",
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 8,
    title: "Mosh Hamida",
    description: "Hey! How are you buddy?",
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 9,
    title: "Mosh Hamida",
    description: "Hey! How are you buddy?",
    image: require("../assets/mosh.jpg"),
  },
];

export default function MainScreen({ navigation }) {
  

  

  const theme = useSelector((state) => state.themeReducer.theme);


 

  //***************************** Loc function ends here *******************************

  const [messages, setmessage] = useState(initialMessages);

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 75);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 75],
    outputRange: [0, -75],
  });

  const isMountedRef = useRef(true);
  useEffect(
    () => () => {
      isMountedRef.current = false;
    },
    []
  );

  // Delete Message --------------------------------->

  const handleDelete = (message) => {
    const newMessage = messages.filter((m) => m.id !== message.id);
    setmessage(newMessage);
  };

  return (
    <>
      <StatusBar hidden translucent backgroundColor="transparent" />

      <View style={{ flex: 1, backgroundColor: theme.BACKGROUND_COLOR }}>
        <Animated.View
          style={{
            transform: [{ translateY: translateY }],
            elevation: 4,
            zIndex: 100,
            flexDirection: "row",
            backgroundColor: theme.HEADER_COLOR,
            height: 75,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            top: 0,
            left: 0,
            right: 0,
            position: "absolute",
            zIndex: 1,
            elevation: 2,
            overflow: "hidden",
          }}
        >
          <AppText
            style={{
              color: theme.TEXT_COLOR,
              letterSpacing: 10,
              marginLeft: 5,
            }}
          >
            Next
          </AppText>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("account");
            }}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color={theme.TEXT_COLOR}
              style={styles.icon}
            />
          </TouchableOpacity>
          {/* </View> */}
        </Animated.View>

        <View style={styles.FlatList}>
          <FlatList
            data={messages}
            keyExtractor={(message) => message.id.toString()}
            contentContainerStyle={{
              paddingTop: "20%",
              paddingBottom: height / 5,
            }}
            onScroll={(e) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
              // console.log(e.nativeEvent.contentOffset.y)
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ListItem
                title={item.title}
                subtitle={item.description}
                image={item.image}
                onPress={() => navigation.navigate("chat", item)}
                renderRightActions={() => (
                  <ListItemDelete onPress={() => handleDelete(item)} />
                )}
                titleColor={{ color: theme.TEXT_COLOR }}
                subtitleColor={{ color: theme.SUBTITLE_COLOR }}
              />
            )}
            ItemSeparatorComponent={ListItemSeparator}
          />
        </View>

        <Animated.View style={[styles.btn]}>
          <ThreeBtn
            name="location"
            color={theme.TEXT_COLOR}
            onPress={() => {
              console.log("To navigate to search screen");
              navigation.navigate("friend");
            }}
            style={{ backgroundColor: theme.HEADER_COLOR }}
          />
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    backgroundColor: color.darkBlue,
    height: "11%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    zIndex: 1,
    elevation: 2,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    backgroundColor: "#1E1D1D",
    // backgroundColor: "#1E1D1D",
  },
  text: {
    marginLeft: 15,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    marginRight: 15,
  },
  Logo: {
    // fontSize: 100,
    color: "#fff",
    letterSpacing: 10,
    marginLeft: 5,
  },
  btn: {
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
    left: middle,
    // right: middle,
  },
});
