import ProtectedRoute from "../components/ProtectedRoute";

const Favorites = () => {
    return (
        <ProtectedRoute>
            <h1 className="text-2xl font-bold">Mes favoris</h1>
            <p>Contenu à ajouter ici.</p>
        </ProtectedRoute>
    );
};

export default Favorites;
