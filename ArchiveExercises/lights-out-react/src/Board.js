import React, {useState} from "react";
import Cell from "./Cell";
import "./Board.css";




function Board() {
  const boardSize = 5; // May make this editable later?


  const makeBoard = () => {
    return new Array(boardSize).fill().map(() =>
      new Array(boardSize).fill().map(() => Math.random() < .15)
    );
  };

  const [board, setBoard] = useState(makeBoard);

  const lightToggle = (row, col) => {
    const copy = board.map(rowArray => [...rowArray]);

    copy[row][col] = !copy[row][col];
    if (row < boardSize - 1) copy[row + 1][col] = !copy[row + 1][col];
    if (row > 0) copy[row - 1][col] = !copy[row - 1][col];
    if (col < boardSize - 1) copy[row][col + 1] = !copy[row][col + 1];
    if (col > 0) copy[row][col - 1] = !copy[row][col - 1];

    setBoard(copy);
  };

  // Check if the game is over
  const isGameOver = () => {
    return board.every(row => row.every(cell => !cell));
  };

  return (
    <div className="board">
      {isGameOver() ? (
        <div className="won">You won!</div>
      ) : (
        board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                lightOn={board[rowIndex][colIndex]}
                lightToggle={() => lightToggle(rowIndex, colIndex)}
                rowIndex={rowIndex}
                colIndex={colIndex}
              />
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Board;
