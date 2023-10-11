'use client'
import React from 'react'
import Menu from '@/components/matriz/Menu'
import Add from '@/components/matriz/Add'
import Objects from '@/components/matriz/Objects'
import { MatrizProvider } from '@/context/MatrizContext'
import Profile from '@/components/matriz/profile/Profile'
import Config from '@/components/matriz/Config'
import Head from 'next/head'
export default function Matriz() {
  return (
    <>
    <Head>
        <title>MATRIZ</title>
        <link rel="shortcut icon" href="/logos/logo.png" type="image/x-icon" />
    </Head>
    <div className='w-full h-screen bg-secondary'>
      <MatrizProvider>
        <>
          <Objects />
          <Menu />
          <Profile />
          <Add />
          <Config />
        </>
      </MatrizProvider>
    </div>
    </>
  )
}
