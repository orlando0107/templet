
import { ResetPasswordForm } from '@/components/forms/reset-password';
import LayoutPublic from '@/components/layout/layout';
import React from 'react';

export default async function page(
  {
    params
  }:{
    params: Promise<{token:string}>
  }
) {
  const token =(await params).token
  return (
    <LayoutPublic>
      <ResetPasswordForm token= {token}/>
    </LayoutPublic>
  );
}
