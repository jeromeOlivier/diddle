import * as filter from './filters.js';
import * as draw from './draw.js';

// EVENT LISTENERS -------------------------------------------------------------
// initializer
export function start() {
  keyboardEventListener();
  buttonsEventListener();
  gridEventListener();
}

// event listener for user keyboard interaction (keys)
function keyboardEventListener() {
  window.addEventListener('keydown', e => {
    const val = e.key;
    checkKeyboardEvent(val);
  });
}

// event listener for onscreen keyboard interaction (buttons)
function buttonsEventListener() {
  const buttons = document.querySelectorAll('.kb-row button');
  buttons.forEach(button => button.addEventListener('click', () => {
    const val = button.getAttribute("data-btn-value");
    checkKeyboardEvent(val);
  }));
}

// event listener for current active row of squares (always the last)
function gridEventListener() {
  const rows = document.querySelectorAll('.row:last-of-type');
  rows.forEach(row => {
    const squares = row.querySelectorAll('div');
    squares.forEach(square => {
      square.addEventListener('click', () => {
        checkGridEvent(square);
      })
    })
  });
}

// check conditions after a key or button event is triggered
function checkKeyboardEvent(val) {
  if (canBeAdded(val)) return addLetter(val);
  if (canBeSubmitted(val)) return submitLetters();
  if (canBeDeleted(val)) return deleteLetter();
}

function checkGridEvent(square) {
  const content = square.getAttribute("data-ltr");
  const isFilled = content !== ' ';
  const status = square.parentElement.getAttribute('data-row-sta');
  const isActive = status === 'active';
  if (isActive && isFilled) return draw.toggleStatus(square);
}

// MANIPULATION OF LETTERS -----------------------------------------------------
// add letter to the word and print it to the screen
function addLetter(letter) {
  const index = getIndex();
  const position = `[data-row="${index.row}"] [data-idx="${index.letter}"]`;
  const cell = document.querySelector(position);
  cell.setAttribute('data-ltr', letter);
  // todo: add animation when letter is added (quick zoom in)
  cell.textContent = letter.toUpperCase();
}

// delete letter from the word and remove it from the screen
function deleteLetter() {
  // target previous index to delete last letter (current index is always empty)
  const index = getIndex();
  const position = `[data-row="${index.row}"] [data-idx="${index.letter - 1}"]`;
  const cell = document.querySelector(position);
  cell.textContent = "";
  cell.setAttribute('data-ltr', ' ');
  cell.setAttribute('data-sta', 'blank');
}

// array containing all valid letters
const letters = [];

// if word is complete, analyze it (returning suggestions) and draw more squares
function submitLetters() {
  // before submitting, construct each letter and check if all squares h
  const lettersFromNextWord = constructLetters();
  if (!containsBlanks(lettersFromNextWord)) {
    // add letters to the final set, removing duplicates
    lettersFromNextWord.forEach(letter => letters.push(letter));
    const lettersSet = new Set(letters.map(letter => JSON.stringify(letter)));
    const tempArray = Array.from(lettersSet);
    const uniqueLetters = new Set(tempArray.map(letter => JSON.parse(letter)));
    // send the unique letters to be analyzed and filtered
    filter.analyzeWord(Array.from(uniqueLetters));
    // draw squares & apply an event listener
    const row = document.querySelector('div[data-row-sta="active"]');
    row.setAttribute('data-row-sta', 'locked');
    const grid = document.querySelector('#grid')
    if (grid.childElementCount < 6) {
      draw.squares();
      gridEventListener();
    }
  }
}

// build the letters based on the values in each square's attributes
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

// determine current letter index based on which squares have letters in them
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
  const row = document.querySelector('#grid').childElementCount - 1;
  return {letter, row};
}

// BOOLEANS --------------------------------------------------------------------
function canBeAdded(val) {
  const index = getIndex();
  return val >= 'a' && val <= 'z' && index.letter < 5 && index.row < 6;
}

function canBeSubmitted(val) {
  const index = getIndex();
  return val === 'Enter' && index.letter === 5 && index.row < 6;
}

function canBeDeleted(val) {
  const index = getIndex();
  return (val === 'Delete' || val === 'Backspace') && index.letter > 0;
}

// blanks are letters that haven't had their color selected
function containsBlanks(word) {
  const blanks = []
  word.forEach(letter => {
    if (letter.sta === 'blank') blanks.push(letter)
  });
  return blanks.length;
}
