import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const PrivateRoutes = ({ children }) => {
  const user = useUser();

  if (!user.userAuth?.accessToken) {
    return <Navigate to="/login" />
  }

  return children;
};

export default PrivateRoutes;