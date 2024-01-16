import { Link } from "react-router-dom";

export default function Apricot() {
    return (
        <div>
            Apricots are a tasty fruit, but why would you ever get one from a vending machine?
            <br/>
            <Link to={`/`}>Go home and accept defeat.</Link>

        </div>
    )
}