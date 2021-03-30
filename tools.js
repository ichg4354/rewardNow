import { storeService } from "./fBase";

export const collegeNames = [
  "간호과대학",
  "경영대학",
  "공과대학",
  "국제대학",
  "동서의과대학",
  "무용학부",
  "문과대학",
  "미술대학",
  "법학대학",
  "생명과학대학",
  "생활과학대학",
  "소프트웨어융합대학",
  "약학대학",
  "예술디자인대학",
  "외국어대학",
  "융합전공",
  "음악대학",
  "응용과학대학",
  "이과대학",
  "자율전공학부",
  "전자정보대학",
  "정경대학",
  "체육대학",
  "치과대학",
  "한의과대학",
  "호텔관광대학",
];
const addData = async (bool) => {
  if (bool) {
    collegeNames.forEach((each, key) =>
      storeService.collection("colleges").add({
        college: each,
        likedUser: [],
        likes: 0,
        order: key,
      })
    );
  }
};

export const bodyScrollToggler = (Navigation) => {
  console.log(Navigation?.state.routeName);
};

export const BODY = document.querySelector("body");
