'use client'

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // null = pas connecté

    const login = (userData) => setUser(userData); // Appelle cette fonction après une connexion réussie
    const logout = () => setUser(null); // Appelle cette fonction pour déconnecter

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
