import React, { useEffect, useState } from "react";
import { storeService } from "../fBase";
import CollegeBox from "./CollegeBox";

const CollegeContainer = ({ userId, loggedIn }) => {
  const [colleges, setColleges] = useState([]);

  const getData = () => {
    storeService
      .collection("colleges")
      .orderBy("likes", "desc")
      .onSnapshot((snap) => {
        let data = snap.docs.map((each) => ({
          college: each.data().college,
          likes: each.data().likes,
          id: each.id,
        }));
        setColleges(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return colleges.map((each, key) => (
    <CollegeBox
      key={key}
      college={each.college}
      likes={each.likes}
      id={each.id}
      userId={userId}
      loggedIn={loggedIn}
    />
  ));
};

export default CollegeContainer;
