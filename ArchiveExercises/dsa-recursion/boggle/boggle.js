/** Boggle word check.

Given a 5x5 boggle board, see if you can find a given word in it.

In Boggle, you can start with any letter, then move in any NEWS direction.
You can continue to change directions, but you cannot use the exact same
tile twice.

So, for example::

    N C A N E
    O U I O P
    Z Q Z O N
    F A D P L
    E D E A Z

In this grid, you could find `NOON* (start at the `N` in the top
row, head south, and turn east in the third row). You cannot find
the word `CANON` --- while you can find `CANO` by starting at the
top-left `C`, you can 't re-use the exact same `N` tile on the
front row, and there's no other `N` you can reach.

*/

function makeBoard(boardString) {
  /** Make a board from a string.

    For example::

        board = makeBoard(`N C A N E
                           O U I O P
                           Z Q Z O N
                           F A D P L
                           E D E A Z`);

        board.length   // 5
        board[0]       // ['N', 'C', 'A', 'N', 'E']
    */

  const letters = boardString.split(/\s+/);

  const board = [
    letters.slice(0, 5),
    letters.slice(5, 10),
    letters.slice(10, 15),
    letters.slice(15, 20),
    letters.slice(20, 25),
  ];

  return board;
}

function findWord(board, word, y, x) {
	//check if current coords share first letter of word
	if (word[0]=== board[y][x]) {

		let prevY 
		let prevX 
		let wordProg = word[0]

		for (let i = 1; i <= word.length; i++) {

			//check if words match, if so the path was found
			if (word == wordProg) return true;
			
			/*
			first check if proposed coords are out of bounds to prevent an error (var +/- != outofbounds)
			next check the appropriate adjacent coordinate
			XOR check for previous coords 
			*/

			if (y+1 != 5 && board[y+1][x]== word[i] && previousCheck(prevY, y+1, prevX, x)) {
				y++
				prevY = y
				prevX = x
				wordProg += board[y][x]
			}
			else if (x+1 != 5 && board[y][x+1]== word[i] && previousCheck(prevY, y, prevX, x+1)) {
				x++
				prevY = y
				prevX = x
				wordProg += board[y][x]
			}
			
			else if (x-1 != -1 && board[y][x-1]== word[i] && previousCheck(prevY, y, prevX, x-1)) {
				x--
				prevY = y
				prevX = x
				wordProg += board[y][x]
			}
			
			else if (y-1 != -1 && board[y-1][x]== word[i] && previousCheck(prevY, y-1, prevX, x)) {
				y--
				prevY = y
				prevX = x
				wordProg += board[y][x]
			}
		}
	}
	// all directions have been explored with no match
	return false
  }

  function previousCheck(prevY, y, prevX, x) {
	if (prevY != y || prevX != x) return true
	if (prevX == undefined) return true
	return false
  }
  
  function find(board, word) {
	for (let y = 0; y < 5; y++){
	  for (let x = 0; x < 5; x++) {
		if(findWord(board, word, y, x)) {
			console.log('this is true!')
			return true
		}
	  }
	}
	console.log('this is false D:')
	return false
  }

// EXAMPLE TEST

// For example::

const board = makeBoard(`N C A N E
                         O U I O P
                         Z Q Z O N
                         F A D P L
                         E D E A Z`);

// `NOON` should be found (0, 3) -> (1, 3) -> (2, 3) -> (2, 4)::

console.log(find(board, "NOON"), true);

// `NOPE` should be found (0, 3) -> (1, 3) -> (1, 4) -> (0, 4)::

console.log(find(board, "NOPE"), true);

// `CANON` can't be found (`CANO` starts at (0, 1) but can't find
// the last `N` and can't re-use the N)::

console.log(find(board, "CANON"), false);

// You cannot travel diagonally in one move, which would be required
// to find `QUINE`::

console.log(find(board, "QUINE"), false);

// We can recover if we start going down a false path (start 3, 0)::

console.log(find(board, "FADED"), true);

// An extra tricky case --- it needs to find the `N` toward the top right,
// and then go down, left, up, up, right to find all four `O`s and the `S`::

const board2 = makeBoard(`E D O S Z
                          N S O N R
                          O U O O P
                          Z Q Z O R
                          F A D P L`);

console.log(find(board2, "NOOOOS"), true);
