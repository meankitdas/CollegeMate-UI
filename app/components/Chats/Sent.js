import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Sent = ({ message, time, color, secondaryColor }) => {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={[styles.gradient, color]}>
          <Text style={[styles.text, secondaryColor]}>{message}</Text>
        </View>
      </View>
      <Text style={styles.duration}>{time}</Text>
    </View>
  );
};
export default Sent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,

    alignSelf: "flex-end",
    width: "100%",
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "flex-end",

    // position: 'absolute',
    right: 5,
  },
  duration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginTop: 5,
    // fontFamily:'Montserrat_600SemiBold',
    alignSelf: "flex-end",
  },
  gradient: {
    maxWidth: 200,
    // flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    minWidth: 0,
  },

  text: {
    color: "#000000",
    // fontFamily:'Montserrat_700Bold'
  },
  main: {
    width: "100%",

    flex: 1,
    flexDirection: "column",
  },
});
