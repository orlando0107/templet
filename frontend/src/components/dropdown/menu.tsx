"use client";

import React from "react";
import { Dropdown } from "../common/client/dropdown";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export function Mymenu() {
	const { data: session, status } = useSession();

	if (status === "authenticated") {
		return (
			<Dropdown
				items={[
					{ label: "Inicio", href: "/" },
					{ label: "Dashboard", href: "/dashboard" },
					{
						label: "Logout",
						onClick: () => {
							if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
								signOut({
									redirect: true, // Redirige después de cerrar sesión
									callbackUrl: "/", // Página a la que redirigir después del cierre
								});
							}
						},
					},
				]}
				buttonLabel={
					<div className="flex items-center gap-2">
						<Image
							src={session.user?.image || "/default-avatar.png"}
							alt="Avatar"
							className="w-8 h-8 rounded-full"
							width={32}
							height={32}
						/>
					</div>
				}
			/>
		);
	}

	return null;
}
