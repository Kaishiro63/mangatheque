'use client';

import { useState } from "react";
import { useAuth } from "../../../utils/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import API from "../../../utils/axios";

const Profile = () => {
    const { user, logout } = useAuth();
    const [username, setUsername] = useState(user?.username || "");
    const [newPassword, setNewPassword] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setMessage("Le fichier doit être une image.");
                setProfileImage(null);
                return;
            }
            if (file.size > 5000000) { // 5MB
                setMessage("L'image est trop grande. Taille maximale : 5MB.");
                setProfileImage(null);
                return;
            }
            setProfileImage(file);
        }
    };

    // Frontend : dans le fichier Profile.js
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        if (profileImage) formData.append("profileImage", profileImage);

        // Affichez les données envoyées pour déboguer
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            await API.put("/auth/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${user.token}`, // Envoi du token sous la forme "Bearer <token>"
                },
            });

            setMessage("Profil mis à jour avec succès !");
        } catch (err) {
            console.error("Erreur lors de la mise à jour :", err.response ? err.response.data : err.message);
            setMessage("Une erreur est survenue lors de la mise à jour.");
        }
    };


    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            await API.put("/auth/password", { password: newPassword }, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            setMessage("Mot de passe modifié avec succès !");
        } catch (err) {
            console.error("Erreur lors de la modification :", err.response?.data?.message || err.message);
            setMessage(err.response?.data?.message || "Une erreur est survenue lors de la modification.");
        }
    };

    return (
        <ProtectedRoute>
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
                <h1 className="text-2xl font-bold mb-4">Mon Profil</h1>
                {message && (
                    <div className="mb-4 text-center p-2 bg-green-200 text-green-800 rounded">
                        {message}
                    </div>
                )}
                {loading && <p>Chargement...</p>}

                <form onSubmit={handleUpdateProfile}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Pseudo</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Photo de profil</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full p-2"
                            onChange={handleProfileImageChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Mettre à jour
                    </button>
                </form>

                <form onSubmit={handleUpdatePassword} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Nouveau mot de passe</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        Modifier le mot de passe
                    </button>
                </form>

                <button
                    onClick={handleLogout}
                    className="mt-6 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                    Se déconnecter
                </button>
            </div>
        </ProtectedRoute>
    );
};

export default Profile;
