import React, { useEffect, useState } from "react";
import { Dimensions, PanResponder, Animated, Linking } from "react-native";
import styled from "styled-components/native";
import { useIsFocused } from "@react-navigation/core";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import dotenv from "dotenv";
import { Helmet } from "react-helmet";
import { Ionicons } from "@expo/vector-icons";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const discover = [
  "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0d15c714-8741-4a9f-8719-a26afc0f3dac/-.-001_%283%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210402T132356Z&X-Amz-Expires=86400&X-Amz-Signature=df6d81c472d2efbece7a19971c70709933380a5edae1f0dc59d50317bff80d15&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22-.-001_%283%29.png%22",
  "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9a21e3d5-324b-4591-91a8-123be4adcb17/-.-002_%281%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210402T133819Z&X-Amz-Expires=86400&X-Amz-Signature=0d9a3eff8d18e0904fa281354a2abb4b44c33f77d003fdb76f6dbab5d8aa426b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22-.-002_%281%29.png%22",
];

const AboutUsContainer = styled.View`
  padding: 30px;
  flex: 1;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const AboutUsHeader = styled.Text`
  font-size: 35px;
  margin-bottom: 35px;
  font-weight: bold;
  position: absolute;
  left: 30px;
  top: 30px;
`;

const SocialContainer = styled.View``;
// const Card = styled.View`
//   width: 100%;
//   height: 100%;
//   justify-content: center;
//   align-items: center;
// `;

const DiscoveryContainer = styled.View``;
const DiscoveryPoster = styled.Image`
  width: 90%;
  height: ${HEIGHT / 1.5}px;
  border-radius: 30px;
`;

const AboutUs = () => {
  dotenv.config();

  const [TopIndex, setTopIndex] = useState(0);
  const position = new Animated.ValueXY();
  const nextCard = () => setTopIndex(TopIndex + 1);

  const BODY = document.querySelector("body");

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (ext, { dx, dy }) => {
      position.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: async (ext, { dx, dy }) => {
      if (dx >= 150) {
        Animated.spring(position, {
          toValue: {
            x: WIDTH + 300,
            y: dy,
          },
          useNativeDriver: true,
        }).start(nextCard);
      } else if (dx <= -150) {
        Animated.spring(position, {
          toValue: {
            x: -WIDTH - 300,
            y: dy,
          },
          useNativeDriver: true,
        }).start(nextCard);
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      }
    },
  });
  const animatedStyle = position.getTranslateTransform();
  const rotationValue = position.x.interpolate({
    inputRange: [-255, 0, 255],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });
  const secondOpacityValue = position.x.interpolate({
    inputRange: [-255, 0, 255],
    outputRange: [1, 0.2, 1],
    extrapolate: "clamp",
  });
  const secondScaleValue = position.x.interpolate({
    inputRange: [-255, 0, 255],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp",
  });

  const isFocusedAboutUs = useIsFocused();
  {
    isFocusedAboutUs ? disableBodyScroll(BODY) : clearAllBodyScrollLocks(BODY);
  }
  return (
    <AboutUsContainer class="AboutUsContainer">
      <AboutUsHeader>About Us</AboutUsHeader>
      <SocialContainer>
        <Ionicons
          name="logo-instagram"
          size={50}
          onPress={() =>
            Linking.openURL("https://www.instagram.com/pushandgetofficial/")
          }
        ></Ionicons>
      </SocialContainer>
      <>
        {discover?.map((each, key) => {
          if (key < TopIndex) {
            return null;
          }
          if (key === TopIndex) {
            return (
              <Animated.View
                key={key}
                {...panResponder.panHandlers}
                style={{
                  ...styles,
                  zIndex: 1,
                  transform: [...animatedStyle, { rotate: rotationValue }],
                }}
              >
                <DiscoveryPoster source={{ uri: each }}></DiscoveryPoster>
              </Animated.View>
            );
          } else if (key === TopIndex + 1) {
            return (
              <Animated.View
                key={key}
                {...panResponder.panHandlers}
                style={{
                  ...styles,
                  zIndex: 0,
                  opacity: secondOpacityValue,
                  transform: [{ scale: secondScaleValue }],
                }}
              >
                <DiscoveryPoster source={{ uri: each }}></DiscoveryPoster>
              </Animated.View>
            );
          } else {
            return (
              <Animated.View
                key={key}
                {...panResponder.panHandlers}
                style={{
                  zIndex: -1,
                  ...styles,
                  opacity: 0,
                }}
              >
                <DiscoveryPoster source={{ uri: each }}></DiscoveryPoster>
              </Animated.View>
            );
          }
        })}
      </>
    </AboutUsContainer>
  );
};

export default AboutUs;

const styles = {
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
};
