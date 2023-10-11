import Image from 'next/image'
import React from 'react'

export default function AsideLogin({mostrarSenha}:{mostrarSenha:boolean}) {
  return (
    <section className='w-80 bg-primary p-5 relative hidden md:flex'>
                <Image className='w-full h-full scale-[1.152]' src={'/auth/bg-login.svg'} alt='imagem de fundo' width={100} height={100} />
                <div className={`w-full h-full absolute top-0 left-0 ${mostrarSenha ? '':'overflow-hidden' }`}>
                    <Image className={`w-full h-full animation absolute top-0 ${mostrarSenha ? 'view-active': 'left-[-220px]'}`} src={'/auth/view-pw.svg'} alt='ver senha' width={100} height={100} />
                </div>
            </section>
  )
}
