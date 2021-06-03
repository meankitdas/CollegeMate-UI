import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFonts, Nunito_600SemiBold } from "@expo-google-fonts/nunito";
import LottieView from "lottie-react-native";




function Button({ title, onPress }) {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#3C3C3C' }]}
        onPress={onPress}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#FFF",
    textTransform: "uppercase",
    fontSize: 18,
    fontFamily: "Nunito_600SemiBold",
    
  },
  button: {
    backgroundColor: "#3c3c3c",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 15,
    width: "50%",
    marginVertical: 10,
    top: 200,
  },
});

export default Button;
