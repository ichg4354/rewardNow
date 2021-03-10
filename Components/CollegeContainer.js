import React, { useState } from "react";
import { storeService } from "../fBase";
import CollegeBox from "./CollegeBox";

const getCollegeData = () => {
  const collegeList = storeService
    .collection("colleges")
    .orderBy("likes", "desc")
    .onSnapshot((doc) => doc.map((each) => collegeList.push(each.data())));
  return collegeList;
};

const CollegeContainer = () => {
  const [colleges, setColleges] = useState([]);
  const collegeList = storeService
    .collection("colleges")
    .orderBy("likes", "desc")
    .onSnapshot((snap) => {
      let data = snap.docs.map((each) => each.data());
      setColleges(data);
    });
  return colleges.map((each) => (
    <CollegeBox key={each.id} college={each.college} likes={each.likes} />
  ));
};

export default CollegeContainer;
