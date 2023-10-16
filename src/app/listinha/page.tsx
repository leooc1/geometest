'use client'
import utilsToken from "@/components/utils/token"
import { useEffect, useState } from "react"

export default function Listinha() {
    const [refresh, setRefresh] = useState(false)
    const [itens, setItens]: any = useState([])
    useEffect(()=>{
        ListarElements()
    },[refresh])
    /*// useEffect(() => {
        async function getItens() {
            const id = await utilsToken.getId()
            const elements = await fetch('/api/element/list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ID: id })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    
                    return data
                })
                .catch(err => console.log(err))
            // setItens(elements)
        }
        getItens()

    // }, [itens]) */
    async function FilterDate(e: any) {
        e.preventDefault()
        const id = await utilsToken.getId()
        const body = {
            // Data_Inicio: e.target.dataInicio.value,
            // Data_Fim: e.target.dataFim.value,
            Data_Inicio: '2023-10-16',
            Data_Fim: '2023-10-16',
            ID: id
        }

        await fetch('/api/element/date-filter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => setItens(data))
            .catch(err => console.log(err))
    }
    async function ListarElements() {
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
            .then(data => setItens(data))
            .catch(err => console.log(err))
    }
    return (
        <div className="bg-secondary min-h-screen">
            <form onSubmit={FilterDate} className="bg-primary h-44 flex flex-col justify-center items-center gap-5" action="/api/element/date-filter" method="post">
                <input className='w-32' type="date" value={'2023-10-16'} name="dataInicio" id="dataInicio" />
                <input className='w-32' type="date" value={'2023-10-16'} name="dataFim" id="dataFim" />
                <button className='w-32 bg-white' type="submit">Filtrar</button>
            </form>
            <ul className="flex flex-col gap-2 p-2">
                {itens[0]?.TIPO ?
                    itens.map((item: any, key: number) =>
                    (<li className="bg-slate-400 p-2 rounded-2xl" key={key}>
                        tipo:{item.TIPO}<br />
                        nome:{item.NOME_OBJETO}<br />
                        data de criação: {item.DATA.slice(0, 10)}
                        <div className="flex flex-col float-right -mt-11 gap-3">
                            <button className="bg-green-500 font-semibold py-1 px-2 rounded-xl">Usar</button>
                            <button id={item.ID} className="bg-red-500 font-semibold py-1 px-2 rounded-xl" onClick={async (e:any)=>{
                                
                                await fetch(`/api/element/${e.target?.id}`,{
                                    method: 'DELETE'
                                })
                                .then(response=>console.log(response))
                                .catch(err=>console.log(err))
                                // location.reload()
                                setRefresh(!refresh)
                            }}>Deletar</button>
                        </div>
                    </li>))
                    : 'ngc'}
                {/* {itens} */}
            </ul>
        </div>
    )
}