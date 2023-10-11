import { MatrizContext } from '@/context/MatrizContext';
import Image from 'next/image'
import React, { useContext } from 'react'

export default function Download() {
    const { render } = useContext(MatrizContext)
    async function downloadJSON() {
        const objetoJSON = JSON.stringify(render);

        const blob = new Blob([objetoJSON], { type: 'application/json' });
        const arquivo = new File([blob], 'geometry.json');

        const urlObjeto = URL.createObjectURL(arquivo);

        const link = document.createElement('a');
        link.href = urlObjeto;
        link.download = arquivo.name;

        document.body.appendChild(link);

        link.click();

        setTimeout(function () {
            document.body.removeChild(link);
            URL.revokeObjectURL(urlObjeto);
        }, 0);
    }
    async function downloadBD() {
        const nomeOBJ = prompt('Digite aqui o nome do objeto:')
        const body = {
            TIPO: 1,
            NOME_OBJETO: nomeOBJ,
            OBJETO: render,
            ID_USUARIO: 28
        }
        await fetch('/api/element/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    return (
        <div className='flex justify-center py-2'>
            <ul className='flex flex-col'>
                <li>
                    <button>
                        <Image src='/matriz/profile/config.svg' alt='config' width={35} height={35} />
                    </button>
                </li>
                <li>
                    <button onClick={downloadJSON}>
                        <Image src='/matriz/profile/download.svg' alt='download' width={35} height={35} />
                    </button>
                </li>
                <li>
                    <button onClick={downloadBD}>
                        <Image src='/matriz/profile/save.svg' alt='save' width={35} height={35} />
                    </button>
                </li>
            </ul>
        </div>
    )
}