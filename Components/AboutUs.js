import React from "react";
import styled from "styled-components/native";

const AboutUsContainer = styled.View`
  padding: 30px;
`;

const AboutUsHeader = styled.Text`
  font-size: 35px;
  margin-bottom: 35px;
  font-weight: bold;
  color: black;
`;

const AboutUs = () => {
  return (
    <AboutUsContainer>
      <AboutUsHeader>About Us</AboutUsHeader>
    </AboutUsContainer>
  );
};

export default AboutUs;
