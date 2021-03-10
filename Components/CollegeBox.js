import React from "react";
import { View, Button, Text } from "react-native";

const CollegeBox = ({ college, likes, comments }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text>{college}</Text>
      <Text>{likes} Likes</Text>
      <Button title={"👍"}></Button>
    </View>
  );
};

export default CollegeBox;
