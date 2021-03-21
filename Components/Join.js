import React, { useState } from "react";
import { Button, View, TouchableOpacity, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { authService, storeService } from "../fBase";
import styled from "styled-components/native";

const JoinContainer = styled.View`
  justify-content: center;
  margin-top: 50px;
  padding: 30px;
`;

const JoinTextInput = styled.TextInput`
  padding: 15px;
  border: 1px solid lightblue;
  border-radius: 15px;
  margin-bottom: 15px;
`;

const JoinButton = styled.TouchableOpacity`
  align-items: center;
  background-color: lightblue;
  padding: 15px;
  border-radius: 10px;
  opacity: 15;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const LoginButton = styled.TouchableOpacity`
  align-items: center;
  background-color: lightblue;
  padding: 15px;
  border-radius: 10px;
  opacity: 15;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: gray;
  font-weight: bold;
`;

const Join = ({ navigation }) => {
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [password2, setPassword2] = useState(undefined);
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [college, setCollege] = useState(undefined);

  const onJoinBtnPress = async () => {
    try {
      if (password === password2) {
        if (name) {
          if (email) {
            if (phoneNumber) {
              if (college) {
                const data = await authService.createUserWithEmailAndPassword(
                  email,
                  password
                );
                console.log(data.user.uid);
                createUserData(data.user.uid);
                navigation.navigate("Home");
              } else {
                alert("Collge Empty");
              }
            } else {
              alert("Phone Number Empty");
            }
          } else {
            alert("Email Empty");
          }
        } else {
          alert("Name Empty");
        }
      } else {
        alert("password incorrect");
        resetPassword();
      }
    } catch (error) {
      alert(error);
    }
  };

  const createUserData = async (userId) => {
    console.log(userId);
    await storeService.collection("users").doc(userId).set({
      userId: userId,
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      college: college,
      likedCollege: [],
    });
  };

  const resetPassword = () => {
    setPassword("");
    setPassword2("");
  };

  const fakeItems = [
    {
      label: "USA",
      value: "usa",
      hidden: true,
    },
    {
      label: "UK",
      value: "uk",
    },
    {
      label: "France",
      value: "france",
    },
  ];
  return (
    <JoinContainer>
      <JoinTextInput
        placeholder={"Name"}
        onChange={(e) => setName(e.target.value)}
        value={name}
        required={true}
      />
      <JoinTextInput
        placeholder={"Email"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required={true}
      />
      <JoinTextInput
        placeholder={"Password"}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required={true}
      />
      <JoinTextInput
        placeholder={"Password2"}
        onChange={(e) => setPassword2(e.target.value)}
        value={password2}
        required={true}
      />
      <JoinTextInput
        placeholder={"PhoneNumber"}
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phoneNumber}
        required={true}
      />
      <DropDownPicker
        items={fakeItems}
        defaultValue={college}
        containerStyle={{ height: 40 }}
        style={{
          backgroundColor: "#fafafa",
          borderColor: "lightblue",
          borderRadius: "10px",
        }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
        onChangeItem={(e) => setCollege(e.value)}
        placeholder="대학 이름을 골라주세요~"
        required={true}
      />
      <JoinButton onPress={onJoinBtnPress}>
        <ButtonText>Join</ButtonText>
      </JoinButton>
      <LoginButton onPress={() => navigation.navigate("Login")}>
        <ButtonText>Do you have a account?</ButtonText>
      </LoginButton>
    </JoinContainer>
  );
};

export default Join;
