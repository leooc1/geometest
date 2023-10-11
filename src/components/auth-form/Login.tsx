import Image from 'next/image'
import React, { useState } from 'react'
import AsideLogin from './AsideLogin'
import Link from 'next/link'

export default function Login() {
    const [corzinha, setCorzinha] = useState('#757575')
    const [verSenha, setVerSenha] = useState(false)
    async function ReqLogin(e:any){
        e.preventDefault()
        const body = {
            EMAIL: e.target.emailL.value,
            SENHA: e.target.passwordL.value
        }
        await fetch('/api/users/auth/login',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(body)
        })
        .then(response=>{
            if(response.status===200) setCorzinha("#00ff00")
            else if(response.status===404) setCorzinha("#ff0000")
            else setCorzinha("#757575")
            console.log(response.status)
            return response.json()
        })
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
    }
    return (
        <div className='flip-form ' id='login'>
            <AsideLogin mostrarSenha={verSenha}/>
            <section className='w-80 bg-secondary p-5'>
                <p className='text-3xl font-medium'>Entrar</p>
                <Link href='/'>
                    <Image className='float-right -mt-7' src={'/logos/logo.png'} alt='logo' width={70} height={70} />
                </Link>
                <form onSubmit={ReqLogin} className='flex flex-col w-full gap-5 mt-14' action="/api/users/auth/login" method="post">
                    <label className='font-semibold' htmlFor="emailL">
                        Email <br />
                        <input className='text-white bg-primary font-normal px-2 w-full' type="email" name="email" id="emailL" required />
                    </label>
                    <label className='font-semibold relative' htmlFor="passwordL">
                        <Image className='absolute bottom-[2px] right-1' src={verSenha?'/auth/close-eye.svg':'/auth/open-eye.svg'} alt='mostrar senha' height={20} width={20} 
                        onClick={()=>setVerSenha(!verSenha)}/>
                        Senha <br />
                        <input className='text-white bg-primary font-normal pl-2 pr-7 w-full' 
                        type={verSenha?"text":"password"} name="password" id="passwordL" required />
                    </label>
                    <button type="submit" className='border border-black bg-white py-1 font-bold mt-4'>LET’S GO!
                    </button>
                </form>
                <hr className='mb-5 mt-[21.05px] mx-2 invert' />
                <div className='flex justify-around'>
                    <button className={`w-10 h-10 rounded-full font-bold`} style={{backgroundColor: corzinha}}>G</button>
                    <button className={`w-10 h-10 rounded-full font-bold`} style={{backgroundColor: corzinha}}>G</button>
                    <button className={`w-10 h-10 rounded-full font-bold`} style={{backgroundColor: corzinha}}>G</button>
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
