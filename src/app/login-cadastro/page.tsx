'use client'
import Cadastro from '@/components/auth-form/Cadastro'
import Login from '@/components/auth-form/Login'
import Head from 'next/head'
import React from 'react'

export default function LoginCadastro() {
  return (
    <>
   
    <div className='flex justify-center items-center relative w-full h-full min-h-screen bg-gray-300'>
        <div className='relative flex justify-center items-center w-full min-h-[515px]'>
          <Login/>
          <Cadastro/>
        </div>
    </div>
    </>
  )
}
