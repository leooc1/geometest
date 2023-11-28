import Image from 'next/image'
import React from 'react'
import AsideCadastro from './AsideCadastro'
import Link from 'next/link'
import utilsToken from '../utils/token'
// import utilsToken from '../utils/token'

export default function Cadastro() {
    async function ReqCadastro(e: any) {
        e.preventDefault()
        const body = {
            NOME: e.target.name.value,
            EMAIL: e.target.emailC.value,
            SENHA: e.target.passwordC.value,
            confirmaSENHA: e.target.pwcompareC.value
        }
        if (body.SENHA === body.confirmaSENHA) {
            await fetch('/api/users/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then(async (response) => {
                    if (response.status === 200) {
                        alert('Deu memo!')
                        return response.json()
                    }
                    else{
                        alert('Deu não!')
                        return false
                    }
                })
                .then(async (data)=>{
                    if(data){
                        await utilsToken.armazenarToken(data)
                        location.reload()
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            console.log("Senhas divergentes!")
        }
    }
    return (
        <div className='flip-form form-hidden' id='cadastro'>
            <section className='w-80 bg-secondary p-5'>
                <Link href='/'>
                    <Image className='mx-auto' src={'/logos/logo-ex.png'} alt='logo' width={250} height={100} />
                </Link>
                <form onSubmit={ReqCadastro} className='flex flex-col w-full gap-2 mt-6' action="/api/users/auth/register" method="post">
                    <label className='font-semibold' htmlFor="name">
                        Nome ou apelido <br />
                        <input className='text-white bg-primary font-normal px-2 w-full' type="text" name="name" id="name" required />
                    </label>
                    <label className='font-semibold' htmlFor="emailC">
                        Email <br />
                        <input className='text-white bg-primary font-normal px-2 w-full' type="email" name="email" id="emailC" required />
                    </label>
                    <label className='font-semibold' htmlFor="passwordC">
                        Senha <br />
                        <input className='text-white bg-primary font-normal px-2 w-full' type="password" name="password" id="passwordC" required />
                    </label>
                    <label className='font-semibold' htmlFor="pwcompareC">
                        Repita a senha <br />
                        <input className='text-white bg-primary font-normal px-2 w-full' type="password" name="pwcompare" id="pwcompareC" required />
                    </label>
                    <button type="submit" className='border border-black bg-white py-1 font-bold mt-4'>LET’S GO!</button>
                </form>
                <hr className='invert my-5 mx-2' />
                <div className='flex flex-col md:hidden'>
                    <p className='text-primary mt-5 flex items-center'>Já possui conta?
                        <button onClick={() => {
                            document.getElementById('cadastro')?.classList.toggle('form-hidden')
                            document.getElementById('login')?.classList.toggle('form-hidden')
                        }} className='w-5 h-5 bg-primary rounded-full ml-4'>
                        </button>
                    </p>
                </div>
            </section>
            <AsideCadastro />
        </div>
    )
}
