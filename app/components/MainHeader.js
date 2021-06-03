import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";


import AppText from "../components/Text";
import { useSelector } from "react-redux";


export default function MainHeader({onPress}) {
  const theme = useSelector((state) => state.themeReducer.theme);

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme.HEADER_COLOR,
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
        onPress={onPress}
      >
        <Ionicons
          name="person-outline"
          size={20}
          color={theme.TEXT_COLOR}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 15,
      },
});
