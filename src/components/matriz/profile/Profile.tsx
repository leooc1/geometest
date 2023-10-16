import React, { useState } from 'react'
import Download from './Download'

export default function Profile({ id }: { id: string | number }) {
    const [active, setActive] = useState(false)
    return (
        <div className={`fixed top-10 right-10 bg-primary p-2 rounded-full ${active ? '' : 'h-14'}`}>
            <button onClick={() => setActive(!active)}
                className="w-10 h-10 rounded-full bg-white">
                {id}
            </button>
            {active ? <Download /> : null}
        </div>
    )
}
