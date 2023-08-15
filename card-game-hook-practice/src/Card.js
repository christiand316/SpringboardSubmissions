import React from "react";

function Card({image, name}) {
    
    
    return (
        <img 
        className="card"
        src={image}
        alt={name}
        />
    )
}

export default Card