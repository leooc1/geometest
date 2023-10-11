import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

export default function BgMatriz() {
    const bgRef: React.RefObject<any> = useRef()
    useFrame(() => {
        if (bgRef.current) {
            bgRef.current.rotation.x += 0.01
            bgRef.current.rotation.y += 0.01
            bgRef.current.position.x += 0.08
            bgRef.current.position.z -= 0.08
            if(bgRef.current.position.x >7){
                bgRef.current.position.x *=-1
            }
            if(bgRef.current.position.z <-25){
                bgRef.current.position.z = 1
                bgRef.current.position.x = 0
            }
        }
    })
    return (
        <>
            <mesh ref={bgRef} scale={[2,2,2]}>
                <sphereGeometry />
                <meshStandardMaterial color={0xff0000} wireframe/>
            </mesh>
            <ambientLight />
        </>
    )
}
