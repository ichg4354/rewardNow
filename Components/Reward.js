import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import styled from "styled-components/native";
import { storeService } from "../fBase";

const RewardContainer = styled.View`
  padding: 30px;
`;

const RewardHeader = styled.Text`
  font-size: 35px;
  margin-bottom: 35px;
  font-weight: bold;
  color: black;
`;

const RewardRankContainer = styled.View`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 15px 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: rgba(31, 38, 135, 0.37) 0 8px 32px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const RewardRankItem = styled.View``;

const RewardRankItemText = styled.Text`
  font-size: 20px;
  color: gray;
`;

const RewardImage = styled.View`
  margin-top: 30px;
  border-radius: 30px;
`;

const Reward = () => {
  const [collegeRank, setCollegeRank] = useState([]);

  const isFocusedRewardPage = useIsFocused();

  const getData = async () => {
    let topThreeCollegeList = [];
    let data;

    data = await storeService
      .collection("colleges")
      .orderBy("likes", "desc")
      .limit(3)
      .get();

    data.forEach((each) =>
      topThreeCollegeList.push({
        college: each.data().college,
        likes: each.data().likes,
        id: each.id,
      })
    );
    setCollegeRank(topThreeCollegeList);
  };

  useEffect(() => {
    getData();
  }, [isFocusedRewardPage]);

  return (
    <RewardContainer>
      <RewardHeader>
        Reward
        <img
          src="https://i.ibb.co/8sBg7qn/removebg-preview.png"
          style={{
            marginLeft: "10px",
            borderRadius: "15px",
            width: "30px",
            height: "30px",
            position: "relative",
            top: "5px",
          }}
        />
      </RewardHeader>

      <RewardRankContainer>
        <RewardRankItem>
          <RewardRankItemText>
            1️⃣&#9; {collegeRank[0]?.college} 👍 {collegeRank[0]?.likes} &#9; 🎉
          </RewardRankItemText>
          <RewardRankItemText>
            2️⃣&#9; {collegeRank[1]?.college} 👍 {collegeRank[1]?.likes}
          </RewardRankItemText>
          <RewardRankItemText>
            3️⃣&#9; {collegeRank[2]?.college} 👍 {collegeRank[2]?.likes}
          </RewardRankItemText>
        </RewardRankItem>
      </RewardRankContainer>
      <RewardImage>
        <img
          src="https://i.ibb.co/47q25g9/1.png"
          style={{ borderRadius: "15px" }}
        />
      </RewardImage>
    </RewardContainer>
  );
};

export default Reward;
