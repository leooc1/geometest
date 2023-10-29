'use client'
import utilsToken from "@/components/utils/token"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function ListModal({ display }: { display: string }) {
    const [refresh, setRefresh] = useState(true)
    const [filter, setFilter] = useState('all')
    const [itens, setItens]: any = useState([])
    useEffect(() => {
        if (filter==='all')
            ListarElements()
    }, [refresh, filter])
    async function FilterDate(e: any) {
        setRefresh(true)
        setFilter('date')
        e.preventDefault()
        const id = await utilsToken.getId()
        const body = {
            Data_Inicio: e.target.dataInicio.value,
            Data_Fim: e.target.dataFim.value,
            ID: id
        }

        await fetch('/api/element/date-filter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                setItens(data)
                setRefresh(false)
            })
            .catch(err => {
                console.log(err)
                setRefresh(false)
            })
    }
    async function ListarElements() {
        setFilter('all')
        const id = await utilsToken.getId()
        const body = {
            ID: id
        }
        await fetch('/api/element/list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                setItens(data)
                setRefresh(false)
            })
            .catch(err => {
                console.log(err)
                setRefresh(false)
            })
    }
    return (
        <div className={`bg-[#969696] pb-4 rounded-b-xl rounded-t-3xl absolute lg:left-16 lg:bottom-9 -right-6 bottom-14 w-[280px] ${display}`}>
            <form onSubmit={FilterDate} className=" rounded-t-2xl bg-primary h-44 flex flex-col justify-center items-center gap-5 relative" action="/api/element/date-filter" method="post">
                <input className='w-32' type="date" name="dataInicio" id="dataInicio" />
                <input className='w-32' type="date" name="dataFim" id="dataFim" />
                <button className='w-32 bg-white' type="submit">Filtrar</button>
            </form>
            {refresh ?
                <Image className="m-auto" width={100} height={100} alt="loading" src={'/loading.svg'} />
                :
                <ul className="flex flex-col gap-2 p-2 h-40 overflow-y-scroll">
                    {itens[0]?.TIPO ?
                        itens.map((item: any, key: number) => item.TIPO === 1 ?
                            (<li className="bg-slate-400 p-2 rounded-2xl" key={key}>
                                nome:{item.NOME_OBJETO}<br />
                                data de criação: {item.DATA.slice(0, 10)}
                                <div className="flex justify-center mt-2 gap-3">
                                    <button className="bg-green-500 font-semibold py-1 px-2 rounded-xl"
                                        onClick={async () => {
                                            await localStorage.setItem('elementUse', item.ID)
                                            location.reload()
                                        }}>Usar</button>
                                    <button id={item.ID} className="bg-red-500 font-semibold py-1 px-2 rounded-xl" onClick={async (e: any) => {

                                        await fetch(`/api/element/${e.target?.id}`, {
                                            method: 'DELETE'
                                        })
                                            .then(response => console.log(response))
                                            .catch(err => console.log(err))
                                        setRefresh(true)
                                        let inicio: any = document.getElementById('dataInicio')
                                        let fim: any = document.getElementById('dataFim')
                                        inicio.value = ''
                                        fim.value = ''
                                    }}>Deletar</button>
                                </div>
                            </li>) : null)
                        : <p>Achei nada ainda</p>}
                </ul>
            }
        </div>
    )
}