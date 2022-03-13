import * as filter from './filters.js';
import * as draw from './draw.js';

const words = [];
const word = [];

function start() {
  // event listener for user keyboard interaction (keys)
  window.addEventListener('keydown', e => {
    const val = e.key;
    checkEvent(val);
  });

  // event listener for onscreen keyboard interaction (buttons)
  const buttons = document.querySelectorAll('.kb-row button');
  buttons.forEach(button =>
    button.addEventListener('click', () => {
      const val = button.getAttribute("data-btn-value");
      checkEvent(val);
    }));

  // event listener for current active row of squares
  const squares = document.querySelector('div.row:last-child').childNodes;
  squares.forEach(square =>
    square.addEventListener('click', () => {
      const content = square.getAttribute("data-ltr");
      // const status = square.getAttribute("data-sta");
      if (content !== ' ') {
        draw.toggleStatus(square);
      }
    }))
}

// HELPER FUNCTIONS ***
// check conditions after a key or button event is triggered
function checkEvent(val) {
  if (canAdd(val)) return addLetter(val);
  if (canSubmit(val)) return submitWord(word);
  if (canDelete(val)) return deleteLetter();
}

// add letter to the word and print it to the screen
function addLetter(letter) {
  // draw letter on screen
  const position = `[data-row="${words.length}"] [data-idx="${word.length}"]`;
  const cell = document.querySelector(position);
  cell.setAttribute('data-ltr', letter);
  cell.textContent = letter.toUpperCase();
  // add letter to word
  const formedLetter = formLetter(letter)
  return word.push(formedLetter);
}

// each letter has 3 attributes: position, letter and status (default is square)
function formLetter(letter) {
  return {'idx': word.length, 'ltr': letter, 'sta': 'blank'}
}

// if word is complete, analyze it (returning suggestions) and draw more squares
function submitWord(word) {
  if (containsNoBlanks(word)) {
    // lock current row
    // const position = `[data-row="${words.length}"]`;
    // const row = document.querySelector(position);
    // row.setAttribute('data-row-sta', 'locked');
    if (words.length < 6) draw.squares();
    // process words

    words.push(word);
    filter.analyzeWord(words);
    word.forEach(() => word.pop());
  } else {
    console.log("peanuts")
  }
}

// delete letter from the word and remove it from the screen
function deleteLetter() {
  word.pop();
  const position = `[data-row="${words.length}"] [data-idx="${word.length}"]`;
  const cell = document.querySelector(position);
  cell.textContent = "";
  cell.setAttribute('data-ltr', ' ');
  cell.setAttribute('data-sta', 'blank');
}

// BOOLEANS
function canAdd(val) {
  return val >= 'a' && val <= 'z' && word.length < 5 && words.length < 6;
}

function canSubmit(val) {
  return val === 'Enter' && word.length === 5 && words.length < 6;
}

function canDelete(val) {
  return val === 'Delete' || val === 'Backspace' && word.length > 0;
}

function containsNoBlanks(word) {
  const blanks = [];
  word.forEach(letter => {
    console.log(letter.sta);
    // if (letter.sta === 'blank') blanks.push(letter)
  });
  console.log(blanks.length)
  return !blanks;
}

export {
  start,
  word,
}
