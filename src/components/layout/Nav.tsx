'use client'

import { useSession } from 'next-auth/react';
import React from 'react'
import MyButtonClient from '../common/client/button';
import { Flex, Skeleton } from '@radix-ui/themes';
import { ButtonOut } from '../common/client/buttonOut';

export default function Nav() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <Flex gap={"4"} justify={"center"} align={"center"}>
                <Skeleton>Loading</Skeleton>
            </Flex>
        );
    }

    if (status === 'authenticated') {
        return (
            <Flex gap={"4"} justify={"center"} align={"center"}>
                <ButtonOut />
            </Flex>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <Flex gap={"4"} justify={"center"} align={"center"}>
                <MyButtonClient variant={"solid"} text={"Ingresar"} href={'/auth/login'} />
                <MyButtonClient variant={"ghost"} text={"Registrarse"} href={'/auth/register'} />
            </Flex>
        );
    }

    // Manejo del estado de error (si es necesario)
    return (
        <Flex gap={"4"} justify={"center"} align={"center"}>
            Error al cargar la sesión.
        </Flex>
    );
}
