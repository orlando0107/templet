"use client";

import React from "react";
import { Dropdown } from "../common/client/dropdown";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Myavatar from "../common/servidor/avatar";

export function Mymenu() {
	const { data: session, status } = useSession();

	if (status === "authenticated") {
		return (
			<Dropdown
				items={[
					{ label: "Inicio", href: "/" },
					{ label: "Mi Perfil", href: "/dashboard" },
					{
						label: "Salir",
						onClick: () => {
							if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
								signOut({
									redirect: true,
									callbackUrl: "/",
								});
							}
						},
					},
				]}
				buttonLabel={
					<div className="flex items-center gap-2">
						<Myavatar alt="avatar" nosrc={session.user.name} src={session.user.image}/>
					</div>
				}
			/>
		);
	}

	return null;
}
