    // src/authContext.js
    import React, { createContext, useContext, useState, useEffect } from "react";

    const AuthContext = createContext();

    export function AuthProvider({ children }) {
    // 🧠 Global state for authentication
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [showAuth, setShowAuth] = useState(false); // ✅ This controls your modal visibility globally

    // ✅ Called when user successfully logs in
    const login = (jwtToken, userData) => {
        setToken(jwtToken);
        setUser(userData);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setShowAuth(false); // close modal automatically
    };

    // ✅ Called when user logs out
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    // ✅ Restore session on page refresh
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <AuthContext.Provider
        value={{
            user,
            token,
            login,
            logout,
            showAuth,
            setShowAuth, // 👈 critical: now all components can call this
        }}
        >
        {children}
        </AuthContext.Provider>
    );
    }

    // ✅ Custom hook for consuming the context easily
    export const useAuth = () => useContext(AuthContext);
