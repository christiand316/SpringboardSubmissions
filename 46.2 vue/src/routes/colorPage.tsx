import { Navigate, redirect, useNavigate, useParams } from "react-router-dom";
import { colorsList } from "./colors";

export default function ColorPage() { 
    const navigate = useNavigate()
    const {color} = useParams() || "unknown" 
    let notExistingColor: boolean = true

    

    if (colorsList.find(colorObj => colorObj.name === color)) {
        notExistingColor = false
    }
    return (
        <div className="horizonify">
            {notExistingColor ? <div>This color doesn't seem to exist yet. <button onClick={() => navigate("/colors/new")}>Want to make one?</button></div> : null}
            <p>{color}</p>
        </div>
    )
}
