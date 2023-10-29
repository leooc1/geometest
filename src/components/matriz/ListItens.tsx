import React, { useContext } from 'react'
import { MatrizContext } from '@/context/MatrizContext'


export default function ListItens() {
  const { render, index, setIndex, setPosition, setRotation, setScale, setWireFrame, setColor } = useContext(MatrizContext)
  type Object = {
    id: string,
    type: string,
    position: [number, number, number],
    rotation: [number, number, number],
    scale: [number, number, number],
    wireframe: boolean,
    color: string
  }

  function invertHexColor(hex:string) {
    hex = hex.replace(/^#/, '')
  
    const invertedHex = hex
      .split('')
      .map(digit => {
        const intValue = parseInt(digit, 16)
        const invertedValue = 15 - intValue
        return invertedValue.toString(16).toUpperCase()
      })
      .join('')
  
    // Adiciona novamente o caractere '#' à cor invertida
    return '#' + invertedHex
  }

  async function select(num: number) {
    render.forEach((item: Object, id: number) => {
      item.id = String(id)
    })
    setIndex(num)
    setPosition(render[num].position)
    setRotation(render[num].rotation)
    setScale(render[num].scale)
    render[num].wireframe = !render[num].wireframe
    setWireFrame(render[num].wireframe)
    // render[num].color = invertHexColor(render[num].color)
    setColor(render[num].color)
  }


  return (
    <div className='bg-black md:w-80 w-64 min-h-[100px] py-2 px-2 rounded-xl'>
      <ul className='py-4 pr-4 h-full scroll-add'>
        {render.map((item: Object, key: number) => <li key={key} id={item.id} className={`text-white cursor-pointer border-4 rounded-2xl py-px px-1 bg-primary
            ${index === Number(item.id) ? 'border-white' : 'border-black'}`}
          onClick={() => {
            select(Number(item.id))
            setTimeout(()=>{
              select(Number(item.id))
            },100)
            setTimeout(()=>{
              select(Number(item.id))
            },200)
            setTimeout(()=>{
              select(Number(item.id))
            },300)
          }}>{item.type}-{item.id}</li>)}
      </ul>
    </div>
  )
}
