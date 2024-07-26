import React from "react";
import { useSelector } from "react-redux";

const Content = () => {
  const user = useSelector((state) => state.user.user);
  

  if(!user){
    return <h2>No user information</h2>
  }
  return (
    <div>
      <h2>User information</h2>
      <h4>{user.email}</h4>
    </div>
  );
};

export default Content;
