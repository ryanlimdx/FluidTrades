import { useState, useEffect } from "react";
import axios from "../api/axios";

const Profile = () => {
  const [name, setName] = useState("example");
  const [email, setEmail] = useState("example@gmail.com");

  // useEffect(() => {
  //   axios
  //     .get("/profile")
  //     .then((response) => setName(response.data.name))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <>
      <h1> Name: {name} </h1>
      <h1> Email: {email} </h1>
    </>
  );
};

export default Profile;
