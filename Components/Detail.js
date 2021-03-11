import React from "react";

const Detail = ({ route }) => {
  const collegeData = route.params;
  return <h1>{collegeData.college}</h1>;
};

export default Detail;
