'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '../../../utils/axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Requête d'inscription
            const res = await API.post('/auth/register', { username, email, password });

            // Connexion automatique après l'inscription
            const loginRes = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', loginRes.data.token); // Stocker le token
            alert('Inscription réussie, vous êtes maintenant connecté.');
            router.push('/dashboard'); // Rediriger vers le tableau de bord
        } catch (err) {
            console.error('Erreur d\'inscription :', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.');
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <form
                className="bg-white p-6 rounded shadow-md"
                onSubmit={handleRegister}
            >
                <h2 className="text-2xl font-bold mb-4">Inscription</h2>
                {error && (
                    <div className="mb-4 text-red-500 bg-red-100 p-2 rounded">
                        {error}
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700">Pseudo</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Mot de passe</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="w-full bg-blue-600 text-white p-2 rounded">
                    S'inscrire
                </button>
            </form>
        </div>
    );
};

export default Register;
