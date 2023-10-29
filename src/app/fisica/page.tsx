'use client'
import { Suspense, useEffect, useState } from 'react'
import { Box, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import utilsToken from '@/components/utils/token'

export default function Fisica() {
    return (
        <main className='w-screen h-screen'>
            <Canvas shadows camera={{ position: [10, 10, 10], fov: 80 }}>
                <color attach='background' args={['#ececec']} />
                <Suspense>
                    <Physics debug gravity={[0, -10, 0]}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[-10, 10, 0]} intensity={0.4} />
                        <OrbitControls />
                        <RigidBody position={[5, 5, 0]} restitution={2}>
                            <Box >
                                <meshStandardMaterial color={"royalblue"} />
                            </Box>
                        </RigidBody>
                        {/* chao */}
                        <RigidBody type='fixed' rotation={[0.04, 0, 0]} restitution={0}>
                            <Box position={[0, 0, 0]} args={[20, 1, 20]}>
                                <meshStandardMaterial color={'#fff'} />
                            </Box>
                        </RigidBody>
                    </Physics>
                </Suspense>
            </Canvas>
        </main>
    )
}
