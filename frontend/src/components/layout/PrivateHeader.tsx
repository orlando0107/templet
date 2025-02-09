"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Flex, Link, Skeleton } from "@radix-ui/themes";
import { Mymenu } from "@/components/dropdown/menu";

export default function PrivateHeader() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { data: session, status } = useSession();
	if (status === "loading") {
		return <Skeleton>Loading</Skeleton>;
	}
	if (status === "authenticated") {
		return (
			<Flex
				justify="between"
				align="center"
				p="4"
				style={{ borderBottom: "0.5px solid var(--gray-a5)" }}
			>
				<Link
					href="/"
					size="4"
					weight="bold"
					style={{ textDecoration: "none" }}
				>
					Mi App
				</Link>
				<Mymenu />
			</Flex>
		);
	}
	return null;
}
