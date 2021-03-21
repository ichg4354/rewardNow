import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";
import { ArrayTool, authService, storeService } from "../fBase";
import styled from "styled-components/native";

const CollegeBoxContainer = styled.View`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 15px 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`;

const Title = styled.Text`
  font-size: 30px;
  margin-bottom: 5px;
`;

const Likes = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
`;

const LikeButton = styled.TouchableOpacity`
  align-items: center;
  background-color: lightblue;
  padding: 10px;
  border-radius: 10px;
  opacity: 15px;
`;

const CollegeBox = ({
  college,
  likes,
  comments,
  collegeId,
  userId,
  loggedIn,
  likedCollege,
  setLikedEvent,
}) => {
  const navigation = useNavigation();

  //Disabled
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
          alert("좋아요 취소");
          //1. 대학db에 좋아요 -1
          await storeService
            .collection("colleges")
            .doc(collegeId)
            .update({ likes: likes - 1 });
          //2. user db에서 대학 id 빼기
          await storeService
            .collection("users")
            .doc(userId)
            .update({
              likedCollege: ArrayTool.arrayRemove(collegeId),
            });
          //3.대학 db에 내 id 빼기 (부차적)
          await storeService
            .collection("colleges")
            .doc(collegeId)
            .update({
              likedUser: ArrayTool.arrayRemove(userId),
            });
        } else {
          alert("좋아요 완료!");
          //1. 대학db에 좋아요 + 1
          await storeService
            .collection("colleges")
            .doc(collegeId)
            .update({ likes: likes + 1 });
          //2. user db에 대학id 넣기
          await storeService
            .collection("users")
            .doc(userId)
            .update({
              likedCollege: ArrayTool.arrayUnion(collegeId),
            });
          //3. 대학 db에 내 id 넣기 (부차적)
          await storeService
            .collection("colleges")
            .doc(collegeId)
            .update({
              likedUser: ArrayTool.arrayUnion(userId),
            });
        }
        setLikedEvent(["blah"]);
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
    <CollegeBoxContainer>
      <Title>{college}</Title>
      <Likes>{likes} Likes</Likes>
      <LikeButton onPress={onCollegeLikeBtnClick} color={"#1E90FF"}>
        👍
      </LikeButton>
    </CollegeBoxContainer>
  );
};

export default CollegeBox;
