import React from "react";

const Detail = ({ user }) => {
  console.log(user);
  return <h1>{user.email.slice(0, 10)}</h1>;
};

export default Detail;
