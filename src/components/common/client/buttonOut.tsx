"use client"
import { Button } from "@radix-ui/themes"
import { signOut } from "next-auth/react"

export function ButtonOut(){
    return <Button onClick={() => signOut({ callbackUrl: "/" })}>Cerrar</Button>
}