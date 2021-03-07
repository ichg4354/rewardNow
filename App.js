import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Stack from "./Navigation/Stack";

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
  const [isLoading, setIsLoading] = useState(false);

  const loadAssets = () => {
    const images = casheImages([
      "https://vectorified.com/images/picture-not-available-icon-1.png",
    ]);
    const fonts = casheFonts([Ionicons.font]);
    return Promise.all([...images, ...fonts]);
  };

  const onFinish = () => setIsLoading(false);

  return isLoading ? (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      onError={console.error}
    />
  ) : (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
};

export default App;
