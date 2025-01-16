import Link from 'next/link';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white fixed">
            <div className="p-4 text-center">
                <img
                    src="/default-avatar.png"
                    alt="Profile"
                    className="w-16 h-16 rounded-full mx-auto mb-2"
                />
                <p className="text-lg font-bold">Mon Profil</p>
                <Link href="/settings" className="text-sm text-gray-400">
                    Modifier
                </Link>
            </div>
            <nav className="mt-8">
                <ul>
                    <li className="p-4 hover:bg-gray-700">
                        <Link href="/">
                           Tableau de bord
                        </Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700">
                        <Link href="/collection">
                            Ma collection
                        </Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700">
                        <Link href="/favorites">
                            Favoris
                        </Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700">
                        <Link href="/settings">
                            Paramètres
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
