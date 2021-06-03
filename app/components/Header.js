import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Vibration,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import AppText from "../components/Text";

const ONE_SECOND_IN_MS = 40;
const OVERFLOW_HEIGHT = 55;
const SPACING = 10;

export default function Header({ image, name }) {
  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            Vibration.vibrate(1 * ONE_SECOND_IN_MS);
            console.log("Let's go back");
          }}
        >
          <Ionicons
            name="ios-chevron-back-circle-outline"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.profile}>
        <Image source={image} style={styles.image} />
        <AppText style={styles.name}>{name}</AppText>
      </View>
      <View style={styles.deleteBtn}>
        <TouchableOpacity
          onPress={() => {
            Vibration.vibrate(1 * ONE_SECOND_IN_MS);
            console.log("Delete");
          }}
        >
          <MaterialIcons name="delete-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    top: 0,
    zIndex: 1
    // position: "absolute"
  },
  iconContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
    marginLeft: -10,
    width: "20%",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
    height: OVERFLOW_HEIGHT,
    marginLeft: "-10%",
    paddingTop: "5%",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 35,
  },
  name: {
    color: "#fff",
    marginHorizontal: "5%",
  },
  deleteBtn: {
    width: "20%",
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
    marginRight: -15,
  },
});
