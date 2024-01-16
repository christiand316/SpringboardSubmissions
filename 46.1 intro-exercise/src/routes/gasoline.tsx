import { Link } from "react-router-dom"

export default function Gasoline() {
    return (
        <div>
            It'll just pour right out...
            <br/>

            <Link to={`/`}>Return home, defeated.</Link>
        </div>
    )
}