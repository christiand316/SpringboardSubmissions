import React, { useState } from "react";
import backOfCard from "./back.png";
import "./PlayingCard.css"
import useToggle from "./hooks/useToggle.jsx";

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {
  const  [isFacingUp, setIsFacingUp]  = useToggle(true)

  return (
    <img
      src={isFacingUp ? front : back}
      alt="playing card"
      onClick={setIsFacingUp}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;
