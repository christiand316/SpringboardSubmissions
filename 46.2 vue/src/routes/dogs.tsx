import { Link, Outlet } from 'react-router-dom'
import '../index.css'

import { dogsInfo } from '../main'

export default function Dogs() {
    return (
        <div className='horizonify'>
            <div className='verticalify'>

            {dogsInfo.dogs.map(dog => {return <Link key={dog.src} to={`/dogs/${dog.src}`}>{dog.name}</Link>} )}
            </div>
            <Outlet/>
        </div>
    )
}