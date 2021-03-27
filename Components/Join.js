import React, { useState } from "react";
import { Button, View, TouchableOpacity, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { authService, storeService } from "../fBase";
import styled from "styled-components/native";
import { collegeNames } from "../tools";

const JoinContainer = styled.View`
  justify-content: center;
  padding: 30px;
`;

const JoinTextInput = styled.TextInput`
  padding: 15px;
  border: 2px solid lightblue;
  border-radius: 10px;
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
  margin-top: 15px;
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
  color: white;
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
        items={collegeNames.map((each) => {
          return {
            label: each,
            value: each,
          };
        })}
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
        placeholder="단과대 이름을 골라주세요~"
        required={true}
      />
      <JoinButton onPress={onJoinBtnPress}>
        <ButtonText>가입하기</ButtonText>
      </JoinButton>
      <LoginButton onPress={() => navigation.navigate("로그인")}>
        <ButtonText>이미 계정이 있나요?</ButtonText>
      </LoginButton>
    </JoinContainer>
  );
};

export default Join;
