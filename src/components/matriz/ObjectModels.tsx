import React from 'react'
interface propsObjectModels {
    position: [number, number, number],
    focus?: (e:any) => void,
    nameID: string,
    rotate: [number, number, number],
    scale: [number, number, number],
    type: string,
    wireframe: boolean,
    color: string
}
export default function ObjectModels(props: propsObjectModels) {
    return (
        <>
            <mesh position={props.position} scale={props.scale} rotation={props.rotate} onClick={props.focus}>
                {props.type == 'TetrahedronGeometry' ? <tetrahedronGeometry name={props.nameID} /> : null}
                {props.type == 'BoxGeometry' ? <boxGeometry name={props.nameID} /> : null}
                {props.type == 'IcosahedronGeometry' ? <icosahedronGeometry name={props.nameID} /> : null}
                {props.type == 'OctahedronGeometry' ? <octahedronGeometry name={props.nameID} /> : null}
                {props.type == 'DodecahedronGeometry' ? <dodecahedronGeometry name={props.nameID} /> : null}
                <meshStandardMaterial color={props.color} wireframe={props.wireframe} />
            </mesh>
        </>
    )
}