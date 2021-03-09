import React from "react";
import { Button, View } from "react-native";
import { authService } from "../fBase";

const Home = ({ navigation, user, loggedIn }) => {
  const onLogoutBtnClick = async () => {
    await authService.signOut();
  };
  console.log(user);
  return (
    <View>
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate("Detail")}
      />
      <Button title="Go to Join" onPress={() => navigation.navigate("Join")} />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Button title={"LogOut"} onPress={onLogoutBtnClick} />
    </View>
  );
};

export default Home;
