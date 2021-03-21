import { useNavigation } from "@react-navigation/core";
import React from "react";
import { authService } from "../fBase";
import { Button, View, Text } from "react-native";
import styled from "styled-components/native";

const ProfileContainer = styled.View`
  padding: 30px;
  justify-content: center;
  margin-top: 30vh;
`;

const Profile = ({ user, loggedIn }) => {
  const navigation = useNavigation();

  const onLogoutBtnClick = async () => {
    await authService.signOut();
  };

  return (
    <ProfileContainer>
      {loggedIn ? <Text>{user?.email}님 안녕하세요~</Text> : <></>}
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
    </ProfileContainer>
  );
};

export default Profile;
