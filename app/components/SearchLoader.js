import React from "react";
import { View, StyleSheet, Modal, StatusBar } from "react-native";
import LottieView from "lottie-react-native";
import { useFonts, Nunito_600SemiBold } from "@expo-google-fonts/nunito";

import { useSelector } from "react-redux";

import Text from "../components/Text";
// import colors from "../config/colors";

export default function SeachingMate({ visible = true }) {
  const theme = useSelector((state) => state.themeReducer.theme);

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.BACKGROUND_COLOR,
        }}
      />
    );
  } else {
    return (
      <>
        <StatusBar hidden translucent backgroundColor="transparent" />
        <Modal visible={visible}>
          <View
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              backgroundColor: theme.BACKGROUND_COLOR,
            }}
          >
            {theme.mode === "dark" ? (
              <LottieView
                autoPlay
                loop={true}
                source={require("../assets/animations/DarkSearch.json")}
                style={styles.animations}
              />
            ) : (
              <LottieView
                autoPlay
                loop={true}
                source={require("../assets/animations/LightSearch.json")}
                style={styles.animations}
              />
            )}
            <Text style={[styles.text, { color: theme.TEXT_COLOR }]}>
              Searching Mates...
            </Text>
          </View>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  animations: {
    width: 500,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontFamily: "Nunito_600SemiBold",
    color: "#000",
  },
});
