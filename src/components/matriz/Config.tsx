import React, { useContext } from 'react'
import { MatrizContext } from '@/context/MatrizContext'

export default function Config() {
    const { activate, bgColor, setBgColor } = useContext(MatrizContext)
    return (
        <div className={`${activate === 'config' ? 'container-menu' : 'hidden'}`}>
            <section className='flex justify-center items-center w-full h-full'>
                <input type="color" className='w-20 h-20' value={bgColor} onChange={(e)=>{setBgColor(e.target.value)}}/>
            </section>
        </div>
    )
}
