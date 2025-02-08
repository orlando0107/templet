import { RegisterForm } from '@/components/forms/register'
import { AuthImage } from '@/components/layout/imageauth'
import LayoutPublic from '@/components/layout/layout'
import React from 'react'

export default function page() {
  return (
    <LayoutPublic>
      <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="lg:flex-1 hidden lg:flex items-center justify-center">
          <AuthImage src='/images/auth.webp' alt={''} />
        </div>
        <div className="lg:flex-1 p-8 sm:p-12 flex flex-col items-center justify-center">
          <RegisterForm />
        </div>
      </div>
    </LayoutPublic>
  )
}