import React, {useEffect} from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import LottieView from "lottie-react-native";

import { useSelector } from "react-redux";

import firebase from "firebase";

export default function SeachingMate({navigation}) {
  const theme = useSelector((state) => state.themeReducer.theme);

  useEffect(()=>{
    checkIfLoggedIn();
  },[])

  

    const checkIfLoggedIn = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate("MainScreen");
        } else {
          navigation.navigate("AuthScreen");
        }
      });
    };
  
  return (
    <>
      <StatusBar hidden translucent backgroundColor="transparent" />
      <View
        style={[styles.container, { backgroundColor: theme.BACKGROUND_COLOR }]}
      >
        {theme.mode === "dark" ? (
          <LottieView
            autoPlay
            loop={true}
            style={styles.animations}
            source={require("../assets/animations/DarkLoader.json")}
            speed={1.5}
          />
        ) : (
          <LottieView
            autoPlay
            loop={true}
            style={styles.animations}
            source={require("../assets/animations/LightLoader.json")}
            speed={1.5}
          />
        )}
        {/* <LottieView
          autoPlay
          loop={true}
          style={styles.animations}
          source={require("../assets/animations/loader.json")}
          speed={1.5}
        /> */}
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  animations: {
    width: 150,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
