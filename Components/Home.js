import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { authService, storeService } from "../fBase";
import CollegeContainer from "./CollegeContainer";

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
    <ScrollView>
      <input
        placeholder={"Search"}
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
    </ScrollView>
  );
};

export default Home;
