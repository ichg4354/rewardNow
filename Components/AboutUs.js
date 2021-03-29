import React, { useEffect, useState } from "react";
import { Dimensions, PanResponder, Animated } from "react-native";
import styled from "styled-components/native";
import { useIsFocused } from "@react-navigation/core";
import { disableBodyScroll } from "body-scroll-lock";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const discover = [
  "https://images.unsplash.com/photo-1616995837523-c2b478fc81a5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2133&q=80",
  "https://images.unsplash.com/photo-1616984855875-d0be5f06706a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80",
  "https://images.unsplash.com/photo-1616983848157-cc0a7a59f825?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1936&q=80",
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
const Card = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const DiscoveryPoster = styled.Image`
  width: 90%;
  height: ${HEIGHT / 1.5}px;
  border-radius: 30px;
`;

const AboutUs = () => {
  const isFocused = useIsFocused();
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
  useEffect(() => {
    disableBodyScroll(BODY);
  }, [isFocused]);
  return (
    <AboutUsContainer>
      <AboutUsHeader>About Us</AboutUsHeader>
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
