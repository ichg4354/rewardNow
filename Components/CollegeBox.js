import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Button, Text } from "react-native";

const CollegeBox = ({ college, likes, comments, id }) => {
  const navigation = useNavigation();
  const onCollegeBoxClick = () => {
    navigation.navigate("Detail", {
      id: id,
      comments: comments,
      college: college,
      likes: likes,
    });
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
