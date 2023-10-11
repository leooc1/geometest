import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function NavBar() {
  const [top, setTop] = useState(0)
 
  return (
    <nav className={`nav-bar ${top === 0 ?
      'lg:left-0 bottom-0 rounded-t-3xl lg:rounded-r-3xl lg:rounded-tl-none lg:h-full w-full' :
      'lg:left-10 bottom-10 rounded-3xl lg:h-[92%] w-[92%]'}`}>
      <Link href='#home'>
        <Image alt='logo' width={36} height={36} src={`/logos/logo.png`} />
      </Link>
      <ul className='flex lg:flex-col gap-3 my-2 scroll-add'>
        <li><Image alt='três pontos' className='h-[36px]' width={36} height={36} src={'/nav/elipse.svg'} /></li>
        <li>
          <Link href='#sobre'><Image alt='sobre' width={36} height={36} src={'/nav/sobre.svg'} /></Link>
        </li>
        <li>
          <Link href='#algebra'><Image alt='cubo' width={36} height={36} src={'/nav/cube.svg'} /></Link>
        </li>
        <li>
          <Link href='#matriz'><Image alt='mesh' width={36} height={36} src={'/nav/mesh.svg'} /></Link>
        </li>
        <li>
          <Link href='#fisica'><Image alt='react' width={36} height={36} src={'/nav/react.svg'} /></Link>
        </li>
      </ul>
    </nav>
  )
}
