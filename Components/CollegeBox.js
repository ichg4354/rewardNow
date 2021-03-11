import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Button, Text } from "react-native";

const CollegeBox = ({ college, likes, comments, id, user, loggedIn }) => {
  const navigation = useNavigation();
  const onCollegeBoxClick = () => {
    if (loggedIn) {
      navigation.navigate("Detail", {
        id: id,
        comments: comments,
        college: college,
        likes: likes,
        user: user,
      });
    } else {
      navigation.navigate("Join");
    }
  };
  const onCollegeLikeBtnClick = () => {
    //내 프로필
  };
  return (
    <View onClick={onCollegeBoxClick}>
      <Text>{college}</Text>
      <Text>{likes} Likes</Text>
      <Button title={"👍"} onPress={onCollegeLikeBtnClick}></Button>
    </View>
  );
};

export default CollegeBox;
