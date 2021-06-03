// Native Components ------------------------>
import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { TouchableRipple } from "react-native-paper";
// Custom Components ------------------------>
import AppText from "../../components/Text";

//Color File Import Statement -------------------------->
import color from "../../config/color";


function ListItem({
  image,
  title,
  subtitle,
  onPress,
  IconComponent,
  renderRightActions,
  titleColor,
  subtitleColor,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.mainContainer}>
        <TouchableRipple rippleColor="#a8a8a8" onPress={onPress}>
          <>
            <View style={styles.container}>
              {IconComponent}
              {image && <Image style={styles.image} source={image} />}
              <View style={styles.detailContainer}>
                <AppText style={[styles.title, titleColor]} numberOfLines={1}>
                  {title}
                </AppText>
                {subtitle && (
                  <AppText
                    style={[styles.subtitle, subtitleColor]}
                    numberOfLines={2}
                  >
                    {subtitle}
                  </AppText>
                )}
              </View>
              <MaterialCommunityIcons
                color="#fff"
                name="chevron-right"
                size={20}
              />
            </View>
            {/* <View style={styles.line} /> */}
          </>
        </TouchableRipple>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
    // backgroundColor: "#c4c4c4"
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 35,
  },
  detailContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontWeight: "800",
    fontSize: 15,
    color: "#fff",
  },
  subtitle: {
    color: "#D8D9DA",
    fontSize: 12,
  },
  mainContainer: {
    marginBottom: 0,
    marginLeft: 5,
    marginRight: 5,
    
  },
  line: {
    borderWidth: 0.4,
    borderColor: color.lineSeparator,
    width: "75%",
    alignSelf: "center",
    left: "5%",
  },
});

export default ListItem;
