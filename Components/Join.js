import React, { useState } from "react";
import { Button, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { authService, storeService } from "../fBase";

const Join = () => {
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [password2, setPassword2] = useState(undefined);
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [college, setCollege] = useState(undefined);
  const [userId, setUserId] = useState(undefined);

  const onJoinBtnPress = async () => {
    try {
      if (password === password2) {
        const data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
        console.log(data.user.uid);
        createUserData(data.user.uid);
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
    <View>
      <TextInput
        placeholder={"Name"}
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <TextInput
        placeholder={"Email"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <TextInput
        placeholder={"Password"}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <TextInput
        placeholder={"Password2"}
        onChange={(e) => setPassword2(e.target.value)}
        value={password2}
      />
      <TextInput
        placeholder={"PhoneNumber"}
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phoneNumber}
      />
      <DropDownPicker
        items={fakeItems}
        defaultValue={college}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: "#fafafa" }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
        onChangeItem={(e) => setCollege(e.value)}
        placeholder="대학 이름을 골라주세요~"
      />
      <Button title={"Join"} onPress={onJoinBtnPress} />
    </View>
  );
};

export default Join;
