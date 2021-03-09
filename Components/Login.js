import React, { useState } from "react";
import { View, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { authService } from "../fBase";

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
    <View>
      <TextInput
        placeholder={"Email"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required={true}
      />
      <TextInput
        placeholder={"Password"}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required={true}
      />
      <Button title={"Log In"} onPress={onLoginBtnClick} />
    </View>
  );
};

export default Login;
