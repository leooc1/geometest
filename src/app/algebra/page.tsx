'use client'
import utilsToken from '@/components/utils/token';
import { useEffect, useState } from 'react';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

export default function Algebra() {
    
    const [valueA, setValueA] = useState(0)
    const [valueB, setValueB] = useState(0)
    const [valueC, setValueC] = useState(0)
    const [data, setData]: any = useState([])

    function calcularRaizesQuadraticas(a: number, b: number, c: number) {
        // Calcula o discriminante
        const discriminante = b * b - 4 * a * c;

        // Verifica se o discriminante é negativo (raízes complexas)
        if (discriminante < 0) {
            return null; // Não há raízes reais
        }

        // Calcula as raízes
        const x1 = (-b + Math.sqrt(discriminante)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminante)) / (2 * a);

        return [x1, x2];
    }

    useEffect(() => {
        const raizes = calcularRaizesQuadraticas(valueA, valueB, valueC)
        if (raizes) {
            raizes.sort()
            let dados = []
            for (let x = (raizes[0] - 10); x <= (raizes[1] + 10); x += 1) {
                const y = valueA * x * x + valueB * x + valueC;
                dados.push({ x, y });
            }
            setData(dados)
        }
        else
            setData([{ x: 0, y: 0 }])

    }, [valueA, valueB, valueC])
    return (
        <div className='w-full h-screen'>
            <section className='flex justify-around mt-5'>
                <input onChange={(e) => {
                    if (e.target.value === '') {
                        setValueA(0)
                    }
                    else
                        setValueA(Number(e.target.value))
                }} className='border-black border' type="number" name="a" id="a" />
                <input onChange={(e) => {
                    if (e.target.value === '') {
                        setValueB(0)
                    }
                    else
                        setValueB(Number(e.target.value))
                }} className='border-black border' type="number" name="b" id="b" />
                <input onChange={(e) => {
                    if (e.target.value === '') {
                        setValueC(0)
                    }
                    else
                        setValueC(Number(e.target.value))
                }} className='border-black border' type="number" name="c" id="c" />
            </section>
            <VictoryChart
                theme={VictoryTheme.material}
                width={300}
                height={300}
                domain={{ x: [-6, 6], y: [-2, 10] }}
            >
                <VictoryLine
                    interpolation={"natural"}
                    animate
                    style={{
                        data: { stroke: "#0000dd" },
                    }}
                    data={data}
                />
            </VictoryChart>
        </div>
    )
}
