import React, { useContext, useState } from 'react'
import Image from 'next/image'
import Input from './objectConfig/Input'
import { MatrizContext } from '@/context/MatrizContext'
import ListItens from './ListItens'
import Mesh from './objectConfig/Mesh'
import Upload from './objectConfig/Upload'

export default function Add() {
    const { activate, render, setRender, setPosition, setRotation, setScale, setColor, setWireFrame, setIndex } = useContext(MatrizContext)
    const [active, setActive] = useState(0)
    function addObject(type: string) {
        setRender([...render,
        {
            "id": render.length,
            "type": type,
            "position": [
                0,
                0,
                0
            ],
            "rotation": [
                0,
                0,
                0
            ],
            "scale": [
                1,
                1,
                1
            ],
            "wireframe": false,
            "color": "#ffffff"
        }
        ])
        setIndex(render.length)
        setPosition([0, 0, 0])
        setRotation([0, 0, 0])
        setScale([1, 1, 1])
        setColor('#ffffff')
        setWireFrame(false)
    }

    return (
        <section className={` ${activate === 'add' ? 'container-menu' : 'hidden'} `}>
            <div className='w-full flex flex-col gap-4 scroll-add'>
                <p className='text-3xl'>Adicionar forma</p>
                <hr className='invert' />
                <ul className='flex gap-3'>
                    <li>
                        <Image onClick={() => addObject('TetrahedronGeometry')} title='tetraedro' src='/nav/cube.svg' width={30} height={30} alt='tetraedro' />
                    </li>
                    <li>
                        <Image onClick={() => addObject('BoxGeometry')} title='cubo' src='/nav/cube.svg' width={30} height={30} alt='cubo' />
                    </li>
                    <li>
                        <Image onClick={() => addObject('IcosahedronGeometry')} title='icosaedro' src='/nav/cube.svg' width={30} height={30} alt='icosaedro' />
                    </li>
                    <li>
                        <Image onClick={() => addObject('OctahedronGeometry')} title='octaedro' src='/nav/cube.svg' width={30} height={30} alt='octaedro' />
                    </li>
                    <li>
                        <Image onClick={() => addObject('DodecahedronGeometry')} title='dodecaedro' src='/nav/cube.svg' width={30} height={30} alt='dodecaedro' />
                    </li>
                </ul>
                    <section className='-mb-10 flex gap-4'>
                        <button onClick={() => setActive(0)} className={`${active === 0 ? 'bg-black' : 'bg-primary'} h-14 w-12 pt-1 text-white rounded-t-2xl flex justify-center`}>
                            <Image className={`brightness-0 ${active === 0 ? 'invert' : ''}`} src='/matriz/geometry.svg' alt='geometry' width={25} height={25} />
                        </button>
                        <button onClick={() => setActive(1)} className={`${active === 1 ? 'bg-black' : 'bg-primary'} h-14 w-12 pt-1 text-white rounded-t-2xl flex justify-center`}>
                            <Image className={`brightness-0 ${active === 1 ? 'invert' : ''}`} src='/matriz/mesh.svg' alt='geometry' width={25} height={25} />
                        </button>
                        <button onClick={() => setActive(2)} className={`${active === 2 ? 'bg-black' : 'bg-primary'} h-14 w-12 pt-1 text-white rounded-t-2xl flex justify-center`}>
                            <Image className={`brightness-0 ${active === 2 ? 'invert' : ''}`} src='/matriz/import.svg' alt='geometry' width={25} height={25} />
                        </button>
                        <button className={`${active === 3 ? 'bg-black' : 'bg-primary'} h-14 w-12 pt-1 text-white rounded-t-2xl flex justify-center`}></button>
                    </section>
                    {active === 0 ? <Input /> : null}
                    {active === 1 ? <Mesh /> : null}
                    {active === 2 ? <Upload /> : null}
                    <ListItens />
            </div>
        </section>
    )
}
