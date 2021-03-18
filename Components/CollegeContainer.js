import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { storeService } from "../fBase";
import CollegeBox from "./CollegeBox";

const CollegeContainer = ({ userId, loggedIn }) => {
  const [colleges, setColleges] = useState([]);
  const [likedCollege, setLikedCollege] = useState([]);
  const isFocused = useIsFocused();

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

  const getUserData = async () => {
    if (loggedIn) {
      storeService
        .collection("users")
        .doc(userId)
        .onSnapshot((snap) => {
          setLikedCollege(snap.data().likedCollege);
        });
    }
  };

  useEffect(() => {
    getUserData();
    getData();
  }, [isFocused]);

  return colleges.map((each, key) => (
    <CollegeBox
      key={key}
      college={each.college}
      likes={each.likes}
      collegeId={each.id}
      userId={userId}
      loggedIn={loggedIn}
      likedCollege={likedCollege}
      setLikedCollege={setLikedCollege}
    />
  ));
};

export default CollegeContainer;
