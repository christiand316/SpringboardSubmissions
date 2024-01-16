import { Link, Outlet } from "react-router-dom";
import '../index.css'

export default function Root() {
    return (
        <div className="horizonify">
        <div className="verticalify">
            This is root!
            <Link to="/dogs">Dogs Demo</Link>
            <Link to="/colors">Colors Demo</Link>
        </div>
        <Outlet/>
        </div>
    )
}