import React from "react";
import { View, Button, Text } from "react-native";

const CollegeBox = ({ college, likes, comments, id }) => {
  const onCollegeBoxClick = () => {
    console.log(id);
  };
  return (
    <View onClick={onCollegeBoxClick}>
      <Text>{college}</Text>
      <Text>{likes} Likes</Text>
      <Button title={"👍"}></Button>
    </View>
  );
};

export default CollegeBox;
