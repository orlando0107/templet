"use client";
import { Link } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

export default function Dashboard() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<p className="text-gray-600 text-lg animate-pulse">Cargando...</p>
			</div>
		);
	}

	if (status === "unauthenticated") {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="bg-white p-6 rounded-lg shadow-lg text-center">
					<h2 className="text-xl font-semibold text-red-600">Acceso denegado</h2>
					<Link href="auth/login" className="text-gray-700 mt-2">Debes iniciar sesión</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-lg text-center">
				<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
				<p className="text-gray-700 mt-2">Bienvenido, <span className="font-semibold">{session?.user?.name}</span></p>
			</div>
		</div>
	);
}
