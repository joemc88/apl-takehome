import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [sessionToken, setSessionToken] = useState(null);

    const login = (token) => {
        setSessionToken(token);
    };

    const logout = () => {
        setSessionToken(null);
    };

    return (
        <AuthContext.Provider value={{ sessionToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
