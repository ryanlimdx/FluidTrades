import { useContext, useDebugValue } from "react";
import { UserAuthContext } from "../context/UserAuthProvider";

const useUser = () => {
  return useContext(UserAuthContext);
};

export default useUser;
