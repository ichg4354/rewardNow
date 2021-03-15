import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { authService, storeService } from "../fBase";
import CollegeContainer from "./CollegeContainer";

const Home = ({ user, loggedIn }) => {

  const navigation = useNavigation();

  const onLogoutBtnClick = async () => {
    await authService.signOut();
  };

  return (
    <View>
      <CollegeContainer
        userId={user?.uid}
        loggedIn={loggedIn}
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
