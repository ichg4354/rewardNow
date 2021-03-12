import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Button, Text } from "react-native";
import { storeService } from "../fBase";

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
  const onCollegeLikeBtnClick = async () => {
    await storeService
      .collection("colleges")
      .doc(id)
      .update({ likes: likes + 1 });
    //내 user db속 liked list 에서 대학id가 없으면
    //1. 대학db에 좋아요 + 1
    //2. 대학 db에 내 id 넣기 (부차적)
    //3. user db에 대학id 넣기
    //내 user db속 liked list 에서 대학 id가 있으면
    //1. 대학db에 좋아요 -1
    //2.대학 db에 내 id 빼기 (부차적)
    //3. user db에서 대학 id 빼기
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
