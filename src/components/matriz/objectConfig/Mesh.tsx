import React, { useContext } from 'react'
import { MatrizContext } from '@/context/MatrizContext'

export default function Mesh() {
    const { render, color, index, wireframe, setColor, setWireFrame } = useContext(MatrizContext)
    return (
        <div className='bg-black md:w-80 w-64 py-2 min-h-[142px] rounded-2xl flex flex-col justify-around items-center'>

            <label htmlFor="wireframe" className='text-white flex justify-center items-center w-fit'>
                WIREFRAME:
                <input type="checkbox" name="wireframe" id="wireframe" checked={render.length > 0 ? wireframe : false} className='ml-2 w-4 h-4 cursor-pointer' onChange={(e) => {
                    setWireFrame(e.target.checked)
                    render[index].wireframe = e.target.checked
                }} />
            </label>
            <label htmlFor="color" className='text-white flex justify-center items-center w-fit'>
                COR:
                <input value={render.length > 0 ? color : '#ffffff'} type="color" name="color" id="color" className='input-color ml-2' onChange={(e) => {
                    setColor(e.target.value)
                    render[index].color = e.target.value
                }} />
            </label>
        </div>
    )
}
