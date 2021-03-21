import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { authService, storeService } from "../fBase";
import CollegeContainer from "./CollegeContainer";
import styled from "styled-components/native";

const HomeScrollView = styled.ScrollView`
  padding: 30px;
`;

const HomeSearchTextInput = styled.TextInput`
  padding: 30px;
  border: 1px solid gray;
  border-radius: 15px;
`;
const Home = ({ user, loggedIn }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onSearchInputChange = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setSearchQuery("");
    } else {
      setSearchQuery(text);
    }
  };

  return (
    <HomeScrollView>
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
