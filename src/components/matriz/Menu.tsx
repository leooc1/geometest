import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { MatrizContext } from '@/context/MatrizContext'
import ListModal from './ListModal'

export default function Menu() {
  const { index, render, setActivate, activate, setRender } = useContext(MatrizContext)

  type Object = {
    id: string,
    type: string,
    position: [number, number, number],
    rotation: [number, number, number],
    scale: [number, number, number],
    wireframe: boolean,
    color: string
  }

  function del() {
    render.forEach((item: Object, id: number) => {
      item.id = String(id)
    })
    setRender(render.filter((item: Object) => Number(item.id) !== index))
  }

  function toggleActive(index: number) {
    let buttons = document.querySelectorAll('button.icons-menu')

    if (buttons[index].classList.contains('button-active')) {
      buttons[index].classList.remove('button-active')
      setActivate('')
    }
    else {
      document.querySelectorAll('.button-active').forEach((item) => item.classList.remove('button-active'))
      buttons[index].classList.add('button-active')
      setActivate(buttons[index].id)
    }
  }



  return (
    <section className='menu-matriz'>
      <div className='flex gap-3 lg:flex-col'>
        <Link href='/'>
          <Image alt='logo' width={35} height={35} src='/logos/logo.png' />
        </Link>
        <button id='add' onClick={() => toggleActive(0)} className="icons-menu">
          <Image alt='' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' width={35} height={35} src='/matriz/add.svg' />
        </button>
        <button onClick={del} className="icons-menu">
          <Image id='remove' alt='' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' width={35} height={35} src='/matriz/remove.svg' />
        </button>
        <button id='config' onClick={() => toggleActive(2)} className="icons-menu">
          <Image alt='' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' width={35} height={35} src='/matriz/config.svg' />
        </button>
      </div>
      <div className='flex gap-3 lg:flex-col relative'>
        <ListModal display={activate === 'modal-list' ? 'block':'hidden'}/>
        <button id='modal-list' onClick={() => toggleActive(3)} className="icons-menu">
          <Image alt='três pontos' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' width={35} height={35} src='/nav/elipse.svg' />
        </button>
        <button className="icons-menu">
          <Image alt='cubo' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' width={35} height={35} src='/nav/cube.svg' />
        </button>
      </div>
    </section>
  )
}
