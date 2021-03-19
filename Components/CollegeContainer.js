import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { storeService } from "../fBase";
import CollegeBox from "./CollegeBox";

const CollegeContainer = ({ userId, loggedIn, searchQuery }) => {
  const [colleges, setColleges] = useState([]);
  const [likedCollege, setLikedCollege] = useState([]);
  const isFocused = useIsFocused();

  const getData = async () => {
    if (searchQuery === "") {
      storeService
        .collection("colleges")
        .orderBy("likes", "desc")
        .onSnapshot((snap) => {
          console.log("THIS IS FROM EMPTY");
          let collegeList = snap.docs.map((each) => ({
            college: each.data().college,
            likes: each.data().likes,
            id: each.id,
          }));
          setColleges(collegeList);
        });
      console.log("empty");
    } else {
      let collegeList = [];
      const data = await storeService
        .collection("colleges")
        .where("college", "==", searchQuery)
        .get();
      data.forEach((each) =>
        collegeList.push({
          college: each.data().college,
          likes: each.data().likes,
          id: each.id,
        })
      );
      setColleges(collegeList);
    }
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
  }, [isFocused, searchQuery]);

  return colleges ? (
    colleges?.map((each, key) => (
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
    ))
  ) : (
    <h1>DONT EXIST</h1>
  );
};

export default CollegeContainer;
