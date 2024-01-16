import { Link } from "react-router-dom"

export default function AmazonStock() {
    return (
        <div>
            INSUFFICENT FUNDS: Stock raised by 0.03 cents after purchase.
            <br/>

            <Link to={`/`}>Contact customer support on your home phone.</Link>
        </div>
    )
}