import React, { Component } from "react";
import { View, StyleSheet, Modal } from "react-native";
import LottieView from "lottie-react-native";

export default function ExtraLoadScreen({ visible }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop={true}
          source={require("../assets/animations/LightLoader.json")}
          style={styles.animation}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { 
      flex:1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff"
  },
  animation: {
    width: 150
  }
});
