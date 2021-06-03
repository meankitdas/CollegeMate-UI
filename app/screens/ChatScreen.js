import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Vibration,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";

import { useSelector } from "react-redux";

import io from "socket.io-client";

import firebase from "firebase";
import { firebaseConfig } from "../config/config";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const dbh = firebase.firestore();

import AppText from "../components/Text";
import Header from "../components/Header";
import Sent from "../components/Chats/Sent";
import Received from "../components/Chats/Received";
import Screen from "../components/Screen";

import * as Animatable from "react-native-animatable";

const ONE_SECOND_IN_MS = 40;

function ChatScreen({ route }) {
  const item = route.params;

  useEffect(() => {
    Create_uniqueId();
  }, []);

  const MY_USER_ID = item.myId;
  const FRIEND_USER_ID = item.name;

  const [created_uniqueId, setCreated_uniqueId] = useState("");
  const [done, setDone] = useState(false);

  const [start, setStart] = useState(false);

  const Create_uniqueId = () => {
    if (FRIEND_USER_ID < MY_USER_ID) {
      let UNIQUE_ID = MY_USER_ID + FRIEND_USER_ID;
      setCreated_uniqueId(UNIQUE_ID);
      console.log(UNIQUE_ID);
      console.log("State: ", created_uniqueId);
      setDone(true);
    } else {
      let UNIQUE_ID = FRIEND_USER_ID + MY_USER_ID;
      setCreated_uniqueId(UNIQUE_ID);
      console.log(UNIQUE_ID);
      console.log(created_uniqueId);
      setDone(true);
    }
  };

  const theme = useSelector((state) => state.themeReducer.theme);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("https://ef60cb6103e7.ngrok.io");
    socketRef.current.emit("message", { message: "Hello it's working" });

    return () => socketRef.current.disconnect();
  }, []);

  const todoInput = React.useRef();
  const [task, setTask] = React.useState();

  const data = [
    {
      id: 1,
      message: "Hi",
    },
    {
      id: 2,
      message: "Hello my boy is it fine",
    },
    {
      id: 3,
      message: "Nope it's not the case!!!",
    },
    {
      id: 24,
      message: "Then what's the case??",
    },
    {
      id: 36,
      message: "I don't wanna tell anyone.....I am really sad now",
    },
  ];

  const GET_DATA = [
    {
      id: 3,
      message: "Hi",
      receiver_id: "7Ks9OH8lbYT2We0X39dYN9EIEJn1",
      sender_id: "N57peieYZIeaL7rlC0TrbTinDQp1",
    },
    {
      id: 4,
      message: "Hello",
      receiver_id: "N57peieYZIeaL7rlC0TrbTinDQp1",
      sender_id: "7Ks9OH8lbYT2We0X39dYN9EIEJn1",
    },
  ];

  if (done) {
    socketRef.current.emit("join_room", { room: created_uniqueId });
    socketRef.current.on("example", (message) => {
      console.log(message);
    });
    // setDone(false);
    // setStart(true);
  }

  if (start) {
    socketRef.current.on("example", (message) => {
      console.log(message);
    });
  }

  // const DATA = data.concat().reverse()

  const [messages, setMessages] = React.useState(GET_DATA);

  const [inputMessage, setInputMessage] = React.useState("");

  function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  // let x = 5;
  // const uniId = () => {
  //   while (x >= 5) {
  //     x++
  //     x = x*2
  //     return x
  //   }
  // };

  function handleSubmit() {
    todoInput.current.clear();
    socketRef.current.emit("chat_message", {
      room: created_uniqueId,
      message: inputMessage,
    });
    setMessages([
      ...messages,
      {
        id: 6,
        sender_id: MY_USER_ID,
        receiver_id: FRIEND_USER_ID,
        message: inputMessage,
      },
    ]);

    // console.log(GET_DATA);
  }

  // function handleSubmit() {
  //   if (inputMessage === "") {
  //     return setInputMessage("");
  //   }
  //   let t = getTime(new Date());
  //   setMessages([
  //     ...messages,
  //     {
  //       id: 28,
  //       message: inputMessage,
  //     },
  //   ]);
  //   setInputMessage("");
  // }

  const TEMPLATE = (item) => {
    if (item.sender_id === MY_USER_ID) {
      return (
        <Sent
          message={item.message}
          color={{ backgroundColor: theme.HEADER_COLOR }}
          secondaryColor={{ color: theme.TEXT_COLOR }}
        />
      );
    }

    if (item.sender_id !== MY_USER_ID) {
      return (
        <Received
          message={item.message}
          color={{ backgroundColor: theme.INPUT_COLOR }}
          secondaryColor={{ color: theme.TEXT_COLOR }}
        />
      );
    }
  };

  return (
    <>
      <StatusBar hidden translucent backgroundColor="transparent" />
      {/* <Screen> */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, backgroundColor: theme.BACKGROUND_COLOR }}>
          <View style={styles.secContainer}>
            <View>
              <FlatList
                data={messages}
                // inverted

                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <View>
                    {TEMPLATE(item)}
                    {/* <Received message="{v.message}" /> */}
                  </View>
                )}
              />
            </View>

            {/* <Sent message="Hi..." />
          <Sent message="Hi...Helloo What is up with you" /> */}
            <View style={styles.writeTaskWrapper}>
              <TextInput
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  backgroundColor: theme.INPUT_COLOR,
                  borderRadius: 20,
                  width: 290,
                  color: theme.TEXT_COLOR,
                  maxHeight: 70,
                }}
                placeholder={"Type your message..."}
                ref={todoInput}
                placeholderTextColor={theme.PLACEHOLDER_COLOR}
                defaultValue={inputMessage}
                multiline
                // value={task}
                // onChangeText={(text) => setTask(text)}
                onChangeText={(text) => setInputMessage(text)}
                onSubmitEditing={() => {
                  handleSubmit();
                }}
              />
              <TouchableOpacity onPress={() => handleSubmit()}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: theme.INPUT_COLOR,
                    borderRadius: 60,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="send" size={15} color={theme.TEXT_COLOR} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* </KeyboardAvoidingView> */}
      </TouchableWithoutFeedback>
      {/* </Screen> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1D1D",
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#C4C4C4",
    borderRadius: 60,
    width: 290,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#ececec",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#C4C4C4",
    // borderWidth: 1,
  },
  head: {
    top: 0,
  },
  secContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userProfileImage: { height: 40, width: 40, borderRadius: 35 },
  name: {
    color: "#fff",
  },
});

export default ChatScreen;
