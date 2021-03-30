import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { authService } from "../fBase";
import styled from "styled-components/native";

const LoginContainer = styled.View`
  justify-content: center;
  margin-top: 50px;
  padding: 30px;
`;
const LoginTextInput = styled.TextInput`
  padding: 15px;
  border: 2px solid lightblue;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const LoginButton = styled.TouchableOpacity`
  align-items: center;
  background-color: lightblue;
  padding: 15px;
  border-radius: 10px;
  opacity: 15;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  margin-bottom: 10px;
  margin-top: 15px;
`;

const ButtonText = styled.Text`
  color: gray;
  font-weight: bold;
`;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const onLoginBtnClick = async () => {
    try {
      if (email) {
        if (password) {
          await authService.signInWithEmailAndPassword(email, password);
          navigation.navigate("Home");
        } else {
          alert("Email Empty");
        }
      } else {
        alert("Password Empty");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <LoginContainer>
      <LoginTextInput
        placeholder={"Email"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required={true}
      />
      <LoginTextInput
        placeholder={"Password"}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required={true}
      />
      <LoginButton onPress={onLoginBtnClick}>
        <ButtonText>Login</ButtonText>
      </LoginButton>
    </LoginContainer>
  );
};

export default Login;
