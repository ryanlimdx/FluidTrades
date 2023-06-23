import { createContext, useState } from 'react';

const UserAuthContext = createContext({});

// wraps around entire app to provide user authentication context
export const UserAuthProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState({});

    return ( 
        <UserAuthContext.Provider value={{ userAuth, setUserAuth }}>
            {children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthContext;