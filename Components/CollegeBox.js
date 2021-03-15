import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import { ArrayTool, authService, storeService } from "../fBase";

const CollegeBox = ({
  college,
  likes,
  comments,
  collegeId,
  userId,
  loggedIn,
  likedCollege,
  setLikedCollege,
}) => {
  const navigation = useNavigation();

  const onCollegeBoxClick = () => {
    if (loggedIn) {
      navigation.navigate("Detail", {
        id: collegeId,
        comments: comments,
        college: college,
        likes: likes,
        userId: userId,
      });
    } else {
      navigation.navigate("Join");
    }
  };

  const onCollegeLikeBtnClick = async () => {
    if (loggedIn) {
      console.log(collegeId);
      try {
        if (likedCollege.includes(collegeId)) {
          alert("Already Liked");
        } else {
          await storeService
            .collection("colleges")
            .doc(collegeId)
            .update({ likes: likes + 1 });

          await storeService
            .collection("users")
            .doc(userId)
            .update({
              likedCollege: ArrayTool.arrayUnion(collegeId),
            });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      navigation.navigate("Join");
    }

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
      <h1>{college}</h1>
      <h3>{likes} Likes</h3>
      <Button title={"👍"} onPress={onCollegeLikeBtnClick}></Button>
    </View>
  );
};

export default CollegeBox;
