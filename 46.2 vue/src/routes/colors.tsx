import { Link, Navigate, Outlet } from 'react-router-dom'
import '../index.css'
import { ContextType, useState } from 'react'

export const colorsList = [{hex: '#FF0000', name: 'red'}, {hex: '#00FF00', name: 'green'}, {hex: '#0000FF', name: 'blue'}]

export default function Colors() {
    const [colors, setColors] = useState(colorsList)

    const handleClick = (incomingColor: {hex: string, color: string}) => {
        if (colorsList.find(colorObj => colorObj.name === incomingColor.color)) {
            return <Navigate to={`/colors/${incomingColor}`}/>
        }
        setColors([...colors, {hex: incomingColor.hex, name: incomingColor.color}])
    }

    return (
        <div className='horizonify'>
            <div className='verticalify'>
                <h1>Colors</h1>
                <p>These are the colors</p>
                <ul className='verticalify'>
                    {colorsList.map(color => <Link key={color.name} to={color.name}>{color.name}, which is {color.hex}</Link>)}
                    <Link to='/colors/new'>Add a color</Link>
                </ul>
            </div>
            <Outlet context={[handleClick]}/>
        </div>
    )
}