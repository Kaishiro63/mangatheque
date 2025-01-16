import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProtectedRoute from "../components/ProtectedRoute";

const MangaDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [manga, setManga] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`https://api.jikan.moe/v4/manga/${id}`)
                .then((res) => res.json())
                .then((data) => setManga(data.data))
                .catch((err) => console.error(err));
        }
    }, [id]);

    if (!manga) return <p>Chargement...</p>;

    return (
        <ProtectedRoute>
            <div className="flex flex-col lg:flex-row gap-6">
                <img
                    src={manga.images.jpg.image_url}
                    alt={manga.title}
                    className="w-full lg:w-1/3 object-cover rounded"
                />
                <div>
                    <h1 className="text-3xl font-bold">{manga.title}</h1>
                    <p className="mt-2 text-gray-600">{manga.synopsis}</p>
                    <p className="mt-4">
                        <strong>Auteur :</strong> {manga.authors[0]?.name || 'Inconnu'}
                    </p>
                    <p>
                        <strong>Éditeur :</strong> {manga.serializations[0]?.name || 'Inconnu'}
                    </p>
                    <p>
                        <strong>Volumes :</strong> {manga.volumes || 'Inconnu'}
                    </p>
                    <p>
                        <strong>Chapitres :</strong> {manga.chapters || 'Inconnu'}
                    </p>
                    <p>
                        <strong>Genres :</strong>{' '}
                        {manga.genres.map((genre) => genre.name).join(', ')}
                    </p>
                    <button
                        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        onClick={() => alert(`Ajouté aux favoris : ${manga.title}`)}
                    >
                        Ajouter aux favoris
                    </button>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default MangaDetails;
