import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

const PrivateRoutes = ({ children }) => {
  const userAuth = useUser();

  if (!userAuth?.accessToken) {
    return <Navigate to="/login" />
  }

  return children;
};

export default PrivateRoutes;