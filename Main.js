import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

const casheImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

const casheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);

  const loadAssets = () => {
    const images = casheImages([
      "https://vectorified.com/images/picture-not-available-icon-1.png",
    ]);
    const fonts = casheFonts([IonIcons.font]);
    return Promise.all([...images, ...fonts]);
  };

  const onFinish = () => setIsLoading(true);

  return isLoading ? (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      onError={console.error}
    />
  ) : (
    <NavigationContainer></NavigationContainer>
  );
};

export default Main;
