import MainLayout from "./components/MainLayout";
import { AuthProvider } from "../../utils/AuthContext";
import './globals.css';

export const metadata = {
    title: "Mangathèque",
    description: "Une application pour gérer votre collection de mangas.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <MainLayout>
                        {children}
                    </MainLayout>
                </AuthProvider>
            </body>
        </html>
    );
}
