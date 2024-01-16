import { dogsInfo } from "../main";
import '../index.css'
import { useParams } from "react-router-dom";

export default function DogPage() {

    const {source} = useParams()

    const dogInfo = dogsInfo.dogs.find(dog => dog.src === source) || {
        name: source,
        age: 0,
        src: 'not-found',
        facts: ['This dog does not exist']
    }

    return (
        <div className="horizonify">
            <p>{dogInfo?.name}</p>
            <p>{dogInfo?.age} years old</p>
            <ul className="verticalify">
                {dogInfo?.facts.map(fact => <li key={fact}>{fact}</li>)}
            </ul>
        </div>
    )
}