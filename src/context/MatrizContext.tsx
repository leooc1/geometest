import { createContext, useState } from 'react';

export const MatrizContext = createContext({} as any);

export const MatrizProvider = ({children}:{children:React.JSX.Element})=>{
    const [activate, setActivate] = useState<string>('')/** qual funcionalidade do menu está ativa no momento */
    const [bgColor, setBgColor] = useState<string>('#bdbdbd')/** background dos objetos */
    const [index, setIndex] = useState<number>(0)
    const [position, setPosition] = useState<[number,number,number]>([0, 0, 0])
    const [rotation, setRotation] = useState<[number,number,number]>([0, 0, 0])
    const [scale, setScale] = useState<[number,number,number]>([1, 1, 1])
    const [color, setColor] = useState<string>("#ffffff")
    const [wireframe, setWireFrame] = useState<boolean>(false)
    const [render, setRender] = useState<[]>([])

    return(
        <MatrizContext.Provider value={{bgColor, setBgColor,
                                        activate, setActivate,
                                        index, setIndex,
                                        position, setPosition,
                                        rotation, setRotation,
                                        scale, setScale,
                                        color, setColor,
                                        wireframe, setWireFrame,
                                        render, setRender}}>
            {children}
        </MatrizContext.Provider>
    )
}