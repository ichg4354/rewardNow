import React from "react";
import { Button, View } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate("Detail")}
      />
      <Button title="Go to Join" onPress={() => navigation.navigate("Join")} />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default Home;
