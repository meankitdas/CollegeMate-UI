import React, { useState, useMemo } from "react";
import firebase from "firebase";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Vibration,
  Dimensions,
  TouchableOpacity,
  Switch,
} from "react-native";

import { TouchableRipple } from "react-native-paper";
import RowBtn from "../components/RowBtn";
import ProfileImage from "../components/ProfileImage";
import ThreeBtn from "../components/ThreeBtn";
import { Ionicons } from "@expo/vector-icons";
import color from "../config/color";
import { ThemeProvider, useTheme } from "@react-navigation/native";

// import AuthContext from "../context/context";
import AppText from "../components/Text";

import * as Animatable from "react-native-animatable"

import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../components/redux/themeActions";
import { lightTheme, darkTheme } from "../components/Theme";

const OVERFLOW_HEIGHT = 55;
const SPACING = 10;
const ONE_SECOND_IN_MS = 40;

export default function AccountScreen({ navigation }) {
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  // const [isDark, setIsdark] = useState(false)

  const changeTheme = () => {
    if (theme.mode === "light") {
      return dispatch(switchTheme(darkTheme));
    } else {
      return dispatch(switchTheme(lightTheme));
    }
  };

  const isDark = () => {
    if (theme.mode === "light") {
      return false;
    } else {
      return true;
    }
  };

  const animation = {
    0: {opacity: 0, translateX: 50},
    1: {opacity: 1, translateX: 0}
  }

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };

  return (
    <>
      <StatusBar hidden translucent backgroundColor="transparent" />
      <View style={{ flex: 1, backgroundColor: theme.BACKGROUND_COLOR }}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              Vibration.vibrate(1 * ONE_SECOND_IN_MS);
              console.log("Let's go back");
              navigation.goBack();
            }}
          >
            <Ionicons
              name="ios-chevron-back-circle-outline"
              size={30}
              color={theme.TEXT_COLOR}
            />
          </TouchableOpacity>
        </View>

        <View>
          <ProfileImage name="Ankit Das" color={theme.TEXT_COLOR} />
        </View>

        <Animatable.View useNativeDriver animation={animation} delay={300} style={styles.colorBtn}>
          <RowBtn
            orangeBtn={() => console.log("orange")}
            whiteBtn={() => console.log("white")}
            greenBtn={() => console.log("green")}
            color={{ backgroundColor: theme.BTN_COLOR }}
            IconColor="black"
          />
        </Animatable.View>

        <TouchableRipple
          onPress={() => {
            changeTheme();
          }}
        >
          <Animatable.View animation="fadeInUp" delay={320} style={styles.preference}>
            <AppText style={{ color: theme.TEXT_COLOR }}>Dark Theme</AppText>
            <View pointerEvents="none">
              <Switch
                trackColor={{ true: "#ccc", false: "#555" }}
                thumbColor={theme.TEXT_COLOR}
                value={isDark()}
              />
            </View>
          </Animatable.View>
        </TouchableRipple>

        <Animatable.View animation="fadeInUp" delay={320} style={styles.btn}>
          <ThreeBtn
            name="close-circle-outline"
            color={theme.TEXT_COLOR}
            
            onPress={() => {
              Vibration.vibrate(1 * ONE_SECOND_IN_MS);
              console.log("Logout");
              logout();
            }}
            style={{ backgroundColor: "#f1948a" }}
            size={45}
          />
        </Animatable.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1D1D",
  },
  iconContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
    marginLeft: -10,
  },
  btn: {
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
    left: "50%",
    right: "50%",
  },
  colorBtn: {
    marginTop: "10%",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "10%",
    paddingHorizontal: 16,
  },
});
