'use client'
import Add from '@/components/matriz/Add'
import Config from '@/components/matriz/Config'
import Menu from '@/components/matriz/Menu'
import Objects from '@/components/matriz/Objects'
import Profile from '@/components/matriz/profile/Profile'
import { MatrizProvider } from '@/context/MatrizContext'
export default function Matriz() {
  
  return (
    <>

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
