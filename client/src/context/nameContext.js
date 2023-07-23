import { createContext, useState } from "react";
 
export const ProfileContext = createContext({});
 
const ProfileProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const profDetails = {
    name: [name, setName],
    email: [email, setEmail]
  }

  return (
    <ProfileContext.Provider value={profDetails}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;