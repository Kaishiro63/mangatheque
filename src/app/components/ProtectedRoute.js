'use client'

import { useAuth } from "../../../utils/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            // Redirige l'utilisateur vers la page de connexion s'il n'est pas authentifié
            router.push("/login");
        }
    }, [user, router]);

    if (!user) {
        // Ne rien afficher tant que la redirection n'est pas effectuée
        return null;
    }

    return children;
};

export default ProtectedRoute;
