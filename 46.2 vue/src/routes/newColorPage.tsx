import { Navigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

//@ts-ignore
export default function NewColorPage() { 
    const [colorData, setColorData] = useState({color: "", name: ""})

    //@ts-ignore
    const [handleClick] = useOutletContext()

    const otherClick = () => {
        handleClick(colorData)
    }

    return (
        <div className="horizonify">
            <input type="color" value={colorData.color} onChange={(e) => setColorData({name: colorData.color, color: e.target.value})} />
            <input type="text" value={colorData.name} onChange={(e) => setColorData({color: colorData.color, name: e.target.value})} />
            <button onClick={() => otherClick}>Add color</button>
        </div>
    )
}
