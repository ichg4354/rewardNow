import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Button, View } from "react-native";
import { authService } from "../fBase";

const Home = ({ user, loggedIn }) => {
  const navigation = useNavigation();
  const onLogoutBtnClick = async () => {
    await authService.signOut();
  };
  return (
    <View>
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate("Detail")}
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
