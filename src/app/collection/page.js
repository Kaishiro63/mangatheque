import ProtectedRoute from "../components/ProtectedRoute";

const Collection = () => {
    return (
        <ProtectedRoute>
            <h1 className="text-2xl font-bold">Ma Collection</h1>
            <p>Contenu à ajouter ici.</p>
        </ProtectedRoute>
    );
};

export default Collection;
