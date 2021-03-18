import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { authService, storeService } from "../fBase";
import CollegeContainer from "./CollegeContainer";

const Home = ({ user, loggedIn }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const onLogoutBtnClick = async () => {
    await authService.signOut();
  };

  const onSearchInputChange = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setSearchQuery("");
    } else {
      setSearchQuery(text);
    }
  };

  return (
    <View>
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
      />
      {loggedIn ? (
        <></>
      ) : (
        <Button
          title="Go to Join"
          onPress={() => navigation.navigate("Join")}
        />
      )}
      {loggedIn ? (
        <Button title={"LogOut"} onPress={onLogoutBtnClick} />
      ) : (
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
        />
      )}
    </View>
  );
};

export default Home;
