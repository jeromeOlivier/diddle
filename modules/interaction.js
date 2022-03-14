import * as filter from './filters.js';
import * as draw from './draw.js';
import * as gen from './generators.js'

const words = [];
const ltr = {'idx': 0, 'ltr': '', 'sta': ''}

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

// HELPER FUNCTIONS ------------------------------------------------------------
// check conditions after a key or button event is triggered
function checkEvent(val) {
  if (canAdd(val)) return addLetter(val);
  if (canSubmit(val)) return submitWord();
  if (canDelete(val)) return deleteLetter();
}

function constructWord() {
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

// add letter to the word and print it to the screen
function addLetter(letter) {
  // draw letter on screen
  const index = gen.next(currentIndex());
  const position = `[data-row="${words.length}"] [data-idx="${index}"]`;
  const cell = document.querySelector(position);
  cell.setAttribute('data-ltr', letter);
  cell.textContent = letter.toUpperCase();
}

// delete letter from the word and remove it from the screen
function deleteLetter() {
  const index = currentIndex();
  const position = `[data-row="${words.length}"] [data-idx="${index}"]`;
  console.log(position)
  const cell = document.querySelector(position);
  cell.textContent = "";
  cell.setAttribute('data-ltr', ' ');
  cell.setAttribute('data-sta', 'blank');
}

// if word is complete, analyze it (returning suggestions) and draw more squares
function submitWord() {
  const word = constructWord();
  if (!containsBlanks(word)) {
    // process word
    words.push(word);
    filter.analyzeWord(words);
    // draw a fresh row of squares if there are less than 6
    if (words.length < 6) draw.squares();
  }
}

function currentIndex() {
  let index = undefined;
  const squares = document.querySelector('div.row:last-child').childNodes;
  squares.forEach(square => {
    const idx = Number(square.getAttribute('data-idx'));
    const letter = square.getAttribute('data-ltr');
    if (letter !== ' ') index = idx;
  });
  return index === undefined ? -1 : index;
}

// BOOLEANS
function canAdd(val) {
  const word = constructWord();
  return val >= 'a' && val <= 'z' && word.length < 5 && words.length < 6;
}

function canSubmit(val) {
  const word = constructWord();
  return val === 'Enter' && word.length === 5 && words.length < 6;
}

function canDelete(val) {
  const word = constructWord();
  return (val === 'Delete' || val === 'Backspace') && word.length > 0;
}

function containsBlanks(word) {
  const blanks = []
  word.forEach(letter => {
    console.log(letter.sta);
    if (letter.sta === 'blank') blanks.push(letter)
  });
  return blanks;
}

export {
  start,
}
