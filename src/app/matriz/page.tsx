'use client'
import Add from '@/components/matriz/Add'
import Config from '@/components/matriz/Config'
import Menu from '@/components/matriz/Menu'
import Objects from '@/components/matriz/Objects'
import Profile from '@/components/matriz/profile/Profile'
import utilsToken from '@/components/utils/token'
import { MatrizProvider } from '@/context/MatrizContext'
import { useEffect, useState } from 'react'
export default function Matriz() {
  const [id, setID] = useState('')
  const [logado, setLogado] = useState(true)
  useEffect(()=>{
    if(!logado){
      location.assign('/login-cadastro') 
    }
  },[logado])
    const getID = async () => {
      const trem = await utilsToken.getToken()
      if(trem) setLogado(true)
      else setLogado(false)
      setID(trem)
    }
    getID()
  return (
    <>
      
      <div className='w-full h-screen bg-secondary'>
        <MatrizProvider>
          <>
            <Objects />
            <Menu />
            <Profile id={id} />
            <Add />
            <Config />
          </>
        </MatrizProvider>
      </div>
    </>
  )
}
