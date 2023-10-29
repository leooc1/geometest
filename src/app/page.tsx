'use client'
import Matriz from "@/components/Matriz"
import NavBar from "@/components/NavBar"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const [move, setMove] = useState(1000)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const bottom = document.getElementById('home') as HTMLElement
      const hContainer = (bottom?.getBoundingClientRect().bottom - innerHeight)
      if (hContainer >= 0) {
        setMove(hContainer)
      } else {
        setMove(0)
      }
    })
  }, [move])
  return (
    <>
      <main className="bg-secondary w-full h-full scroll-smooth">
        <NavBar />
        <section id="home" className="h-[200vh] w-full flex flex-col justify-evenly bg-secondary overflow-x-clip">
          <p className="font-semibold text-center text-9xl tracking-widest">
            <span className="exit-g">G</span>
            <span className="exit-bar">/</span>
            <span className="exit-x">X</span>
          </p>
          <p className="font-semibold text-center text-9xl sticky top-1/2  tracking-widest">
            <span className="entry-g">G</span>
            <span className="entry-bar">/</span>
            <span className="entry-x">X</span>
          </p>
        </section>
        <div id="sobre" className="h-screen w-full flex justify-center items-center bg-gray-700 text-white tracking-[3px] uppercase"><Link href='#'>clica aí pra nada</Link></div>
        <div id="algebra" className="h-screen w-full flex justify-center items-center bg-gray-700 text-white tracking-[3px] uppercase"><Link href='/algebra'>parabolinha di cria?</Link></div>
        <Matriz />
        <div id="fisica" className="h-screen w-full flex justify-center items-center bg-gray-700 text-white tracking-[3px] uppercase"><Link href='/fisica'>físico + turista . . .</Link></div>
      </main>
    </>
  )
}
