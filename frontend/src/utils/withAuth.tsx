// src/utils/withAuth.tsx
'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ComponentType } from 'react';

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
    const AuthenticatedComponent = (props: P) => {
        const { status } = useSession();
        const router = useRouter();

        useEffect(() => {
            if (status === 'unauthenticated') {
                router.push('/auth/login');
            }
        }, [status, router]);

        return <Component {...props} />;
    };

    AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;

    return AuthenticatedComponent;
};  
