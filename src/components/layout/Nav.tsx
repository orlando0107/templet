'use client'
import { useSession } from 'next-auth/react';
import React from 'react'
import MyButtonClient from '../common/client/button';
import { Flex } from '@radix-ui/themes';
import { ButtonOut } from '../common/client/buttonOut';

export default function Nav() {
    const {data:session}= useSession();
    if(!session){
        return (
        <Flex gap={"4"} justify={"center"} align={"center"}>
            <MyButtonClient variant={"solid"} text={"Ingresar"} href={'/auth/login'}/>
            <MyButtonClient  variant={"ghost"} text={"Registrarse"} href={'/auth/register'}/>
        </Flex>)
    }
    return (<Flex gap={"4"} justify={"center"} align={"center"}>
        <ButtonOut />
    </Flex>)
}