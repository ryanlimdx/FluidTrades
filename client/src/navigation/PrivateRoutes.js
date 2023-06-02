import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserAuthContext from '../context/UserAuthContext';

const PrivateRoutes = () => {
    const { userAuth } = useContext(UserAuthContext);
    return (
        userAuth.accessToken ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;