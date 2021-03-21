import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Stack from "./Navigation/Stack";
import { authService } from "./fBase";
import {} from "@expo-google-fonts/inter";

const casheImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

const casheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const App = () => {
  const [user, setUser] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [prefetchState, setPrefetchState] = useState(false);

  const loadAssets = () => {
    const images = casheImages([
      "https://vectorified.com/images/picture-not-available-icon-1.png",
    ]);
    const fonts = casheFonts([Ionicons.font]);
    return Promise.all([...images, ...fonts]);
  };

  const onFinish = () => setPrefetchState(true);

  useEffect(
    () =>
      authService.onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          setLoggedIn(true);
          setUser(user);
        } else {
          setLoggedIn(false);
        }
        setInit(true);
      }),
    []
  );

  return init && prefetchState ? (
    <NavigationContainer>
      <Stack loggedIn={loggedIn} user={user} />
    </NavigationContainer>
  ) : (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      onError={console.error}
    />
  );
};

export default App;
