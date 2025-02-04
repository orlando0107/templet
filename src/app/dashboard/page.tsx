// src/pages/dashboard.tsx
import Footer from '@/components/layout/Foother';
import PrivateHeader from '@/components/layout/PrivateHeader';
import { useSession } from 'next-auth/react';

function DashboardPage() {
    const { data: session } = useSession();

    if (!session) {
        return <p>No tienes acceso a esta página.</p>;
    }

    return (
        <div>
            <PrivateHeader />
            <main className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p>Bienvenido, {session.user?.email}</p>
            </main>
            <Footer />
        </div>
    );
}

export default DashboardPage;