// const addCard = async () => {
//     const response = await axios.get(
//       "https://deckofcardsapi.com/api/deck/new/draw/"
//     );
//     setCards(cards => [...cards, { ...response.data, id: uuid() }]);
//   };
// const addPokemon = async name => {
//     const response = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon/${name}/`
//     );
//     setPokemon(pokemon => [...pokemon, { ...response.data, id: uuid() }]);
//   };
import axios from "axios"
import { useState } from "react"
import {v1 as uuid} from "uuid";


export default function useAxios(base_url) {

    const [data, setData] = useState([])

    const updateData = (incoming) => {
        setData(prev => [...prev, incoming])
    }

    const fetchData = async (specific = "") => {
        const response = await axios.get(`${base_url}/${specific}`)
        updateData({ ...response.data, id: uuid() }, uuid())
    }

    return [data, fetchData]
}