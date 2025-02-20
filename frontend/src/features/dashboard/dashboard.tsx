"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <p>Cargando...</p>;
	}

	if (status === "unauthenticated") {
		return <div className="">
			<p>debes ingresar</p>
		</div>;
	}
	return (
		<div>
			<h1>Dashboard</h1>
			<p>Bienvenido, {session?.user?.name}</p>
		</div>
	);
}
