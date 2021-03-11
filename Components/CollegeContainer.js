import React, { useState } from "react";
import { storeService } from "../fBase";
import CollegeBox from "./CollegeBox";

const CollegeContainer = () => {
  const [colleges, setColleges] = useState([]);
  storeService
    .collection("colleges")
    .orderBy("likes", "desc")
    .onSnapshot((snap) => {
      let data = snap.docs.map((each) => each);
      setColleges(data);
    });
  return colleges.map((each, key) => (
    <CollegeBox
      key={key}
      college={each.data().college}
      likes={each.data().likes}
      id={each.id}
    />
  ));
};

export default CollegeContainer;
