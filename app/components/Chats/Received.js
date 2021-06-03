import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Received = ({ message, time, color, secondaryColor }) => {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={[styles.gradient, color]}>
          <Text style={[styles.message, secondaryColor]}>{message}</Text>
        </View>
      </View>
      <Text style={styles.duration}>{time}</Text>
    </View>
  );
};
export default Received;

const styles = StyleSheet.create({
  duration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginHorizontal: 15,
    marginTop: 5,
    // fontFamily:'Montserrat_600SemiBold',
  },
  container: {
    flexDirection: "row",
    marginTop: 10,
    paddingLeft: 10
  },
  message: {
    fontSize: 13,
    marginHorizontal: 15,
    // fontFamily:'Montserrat_700Bold'
  },
  gradient: {
    maxWidth: 200,
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    // marginBottom:5,
    left: 5,
    minWidth: 0,
    
    
  },
});
