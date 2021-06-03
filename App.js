import React from "react";

import ChatNavigator from "./app/Navigation/ChatNavigator";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { NavigationContainer } from "@react-navigation/native";
import themeReducer from "./app/components/redux/themeReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import MainScreen from "./app/screens/MainScreen";

import AuthScreen from "./app/screens/AuthScreen";

import { createSwitchNavigator, createAppContainer } from "react-navigation";

import firebase from "firebase";
import { firebaseConfig } from "./app/config/config";

import AllScreen from "./app/screens/AllScreen"

import WelcomeScreen from "./app/screens/WelcomeScreen";

import SearchLoader from "./app/components/SearchLoader";
import LoadingScreen from "./app/screens/LoadingScreen";

const store = createStore(
  combineReducers({ themeReducer }),
  applyMiddleware(thunk)
);

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {

  const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen: LoadingScreen,
    AuthScreen: AuthScreen,
    MainScreen: AllScreen,
  });

  const AppNavigator = createAppContainer(AppSwitchNavigator);

  return (
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <ChatNavigator />
    //   </NavigationContainer>
    // </Provider>
    <Provider store={store}>
      <AppNavigator />
    </Provider>

    // {/* <WelcomeScreen /> */}
  );
}
