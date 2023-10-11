import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { MatrizContext } from '@/context/MatrizContext'

export default function Menu() {
  const { index, render, setActivate, setRender } = useContext(MatrizContext)

  type Object = {
    id: string,
    type: string,
    position: [number, number, number],
    rotation: [number, number, number],
    scale: [number, number, number],
    wireframe: boolean,
    color: string
  }

  function del (){
    render.forEach((item: Object, id: number) => {
      item.id = String(id)
  })
    setRender(render.filter((item: Object) => Number(item.id) !== index))
  }

  function toggleActive(e: any) {
    if (e.target.offsetParent.classList.contains('button-active')) {
      e.target.offsetParent.classList.remove('button-active')
      setActivate('')
    }
    else {
      document.querySelectorAll('.button-active').forEach((item) => item.classList.remove('button-active'))
      e.target.offsetParent.classList.add('button-active')
      setActivate(e.target.id)
    }
  }

  return (
    <div className='menu-matriz'>
      <section className='flex gap-3 lg:flex-col'>
        <Link href='/'>
          <Image alt='logo' width={35} height={35} src='/logos/logo.png' />
        </Link>
        <button onClick={toggleActive} className="icons-menu">
          <Image id='add' alt='' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' width={35} height={35} src='/matriz/add.svg' />
        </button>
        <button onClick={del} className="icons-menu">
          <Image id='remove' alt='' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' width={35} height={35} src='/matriz/remove.svg' />
        </button>
        <button onClick={toggleActive} className="icons-menu">
          <Image id='config' alt='' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' width={35} height={35} src='/matriz/config.svg' />
        </button>
      </section>
      <section className='flex gap-3 lg:flex-col'>
        <button className="icons-menu">
          <Image alt='três pontos' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' width={35} height={35} src='/nav/elipse.svg' />
        </button>
        <button className="icons-menu">
          <Image alt='cubo' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' width={35} height={35} src='/nav/cube.svg' />
        </button>
      </section>
    </div>
  )
}
