import Image from 'next/image'
import React from 'react'

export default function AsideCadastro() {
  return (
    <section className='w-80 bg-primary p-5 relative hidden md:flex md:flex-col'>
    <h1 className='text-3xl font-bold pl-2 mb-5'>Cadastre-se</h1>
    <Image className='mx-auto' src={'/auth/baloon.svg'} alt='balão' width={300} height={300} />
    <hr className='invert my-5 mx-2' />
    <div className='flex justify-around'>
        <button className='w-10 h-10 rounded-full font-bold bg-secondary'>G</button>
        <button className='w-10 h-10 rounded-full font-bold bg-secondary'>G</button>
        <button className='w-10 h-10 rounded-full font-bold bg-secondary'>G</button>
    </div>
    <p className='text-secondary mt-5 flex items-center'>Já possui conta?
        <button onClick={()=>{
          document.getElementById('cadastro')?.classList.toggle('form-hidden')
          document.getElementById('login')?.classList.toggle('form-hidden')
        }} className='w-5 h-5 bg-secondary rounded-full ml-4'>
        </button>
    </p>
</section>
  )
}
