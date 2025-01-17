'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../utils/AuthContext';  // Importer le hook useAuth
import API from '../../../utils/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();  // Utiliser useAuth pour récupérer la fonction login
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', { email, password });
            // Appeler la fonction login de AuthContext pour stocker l'utilisateur et le token
            login({ token: res.data.token, user: res.data.user }); // Passer également les informations de l'utilisateur
            router.push('/'); // Redirection après connexion
        } catch (err) {
            console.error('Erreur de connexion :', err.message);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <form
                className="bg-white p-6 rounded shadow-md"
                onSubmit={handleLogin}
            >
                <h2 className="text-2xl font-bold mb-4">Connexion</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Mot de passe</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="w-full bg-blue-600 text-white p-2 rounded">
                    Se connecter
                </button>
            </form>
        </div>
    );
};

export default Login;
