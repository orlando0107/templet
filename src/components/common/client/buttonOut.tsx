"use client"
import { Button } from "@radix-ui/themes"
import { signIn } from "next-auth/react"

export function ButtonOut(){
    return <Button onClick={() => signIn()}>Cerrar</Button>
}