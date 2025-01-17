'use client'

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Vérification du token et récupération des informations utilisateur à chaque chargement de la page
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Optionnel : récupérer les données utilisateur associées au token (via une API ou un autre moyen)
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            setUser({ token, ...userInfo }); // Sauvegarder l'utilisateur avec le token
        }
    }, []);

    // Fonction de login : enregistre le token et les informations utilisateur dans localStorage et met à jour l'état
    const login = (userData) => {
        localStorage.setItem("token", userData.token); // Enregistrer le token
        localStorage.setItem("userInfo", JSON.stringify(userData.user)); // Enregistrer les infos utilisateur
        setUser({ token: userData.token, ...userData.user }); // Mettre à jour l'état avec le token et les informations de l'utilisateur
    };

    // Fonction de logout : supprime le token et les informations utilisateur de localStorage et réinitialise l'état
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        setUser(null); // Réinitialiser l'utilisateur
    };

    const updateUser = (updatedUser) => {
        const currentUser = { ...user, ...updatedUser };
        localStorage.setItem("userInfo", JSON.stringify(currentUser));
        setUser(currentUser);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
