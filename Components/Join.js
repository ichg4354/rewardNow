import React, { useState } from "react";
import { Button, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { authService, storeService } from "../fBase";

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
    <View>
      <input
        placeholder={"Name"}
        onChange={(e) => setName(e.target.value)}
        value={name}
        required={true}
      />
      <input
        placeholder={"Email"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required={true}
      />
      <input
        placeholder={"Password"}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required={true}
      />
      <input
        placeholder={"Password2"}
        onChange={(e) => setPassword2(e.target.value)}
        value={password2}
        required={true}
      />
      <input
        placeholder={"PhoneNumber"}
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phoneNumber}
        required={true}
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
        required={true}
      />
      <Button title={"Join"} onPress={onJoinBtnPress} />
      <Button
        title="Do you have a account?"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default Join;
