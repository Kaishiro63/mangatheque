'use client'

import { useAuth } from "../../../utils/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) {
        return null; // Ne rien afficher pendant la redirection
    }

    return children; // Affiche les enfants si l'utilisateur est connecté
};

export default ProtectedRoute;
