import React from 'react'
import './Pokecard.css'

function Pokecard({data}) {
  
    let pokecardImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
   

    return (
        <div className='pokemon-card'> 
            <div className="pokemon-name">{ data.name }</div>  
            <img className="pokemon-sprite" src={pokecardImage} />
            <div className="pokemon-info">Type: {data.type}</div>
            <div className="pokemon-info">EXP: {data.base_experience}</div>
        </div>
    )
}

export default Pokecard