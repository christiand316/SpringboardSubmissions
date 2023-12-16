import React from "react";
import Pokecard from "./Pokecard";
import "./Pokedex.css";



const Pokedex = ({pokemon}) => {
    
    return (
    <div className="pokedex">
        <h3 className="title">Pokedex</h3>
        <div className="pokecards">
        { pokemon.map(card => {
            return <Pokecard data={card}/>
            })
        }
        </div>
    </div>
    )    
}

export default Pokedex;
