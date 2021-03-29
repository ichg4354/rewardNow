import React, { useEffect } from "react";
import styled from "styled-components/native";
import { useIsFocused } from "@react-navigation/core";
import { disableBodyScroll } from "body-scroll-lock";
import { BODY } from "../tools";

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
  const isFocused = useIsFocused();
  useEffect(() => {
    disableBodyScroll(BODY);
  }, [isFocused]);
  return (
    <RewardContainer>
      <RewardHeader>Reward</RewardHeader>
    </RewardContainer>
  );
};

export default Reward;
