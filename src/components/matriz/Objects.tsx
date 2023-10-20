'use client'
import { MatrizContext } from '@/context/MatrizContext'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useContext, useEffect } from 'react'
import ObjectModels from './ObjectModels'

export default function Objects() {
    const { bgColor, render, setRender, setColor, setWireFrame, setIndex, setPosition, setScale, setRotation } = useContext(MatrizContext)

    type Object = {
        id: string,
        type: string,
        position: [number, number, number],
        rotation: [number, number, number],
        scale: [number, number, number],
        wireframe: boolean,
        color: string
    }

    function select(e: any) {
        render.forEach((item: Object, id: number) => {
            item.id = String(id)
        })
        setColor(e.object.material.__r3f.memoizedProps.color)
        setWireFrame(e.object.material.wireframe)
        setIndex(e.object.geometry.name)
        setPosition([e.eventObject.position.x, e.eventObject.position.y, e.eventObject.position.z])
        setScale([e.eventObject.scale.x, e.eventObject.scale.y, e.eventObject.scale.z])
        setRotation([e.eventObject.rotation.x, e.eventObject.rotation.y, e.eventObject.rotation.z])
    }

    async function getElement(id: string) {
        await fetch(`/api/element/${id}`)
            .then(response => response.json())
            .then(response => setRender(JSON.parse(response)))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        const idElement = localStorage.getItem('elementUse')
        if (idElement) {
            getElement(idElement)
            localStorage.removeItem('elementUse')
        }
    })

    return (
        <Canvas className='w-screen h-screen' style={{ backgroundColor: bgColor }}>
            <mesh>
                <OrbitControls />
                <ambientLight intensity={4} />
                {/* <directionalLight position={[10,10,10]} intensity={2} /> */}
                {/* <directionalLight position={[-10,-10,-10]} intensity={2} /> */}
                {render.map((item: Object, index: string) => {
                    return <ObjectModels key={index} nameID={index} color={item.color} type={item.type} wireframe={item.wireframe} position={item.position} rotate={item.rotation} scale={item.scale} focus={select} />
                })}

            </mesh>
        </Canvas>
    )
}
