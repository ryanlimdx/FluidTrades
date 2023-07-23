import { createContext, useState } from "react";

export const UserAuthContext = createContext();

// wraps around entire app to provide user authentication context
export const UserAuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({});

  return (
    <UserAuthContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserAuthContext.Provider>
  );
};