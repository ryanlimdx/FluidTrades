import { useContext, useDebugValue } from "react";
import { UserAuthContext } from "../context/UserAuthProvider";

const useUser = () => {
  const { userAuth } = useContext(UserAuthContext);
  // useDebugValue(userAuth, (userAuth) =>
  //   userAuth?.accessToken ? "Logged In" : "Logged Out"
  // );
  return useContext(UserAuthContext);
};

export default useUser;
