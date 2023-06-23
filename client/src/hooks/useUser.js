import { useContext } from 'react';
import UserAuthContext from "../context/UserAuthProvider";

const useUser = () => {
    // const { userAuth } = useContext(UserAuthContext);

    return useContext(UserAuthContext);
}

export default useUser;