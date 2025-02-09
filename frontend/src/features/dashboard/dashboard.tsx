"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return <p>Cargando...</p>;
	}

	if (status === "unauthenticated") {
		router.push("/auth/login");
		return null;
	}
	return (
		<div>
			<h1>Dashboard</h1>
			<p>Bienvenido, {session?.user?.name}</p>
		</div>
	);
}
