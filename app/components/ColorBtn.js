import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {AntDesign} from "@expo/vector-icons"

export default function ColorBtn({ style, onPress, IconName, IconSize, IconColor }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.btn, style]}>
          <AntDesign name={IconName} size={IconSize} color={IconColor}  />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#F0B27A",
    alignItems: "center",
    justifyContent: "center",
    // padding: 2
  },
});
