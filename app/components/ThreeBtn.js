import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NeuView } from "react-native-neu-element";

import { TouchableOpacity } from "react-native-gesture-handler";

import color from "../config/color";

export default function ThreeBtn({ name, color, onPress, style, size = 30 }) {
  return (
    // <NeuView color={boxcolor} height={65} width={65} borderRadius={50}>
    <View style={[styles.btn, style]}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={name} size={size} color={color} />
      </TouchableOpacity>
    </View>
    // </NeuView>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: color.darkBlue,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    
  },
});
