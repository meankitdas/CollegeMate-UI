import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ColorBtn from "../components/ColorBtn";

const Name = [
  "setting",
  "infocirlceo"
]

export default function RowBtn({
  orangeBtn,
  whiteBtn,
  greenBtn,
  color,
  IconColor,
}) {
  return (
    <View style={styles.container}>
      <ColorBtn
        onPress={orangeBtn}
        IconName="setting"
        IconSize={20}
        IconColor={IconColor}
      />
      <ColorBtn
        style={[{ backgroundColor: "#F4F6F7" }, color]}
        onPress={whiteBtn}
        IconName="infocirlceo"
        IconSize={20}
        IconColor={IconColor}
      />
      <ColorBtn
        style={{ backgroundColor: "#A3E4D7" }}
        onPress={greenBtn}
        IconName="setting"
        IconSize={20}
        IconColor={IconColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    padding: 15,
  },
});
