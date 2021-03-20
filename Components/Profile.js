import { useNavigation } from "@react-navigation/core";
import React from "react";
import { authService } from "../fBase";
import { Button, View, Text } from "react-native";

const Profile = ({ user, loggedIn }) => {
  const navigation = useNavigation();

  const onLogoutBtnClick = async () => {
    await authService.signOut();
  };

  return (
    <View>
      {loggedIn ? <Text>{user.email}님 안녕하세요~</Text> : <></>}
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

export default Profile;
