import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { authService } from "../fBase";
import { Button, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useIsFocused } from "@react-navigation/core";
import { BODY } from "../tools";
import { disableBodyScroll } from "body-scroll-lock";

const ProfileContainer = styled.View`
  padding: 30px;
  justify-content: center;
`;

const ProfileHeader = styled.Text`
  font-size: 35px;
  margin-bottom: 35px;
  font-weight: bold;
  color: black;
  margin-bottom: 30vh;
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
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const onLogoutBtnClick = async () => {
    await authService.signOut();
  };

  useEffect(() => {
    disableBodyScroll(BODY);
  }, [isFocused]);
  return (
    <ProfileContainer>
      {loggedIn ? (
        <ProfileHeader>Profile</ProfileHeader>
      ) : (
        <ProfileHeader>Join or Log in</ProfileHeader>
      )}
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
