import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import BgMatriz from './BgMatriz'
import Link from 'next/link'

export default function Matriz() {
    return (
        <div id='matriz'
            className='relative w-full min-h-screen h-full flex md:flex-row flex-col justify-center items-center gap-10 lg:gap-44 sm:gap-10 py-10'>
            <Canvas style={{ position: 'absolute' }}>
                <BgMatriz />
            </Canvas>
            <section id='matriz-object' className='h-72 w-72'>
                <Canvas className='bg-white'>
                    <mesh>
                        <boxGeometry />
                        <meshStandardMaterial color={0x0000ff} wireframe/>
                    </mesh>
                    <ambientLight />
                    <OrbitControls />
                </Canvas>
            </section>
            <section id='matriz-description' className='md:w-96 w-full px-3 z-10'>
                <h2 className='font-medium text-3xl mb-5'><Link href='/matriz'>THREE</Link> - 3º DIMENSÃO</h2>
                <p className='text-lg'>Desvende os segredos da computação gráfica: mergulhe em um ambiente virtual que descomplica a relação entre matrizes e objetos 3D.<br />
                    Aqui aprende fazendo, em como números se tornam imagens e objetos de três ou mais dimensões. Algoritmos matemáticos pra quem quer entender e diversão para quem só quer descontrair aprendendo.</p>
            </section>
        </div>
    )
}
