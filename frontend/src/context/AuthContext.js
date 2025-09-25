        // // src/authContext.js
        // import React, { createContext, useState, useContext, useEffect } from "react";

        // const AuthContext = createContext();

        // export const AuthProvider = ({ children }) => {
        // const [user, setUser] = useState(null);

        // //  On mount, check if there's a saved JWT
        // useEffect(() => {
        //     const storedUser = localStorage.getItem("user");
        //     if (storedUser) {
        //     setUser(JSON.parse(storedUser));
        //     }
        // }, []);

        // const login = (userData) => {
        //     setUser(userData);
        //     localStorage.setItem("user", JSON.stringify(userData));
        // };

        // const logout = () => {
        //     setUser(null);
        //     localStorage.removeItem("user");
        // };

        // return (
        //     <AuthContext.Provider value={{ user, login, logout }}>
        //     {children}
        //     </AuthContext.Provider>
        // );
        // };

        // // Custom hook for easy usage
        // export const useAuth = () => useContext(AuthContext);

        // ReCode1
        import React, { createContext, useState, useEffect } from "react";

    export const AuthContext = createContext();

    const TOKEN_KEY = "fdw_jwt";

    export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
    const [user, setUser] = useState(null);        // optional: populate from backend later
    const [showAuth, setShowAuth] = useState(false);

    const login = (newToken, profile = null) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        setToken(newToken);
        if (profile) setUser(profile);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
    };

    // keep localStorage in sync if token changes elsewhere
    useEffect(() => {
        if (!token) localStorage.removeItem(TOKEN_KEY);
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, user, login, logout, showAuth, setShowAuth }}>
        {children}
        </AuthContext.Provider>
    );
    };
