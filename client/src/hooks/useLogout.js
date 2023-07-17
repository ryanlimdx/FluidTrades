import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import useUser from "./useUser";

const useLogout = () => {
  const { setUserAuth } = useUser();
  const navigate = useNavigate();

  const logout = async () => {
    setUserAuth({});
    navigate("/login");
  }

  return logout;
}

export default useLogout;