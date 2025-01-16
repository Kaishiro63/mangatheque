
import ProtectedRoute from "../components/ProtectedRoute";

const Settings = () => {
    return (
        <ProtectedRoute>
            <h1 className="text-2xl font-bold">Paramètres</h1>
            <p>Contenu à ajouter ici.</p>
        </ProtectedRoute>
    );
};

export default Settings;
