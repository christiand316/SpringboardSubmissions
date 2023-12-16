import React from "react";
import "./Cell.css";



/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({rowIndex, colIndex, lightOn, lightToggle}) {
  const handleClick = () => lightToggle(rowIndex, colIndex)

  return (
    <button 
      onClick={handleClick}
      className={lightOn ? 'on' : 'off'}
      key={`${rowIndex}-${colIndex}`}>
    </button>
)}

export default Cell;
 