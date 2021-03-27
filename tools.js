export const collegeNames = [
  "문과대학",
  "법학대학",
  "정경대학",
  "경영대학",
  "호텔관광대학",
  "이과대학",
  "생활과학대학",
  "한의과대학",
  "치과대학",
  "약학대학",
  "간호과대학",
  "음악대학",
  "미술대학",
  "무용학부",
  "자율전공학부",
  "공과대학",
  "전자정보대학",
  "소프트웨어융합대학",
  "응용과학대학",
  "생명과학대학",
  "국제대학",
  "외국어대학",
  "예술디자인대학",
  "체육대학",
  "동서의과대학",
  "융합전공",
];
const addData = async (bool) => {
  if (bool) {
    names.forEach((each) =>
      storeService.collection("colleges").add({
        college: each,
        likedUser: [],
        likes: 0,
      })
    );
  }
};
