import React, { useContext } from 'react'
import { MatrizContext } from '@/context/MatrizContext'

export default function Input() {
    const { render, index, setScale, setPosition, setRotation, scale, rotation, position } = useContext(MatrizContext)
    function changePosition() {
        let x = document.getElementById('px') as HTMLInputElement
        let y = document.getElementById('py') as HTMLInputElement
        let z = document.getElementById('pz') as HTMLInputElement
        setPosition([x?.value, y?.value, z?.value])
        render[index].position = [Number(x?.value), Number(y?.value), Number(z?.value)]
    }

    function changeRotation() {
        let x = document.getElementById('rx') as HTMLInputElement
        let y = document.getElementById('ry') as HTMLInputElement
        let z = document.getElementById('rz') as HTMLInputElement
        setRotation([x?.value, y?.value, z?.value])
        render[index].rotation = [Number(x?.value), Number(y?.value), Number(z?.value)]
    }

    function changeScale() {
        let x = document.getElementById('sx') as HTMLInputElement
        let y = document.getElementById('sy') as HTMLInputElement
        let z = document.getElementById('sz') as HTMLInputElement
        setScale([x?.value, y?.value, z?.value])
        render[index].scale = [Number(x?.value), Number(y?.value), Number(z?.value)]
    }

    return (
        <div className='bg-black md:w-80 w-64 py-2 rounded-2xl'>
            <section className='grid grid-cols-3 text-white mb-2'>
                <p className='text-center'>Escala</p>
                <p className='text-center'>Rotação</p>
                <p className='text-center'>Posição</p>
            </section>
            <section className='grid grid-cols-3'>
                <div id='scale' className='flex flex-col items-center gap-2'>
                    <input value={render.length > 0 ? scale[0] : ''} onChange={changeScale} className='w-16 rounded-3xl py-px px-1 text-center' type="text" min={1} placeholder='X' name="sx" id="sx" />
                    <input value={render.length > 0 ? scale[1] : ''} onChange={changeScale} className='w-16 rounded-3xl py-px px-1 text-center' type="text" min={1} placeholder='Y' name="sy" id="sy" />
                    <input value={render.length > 0 ? scale[2] : ''} onChange={changeScale} className='w-16 rounded-3xl py-px px-1 text-center' type="text" min={1} placeholder='Z' name="sz" id="sz" />
                </div>
                <div id='rotation' className='flex flex-col items-center gap-2'>
                    <input value={render.length > 0 ? rotation[0] : ''} onChange={changeRotation} className='w-16 rounded-3xl py-px px-1 text-center' type="text" placeholder='X' name="rx" id="rx" />
                    <input value={render.length > 0 ? rotation[1] : ''} onChange={changeRotation} className='w-16 rounded-3xl py-px px-1 text-center' type="text" placeholder='Y' name="ry" id="ry" />
                    <input value={render.length > 0 ? rotation[2] : ''} onChange={changeRotation} className='w-16 rounded-3xl py-px px-1 text-center' type="text" placeholder='Z' name="rz" id="rz" />
                </div>
                <div id='position' className='flex flex-col items-center gap-2'>
                    <input value={render.length > 0 ? position[0] : ''} onChange={changePosition} className='w-16 rounded-3xl py-px px-1 text-center' type="text" placeholder='X' name="px" id="px" />
                    <input value={render.length > 0 ? position[1] : ''} onChange={changePosition} className='w-16 rounded-3xl py-px px-1 text-center' type="text" placeholder='Y' name="py" id="py" />
                    <input value={render.length > 0 ? position[2] : ''} onChange={changePosition} className='w-16 rounded-3xl py-px px-1 text-center' type="text" placeholder='Z' name="pz" id="pz" />
                </div>
            </section>
        </div>
    )
}
