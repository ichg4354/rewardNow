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
      <TextInput
        placeholder={"Search"}
        onChangeText={(text) => onSearchInputChange(text)}
        onContentSizeChange={(event) => console.log(event)}
        required={true}
        value={searchQuery}
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
