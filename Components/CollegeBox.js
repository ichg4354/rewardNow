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
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: rgba(31, 38, 135, 0.37) 0 8px 32px;
  border: 1px solid rgba(255, 255, 255, 0.18);
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
  opacity: 15;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`;

const Likeicon = styled.Text`
  font-size: 23px;
  font-weight: bold;
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
      const userValue = await (
        await storeService.collection("users").doc(userId).get()
      ).data().college;
      if (userValue === college) {
        // console.log(college);
        // console.log(userValue);
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
            alert(
              "좋아요 완료! (화면 캡쳐 후 인스타 스토리에 #경희대학교, #Push&Get 태그해서 올리면 선착순 30명 기프티콘!)"
            );
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
        alert("회원가입 시 설정한 단과대가 아니에요ㅠ");
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
        <Likeicon>👍</Likeicon>
      </LikeButton>
    </CollegeBoxContainer>
  );
};

export default CollegeBox;
