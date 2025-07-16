import LayoutPrivate from '@/components/layout/layoutPrivate'
import Dashboard from '@/features/dashboard/dashboard'
import React from 'react'

export default function page() {
  return (
    <LayoutPrivate>
      <Dashboard/>
    </LayoutPrivate>
  )
}