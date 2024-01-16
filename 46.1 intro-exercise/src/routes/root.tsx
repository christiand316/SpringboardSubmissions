import { Link, Outlet } from "react-router-dom"

export default function Root() {
    return (<div>
        Welcome to the vending machine! We sell... only three items.
        <nav>
            <p>(unstyled) NAVIGATION BAR</p>
            <Link to={`apricot`}>BUY AN... APRICOT?</Link>
            <br/>
            <Link to={`gasoline`}>BUY... GASOLINE?</Link>
            <br/>
            <Link to={`amazon-stock`}>BUY AN... 4 DOLLARS WORTH OF AMAZON STOCK?</Link>
        </nav>
        <Outlet/>
    </div>)
  }