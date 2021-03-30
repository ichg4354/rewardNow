import React, { useEffect } from "react";
import styled from "styled-components/native";

const RewardContainer = styled.View`
  padding: 30px;
`;

const RewardHeader = styled.Text`
  font-size: 35px;
  margin-bottom: 35px;
  font-weight: bold;
  color: black;
`;

const Reward = () => {
  return (
    <RewardContainer>
      <RewardHeader>Reward</RewardHeader>
    </RewardContainer>
  );
};

export default Reward;
