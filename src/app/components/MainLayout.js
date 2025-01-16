import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 w-full p-4 bg-gray-100 min-h-screen">{children}</div>
        </div>
    );
};

export default MainLayout;
