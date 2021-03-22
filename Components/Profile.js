import { useNavigation } from "@react-navigation/core";
import React from "react";
import { authService } from "../fBase";
import { Button, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const ProfileContainer = styled.View`
  padding: 30px;
  justify-content: center;
  margin-top: 30vh;
`;

const ProfileButton = styled.TouchableOpacity`
  align-items: center;
  background-color: lightblue;
  padding: 10px;
  border-radius: 10px;
  opacity: 15;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  margin-bottom: 30px;
  padding: 10px 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 18px;
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
        <ProfileButton onPress={() => navigation.navigate("Join")}>
          <ButtonText>Join</ButtonText>
        </ProfileButton>
      )}
      {loggedIn ? (
        <ProfileButton onPress={onLogoutBtnClick}>
          <ButtonText>Log Out</ButtonText>
        </ProfileButton>
      ) : (
        <ProfileButton onPress={() => navigation.navigate("Login")}>
          <ButtonText>Log in</ButtonText>
        </ProfileButton>
      )}
    </ProfileContainer>
  );
};

export default Profile;
