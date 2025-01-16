// src/app/page.js
"use client";

import { useEffect, useState } from "react";
import API from "../../utils/axios";
import ProtectedRoute from "./components/ProtectedRoute";

const Dashboard = () => {
    const [mangas, setMangas] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMangas = async () => {
        setIsLoading(true);
        try {
            const res = await API.get(`https://api.jikan.moe/v4/top/manga?page=${page}`);
            setMangas((prev) => [...prev, ...res.data.data]);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        fetchMangas();
    }, [page]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <ProtectedRoute>
            <h1 className="text-2xl font-bold mb-4">Mangas populaires</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mangas.map((manga) => (
                    <div
                        key={manga.mal_id}
                        className="bg-white p-4 rounded shadow-md hover:shadow-lg transition"
                    >
                        <img
                            src={manga.images.jpg.image_url}
                            alt={manga.title}
                            className="w-full h-48 object-cover rounded"
                        />
                        <h2 className="text-lg font-bold mt-2">{manga.title}</h2>
                        <p className="text-sm text-gray-600">
                            Auteur : {manga.authors[0]?.name || "Inconnu"}
                        </p>
                        <p className="text-sm text-gray-600">Note : {manga.score || "N/A"}</p>
                        <div className="flex flex-wrap mt-2">
                            {manga.genres.map((genre) => (
                                <span
                                    key={genre.mal_id}
                                    className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded mr-2"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <button
                            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            onClick={() => alert(`Ajouté à la collection : ${manga.title}`)}
                        >
                            Ajouter à ma collection
                        </button>
                    </div>
                ))}
            </div>
            {isLoading && <p className="text-center mt-4">Chargement...</p>}
        </ProtectedRoute>
    );
};

export default Dashboard;
