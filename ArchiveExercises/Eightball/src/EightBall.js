import React, { useState } from "react";
import "./EightBall.css";
import repliesList from "./replies.json";
import { choice } from "./random";


function EightBall({ replies = repliesList }) {
  const [answer, setAnswer] = useState({
    msg: "Think of a Question.",
    color: "black",
  });

  function handleClick(e) {
    setAnswer(choice(replies));
  }

  return (
      <div
          className="Eightball"
          onClick={handleClick}
          style={{ backgroundColor: answer.color }}
      >
        <b>{answer.msg}</b>
      </div>
  );
}


export default EightBall;
