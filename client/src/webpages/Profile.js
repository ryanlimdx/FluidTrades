import { useState, useEffect } from "react";
import axios from "../api/axios";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("/profile")
      .then((response) => {
        console.log(response)
        setName(response.data.name)
        setEmail(response.data.email)})
      .catch((err) => console.log(err));
  }, [setName, setEmail]);

  return (
    <>
      <h1> Name: {name} </h1>
      <h1> Email: {email} </h1>
    </>
  );
};

export default Profile;
