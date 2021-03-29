import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { authService, storeService } from "../fBase";
import CollegeContainer from "./CollegeContainer";
import styled from "styled-components/native";
import { useIsFocused } from "@react-navigation/core";
import { clearAllBodyScrollLocks } from "body-scroll-lock";

const HomeScrollView = styled.ScrollView`
  padding: 30px;
`;
const HomeHeader = styled.Text`
  font-size: 35px;
  margin-bottom: 35px;
  font-weight: bold;
  color: black;
`;

const HomeSearchTextInput = styled.TextInput`
  padding: 10px;
  border: 2px solid lightblue;
  border-radius: 10px;
`;
const Home = ({ user, loggedIn }) => {
  const isFocused = useIsFocused();
  const BODY = document.querySelector("body");

  const [searchQuery, setSearchQuery] = useState("");

  const onSearchInputChange = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setSearchQuery("");
    } else {
      setSearchQuery(text);
    }
  };

  useEffect(() => {
    clearAllBodyScrollLocks(BODY);
  }, [isFocused]);

  return (
    <HomeScrollView>
      <HomeHeader>Push & Get</HomeHeader>
      <HomeSearchTextInput
        placeholder={"검색하기"}
        required={true}
        value={searchQuery}
        onChange={(e) => onSearchInputChange(e.target.value)}
      />
      <CollegeContainer
        userId={user?.uid}
        loggedIn={loggedIn}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </HomeScrollView>
  );
};

export default Home;
