import { containsBlanks } from './utilities.js';
import {
  drawListOfSuggestedWords,
  drawOneLetter,
  drawOneRowOfSquares,
  drawSquareColor,
  eraseOneLetter
} from './interface.js';
import { runAllFilters } from './filters.js';

const words = [];

// EVENT LISTENERS -------------------------------------------------------------
export function initiateRowOfSquaresEventListener() {
  const rows = document.querySelectorAll('.row:last-of-type');
  rows.forEach(row => {
    const squares = row.querySelectorAll('div');
    squares.forEach(square => {
      square.addEventListener('click', () => {
        checkIfRowOfSquaresIsFilledAndActive(square);
      })
    })
  });
}

export function initiateOnScreenKeyboardEventListener() {
  const buttons = document.querySelectorAll('.row-of-buttons button');
  buttons.forEach(button => button.addEventListener('click', () => {
    const val = button.getAttribute("data-btn-value");
    checkKeyboardEvent(val);
  }));
}

export function initiatePhysicalKeyboardEventListener() {
  window.addEventListener('keydown', e => {
    const val = e.key;
    checkKeyboardEvent(val);
  });
}

// CONDITIONS ------------------------------------------------------------------
function checkIfRowOfSquaresIsFilledAndActive(square) {
  const content = square.getAttribute("data-ltr");
  const isFilled = content !== ' ';
  const status = square.parentElement.getAttribute('data-row-sta');
  const isActive = status === 'active';
  if (isActive && isFilled) return drawSquareColor(square);
}

function checkKeyboardEvent(val) {
  if (letterCanBeAdded(val)) return drawOneLetter(val);
  if (letterCanBeDeleted(val)) return eraseOneLetter();
  if (wordCanBeSubmitted(val)) return submitLetters();
}

function letterCanBeAdded(val) {
  const index = getIndex();
  return val >= 'a' && val <= 'z' && index.letter < 5 && index.row < 6;
}

function letterCanBeDeleted(val) {
  const index = getIndex();
  return (val === 'Delete' || val === 'Backspace') && index.letter > 0;
}

function wordCanBeSubmitted(val) {
  const index = getIndex();
  return val === 'Enter' && index.letter === 5 && index.row < 6;
}

// ACTIONS ---------------------------------------------------------------------
function constructLetters() {
  const squares = document.querySelector('div.row:last-child').childNodes;
  // copy the statuses of each square to the letter objects of the word
  const word = [];
  squares.forEach(square => {
    const ltr = {};
    const index = square.getAttribute('data-idx');
    const letter = square.getAttribute('data-ltr');
    const status = square.getAttribute('data-sta');
    // if there's no letter, don't crerate an object
    if (letter !== ' ') {
      ltr['idx'] = letter === undefined ? ' ' : index;
      ltr['ltr'] = letter === undefined ? ' ' : letter;
      ltr['sta'] = status === undefined ? ' ' : status;
      word.push(ltr);
    }
  });
  return word;
}

function submitLetters() {
  // before submitting, construct each letter & check if all squares have
  // letters
  const lettersFromNextWord = constructLetters();
  if (!containsBlanks(lettersFromNextWord)) {
    // add letters to the final set, removing duplicates
    // lettersFromNextWord.forEach(letter => letters.push(letter));
    words.push(lettersFromNextWord);
    // send the unique letters to be analyzed and filtered
    const listOfWords = runAllFilters(words);
    // draw squares & apply an event listener
    const row = document.querySelector('div[data-row-sta="active"]');
    row.setAttribute('data-row-sta', 'locked');
    const grid = document.querySelector('#rowsOfSquares')
    if (grid.childElementCount < 6) {
      drawOneRowOfSquares();
      initiateRowOfSquaresEventListener();
      drawListOfSuggestedWords(listOfWords);
    }
  }
}

// HELPER ----------------------------------------------------------------------
function getIndex() {
  let letter;
  const squares = document.querySelector('div[data-row-sta="active"]').childNodes;
  squares.forEach(square => {
    const idx = Number(square.getAttribute('data-idx'));
    const ltr = square.getAttribute('data-ltr');
    // the last filled square === current index
    if (idx === 0 && ltr === ' ') {
      letter = 0;
    } else if (ltr !== ' ') {
      letter = idx + 1;
    }
  });
  // determine current row index based on the number of children in #grid div
  const row = document.querySelector('#rowsOfSquares').childElementCount - 1;
  return { letter, row };
}
