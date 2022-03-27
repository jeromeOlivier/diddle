import * as formula from './formulas';
import * as draw from './interface';
import { getIndex } from './utilities.js';
import { initiateRowOfSquaresEventListener } from './events.js';

// array containing all valid letters
const words = [];



// if word is complete, analyze it (returning suggestions) and draw more squares



//
// export {
//   drawOneLetter,
//   eraseOneLetter,
//   submitLetters,
//   drawSquareColor,
// }

// PRIVATE FUNCTIONS -----------------------------------------------------------
// build the letters based on the values in each square's attributes
// function constructLetters() {
//   const squares = document.querySelector('div.row:last-child').childNodes;
//   // copy the statuses of each square to the letter objects of the word
//   const word = [];
//   squares.forEach(square => {
//     const ltr = {};
//     const index = square.getAttribute('data-idx');
//     const letter = square.getAttribute('data-ltr');
//     const status = square.getAttribute('data-sta');
//     // if there's no letter, don't crerate an object
//     if (letter !== ' ') {
//       ltr['idx'] = letter === undefined ? ' ' : index;
//       ltr['ltr'] = letter === undefined ? ' ' : letter;
//       ltr['sta'] = status === undefined ? ' ' : status;
//       word.push(ltr);
//     }
//   });
//   return word;
// }
