import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AsideLogin from './AsideLogin'
import Link from 'next/link'
import utilsToken from '../utils/token'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Login() {
    const [verSenha, setVerSenha] = useState(false)
    const [verify, setVerify] = useState(1)
    const { data: session } = useSession()
    async function ReqLogin(e: any) {
        e.preventDefault()
        const body = {
            EMAIL: e.target.emailL.value,
            SENHA: e.target.passwordL.value
        }
        await fetch('/api/users/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then((response) => {
                if (response.status === 200) {
                    alert('Deu memo!')
                    return response.json()
                }
                else {
                    return false
                }
            })
            .then(async (data) => {
                if (data) {
                    await utilsToken.armazenarToken(data)
                    location.reload()
                }
            })
            .catch(err => console.log(err))
    }
    async function ReqCLogin() {
        const body = {
            EMAIL: session?.user?.email,
            SENHA: session?.user?.email
        }
        await fetch('/api/users/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then((response) => {
                if (response.status === 200) {
                    alert('Deu memo!')
                    return response.json()
                }
                else {
                    return false
                }
            })
            .then(async (data) => {
                if (data) {
                    await utilsToken.armazenarToken(data)
                    location.reload()
                }
            })
            .catch(err => console.log(err))
    }
    async function ReqCadastro() {
        const body = {
            NOME: session?.user?.name,
            EMAIL: session?.user?.email,
            SENHA: session?.user?.email,
            confirmaSENHA: session?.user?.email
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
                    else {
                        ReqCLogin()
                        return false
                    }
                })
                .then(async (data) => {
                    if (data) {
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
    useEffect(() => {
        if (verify === 1) {
            if (session?.user) {
                let continueAccount = confirm(`Deseja continuar como ${session?.user.name}?`)
                setVerify(verify + 1)
                if (!continueAccount) {
                    signOut()
                } else {
                    ReqCadastro()
                }
            }
        }
    }, [session, verify])
    return (
        <div className='flip-form ' id='login'>
            <AsideLogin mostrarSenha={verSenha} />
            <section className='w-80 bg-secondary p-5'>
                <h1 className='text-3xl font-medium'>Entrar</h1>
                <Link href='/'>
                    <Image className='float-right -mt-7' src={'/logos/logo.png'} alt='logo' width={70} height={70} />
                </Link>
                <form onSubmit={ReqLogin} className='flex flex-col w-full gap-5 mt-14' action="/api/users/auth/login" method="post">
                    <label className='font-semibold' htmlFor="emailL">
                        Email <br />
                        <input className='text-white bg-primary font-normal px-2 w-full' type="email" name="email" id="emailL" required />
                    </label>
                    <label className='font-semibold relative' htmlFor="passwordL">
                        <Image className='absolute bottom-[2px] right-1' src={verSenha ? '/auth/close-eye.svg' : '/auth/open-eye.svg'} alt='mostrar senha' height={20} width={20}
                            onClick={() => setVerSenha(!verSenha)} />
                        Senha <br />
                        <input className='text-white bg-primary font-normal pl-2 pr-7 w-full'
                            type={verSenha ? "text" : "password"} name="password" id="passwordL" required />
                    </label>
                    <button type="submit" className='border border-black bg-white py-1 font-bold mt-4'>LET’S GO!
                    </button>
                </form>
                <hr className='mb-5 mt-[21.05px] mx-2 invert' />
                <div className='flex justify-around'>
                    <button className={`h-9 flex items-center`} onClick={() => signIn()}>
                       Entrar com Google <Image width={36} height={36} src={'/logos/g.png'} alt='logo-google' />
                    </button>
                </div>
                <p className='text-primary mt-5 flex items-center'>Não possui conta?
                    <button onClick={() => {
                        document.getElementById('cadastro')?.classList.toggle('form-hidden')
                        document.getElementById('login')?.classList.toggle('form-hidden')
                    }} className='w-5 h-5 bg-primary rounded-full ml-4'>
                    </button>
                </p>
            </section>
        </div>
    )
}
