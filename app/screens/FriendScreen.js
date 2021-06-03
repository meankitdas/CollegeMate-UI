import * as React from "react";
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Vibration,
} from "react-native";
const { width } = Dimensions.get("screen");
import { Ionicons } from "@expo/vector-icons";
import ThreeBtn from "../components/ThreeBtn";
import AppText from "../components/Text";

import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "../config/config";

import SearchLoader from "../components/SearchLoader";

import { useSelector } from "react-redux";

import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const dbh = firebase.firestore();

const DATA = [];



const OVERFLOW_HEIGHT = 55;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = width + 50;
const VISIBLE_ITEMS = 3;
const ONE_SECOND_IN_MS = 40;

export default function FriendScreen({ navigation }) {
  React.useEffect(() => {
    users();
  }, []);
  const theme = useSelector((state) => state.themeReducer.theme);

  const [visible, setVisible] = React.useState(false);
  const [data, setdata] = React.useState(DATA); //DATA
  const [location, setLocation] = React.useState([]);
  const [upload, setUpload] = React.useState(false);
  const [name, setName] = React.useState();

  // empty lists ------------------->

  const UsersTable = [];
  const list = [];
  const locations = [];

  // ***********************************

  // Getting User of data.......................................>

  const users = async () => {
    let myuid = firebase.auth().currentUser.uid;
    // let myuid = "ANSCBSJDCVHJ11C";
    console.log("The search user id is: ", myuid);
    setName(myuid);

    let users = await dbh
      .collection("Users")
      .where("userId", "!=", myuid)
      .get()
      .then((querySnapshot) => {
        console.log("Total Users: ", querySnapshot.size);
        // setNearusers(querySnapshot.size);

        querySnapshot.forEach((doc) => {
          const { userId, latitude, longitude } = doc.data();
          list.push({
            userId,
            latitude,
            longitude,
          });
        });
      });

    // console.log(list);

    let userLocation = await dbh
      .collection("Users")
      .where("userId", "==", myuid)
      .get()
      .then((querySnapshot) => {
        console.log("Me: ", querySnapshot.size);

        querySnapshot.forEach((doc) => {
          const { latitude, longitude } = doc.data();
          locations.push({
            latitude,
            longitude,
          });
        });
      });
    // console.log("the locations are here:=", locations);
    setLocation(locations);
    setdata(list);
    setUpload(true);
    setVisible(false);
  };

  // Calculate the distance......................................>

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    var distance_m = d * 1000;
    // setDistance(distance_m)
    // console.log(distance,"meters")
    return distance_m;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // Saving the data.......................................>

  if (upload) {
    let x = 0;
    data.forEach(() => {
      let distance = getDistanceFromLatLonInKm(
        location[0].latitude,
        location[0].longitude,
        data[x].latitude,
        data[x].longitude
      );

      // console.log(distance, "extra meter");
      // console.log("userId: ", data[x].userId);

      if (distance <= 6000) {
        console.log(distance, "meter");
        console.log("userId: ", data[x].userId);
        console.log(name);
        UsersTable.push({
          name: data[x].userId,
          myId: name,
        });
      }
      x++;
    });
    // setVisible(false)
  }
  console.log("The userTable is here my boy: =", UsersTable);

  // ENDS HERE ***********************

  var style = { color: theme.TEXT_COLOR };

  const OverflowItems = ({ data, scrollXAnimated }) => {
    const inputRange = [-1, 0, 1];
    const translateY = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
    });
    return (
      <>
        {visible && <SearchLoader visible={visible} />}
        {!visible ? (
          <View
            style={{
              height: OVERFLOW_HEIGHT,
              overflow: "hidden",
              flexDirection: "row",
              backgroundColor: theme.BACKGROUND_COLOR,
            }}
          >
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => {
                  Vibration.vibrate(1 * ONE_SECOND_IN_MS);
                  console.log("Let's go back");
                  navigation.goBack();
                }}
              >
                <Ionicons
                  name="ios-chevron-back-circle-outline"
                  size={30}
                  color={theme.TEXT_COLOR}
                />
              </TouchableOpacity>
            </View>
            <Animated.View style={{ transform: [{ translateY }] }}>
              {UsersTable.map((list, index) => {
                return (
                  <View key={index} style={styles.itemContainer}>
                    <AppText style={[styles.title, style]} numberOfLines={1}>
                      {list.name}
                    </AppText>
                  </View>
                );
              })}
              {/* {data.map((item, index) => {
                return (
                  <View key={index} style={styles.itemContainer}>
                    <AppText style={[styles.title, style]} numberOfLines={1}>
                      {item.name}
                    </AppText>
                  </View>
                );
              })} */}
            </Animated.View>
          </View>
        ) : (
          <View />
        )}
      </>
    );
  };

  // const [data, setData] = React.useState(DATA);
  // const [data, setData] = React.useState(SECOND_DATA)
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // get new data
      // fetch more data
      const newData = [...data, ...data];
      setdata(newData);
    }
  });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: theme.BACKGROUND_COLOR,
          }}
        >
          <StatusBar hidden />
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
          {!visible ? (
            <FlatList
              data={UsersTable}
              keyExtractor={(_, index) => String(index)}
              horizontal
              inverted
              contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                padding: SPACING * 2,
                marginTop: 50,
              }}
              scrollEnabled={false}
              removeClippedSubviews={false}
              CellRendererComponent={({
                item,
                index,
                children,
                style,
                ...props
              }) => {
                const newStyle = [style, { zIndex: data.length - index }];
                return (
                  <View style={newStyle} index={index} {...props}>
                    {children}
                  </View>
                );
              }}
              renderItem={({ item, index }) => {
                const inputRange = [index - 1, index, index + 1];
                const translateX = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [50, 0, -100],
                });
                const scale = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [0.8, 1, 1.3],
                });
                const opacity = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                });

                return (
                  // <AnimatedTouchable onPress={()=>console.log("Hello bro")}>
                  <Animated.View
                    style={{
                      position: "absolute",
                      left: -ITEM_WIDTH / 2,
                      opacity,
                      transform: [
                        {
                          translateX,
                        },
                        { scale },
                      ],
                    }}
                  >
                    {item.default_image ? (
                      <Image
                        // ---------------------- when it's true ------------------------->
                        // source={{ uri: item.poster }}
                        source={item.default_image}
                        style={{
                          width: ITEM_WIDTH,
                          height: ITEM_HEIGHT,
                          borderRadius: 14,
                        }}
                      />
                    ) : (
                      <TouchableWithoutFeedback
                        onPress={() => navigation.navigate("chat", item)}
                      >
                        <Image
                          // source={{ uri: item.poster }}
                          source={require("../assets/ankit.jpg")}
                          style={{
                            width: ITEM_WIDTH,
                            height: ITEM_HEIGHT,
                            borderRadius: 14,
                          }}
                        />
                      </TouchableWithoutFeedback>
                    )}
                  </Animated.View>
                  // </AnimatedTouchable>
                );
              }}
            />
          ) : (
            <View />
          )}
          {!visible ? (
            <View style={styles.btn}>
              <ThreeBtn
                name="refresh"
                color={theme.TEXT_COLOR}
                onPress={() => {
                  console.log("hey bro it's refreshing");
                  setVisible(true);
                  users();
                }}
                style={{ backgroundColor: theme.HEADER_COLOR }}
              />
            </View>
          ) : (
            <View />
          )}
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#1E1D1D",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -1,
    color: "#fff",
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
    alignItems: "center",
    marginTop: -0.4,
  },
  iconContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
    marginLeft: -10,
  },

  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "#1E1D1D",
    // justifyContent: "space-between"
  },
  btn: {
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
    left: "50%",
    right: "50%",
  },
});
