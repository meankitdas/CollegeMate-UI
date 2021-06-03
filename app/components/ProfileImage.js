import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AppText from "../components/Text";

export default function ProfileImage({ name, color }) {
  return (
    <View style={styles.container}>
      {/* Profile photo part  */}
      <View style={styles.profileOut}>
        <View style={styles.profileIn}>
          <Ionicons name="person-outline" size={25} color="#4E4F57" />
        </View>
      </View>

      {/* Name Part */}
      <View>
        <AppText
          style={{
            textTransform: "uppercase",
            marginVertical: 15,
            color: color,
          }}
        >
          {name}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    top: "10%",
    alignItems: "center",
  },
  profileOut: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4E4F57",
    alignItems: "center",
    justifyContent: "center",
  },
  profileIn: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#C4c4c4",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    textTransform: "uppercase",
    marginVertical: 15,
    color: "#fff",
  },
});
