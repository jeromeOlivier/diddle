import {arrayOfIndexes, getIndex} from './utilities';

// the onscreen interface is broken into three sections
const rowsOfSquaresSection = document.querySelector('#rowsOfSquares');
const listOfWordsSection = document.querySelector('#listOfWords');
const onScreenKeyboardSection = document.querySelector('#onScreenKeyboard');

let indexForRowsOfSquares = 0;
export function drawOneRowOfSquares() {
  const row = document.createElement('div');
  row.setAttribute('data-row', `${indexForRowsOfSquares++}`);
  row.setAttribute('data-row-sta', 'active');
  row.className = "row";
  rowsOfSquaresSection.appendChild(row);
  // generate an array from 1 to 5
  const squares = arrayOfIndexes(4);
  // use the array to generate 5 squares
  squares.forEach(square => {
    const cell = document.createElement('div');
    cell.setAttribute('data-idx', `${square}`);
    cell.setAttribute('data-ltr', ' ');
    cell.setAttribute('data-sta', 'blank');
    row.appendChild(cell);
  })
}
export function drawListOfSuggestedWords() {
}
export function drawOnScreenKeyboard() {
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '&#9003;'],
    ['1', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '&#9166;',],
    ['2', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '2', '2', '2',],
  ];
  rows.forEach(row => {
    const kbRow = document.createElement('div');
    kbRow.className = 'kb-row';
    row.forEach(b => {
      const btn = document.createElement('button');
      if (b === '&#9166;') {
        btn.setAttribute('data-btn-value', 'Enter');
        btn.innerHTML = b;
      } else if (b === '&#9003;') {
        btn.setAttribute('data-btn-value', 'Delete');
        btn.innerHTML = b;
      } else if (b === '1') {
        btn.setAttribute('data-btn-value', '1');
      } else if (b === '2') {
        btn.setAttribute('data-btn-value', '2');
      } else {
        btn.setAttribute('data-btn-value', b);
        btn.textContent = b;
      }
      kbRow.appendChild(btn);
    });
    onScreenKeyboardSection.appendChild(kbRow)
  });
}

export function drawOneLetter(letter) {
  const index = getIndex();
  const position = `[data-row="${index.row}"] [data-idx="${index.letter}"]`;
  const cell = document.querySelector(position);
  cell.setAttribute('data-ltr', letter);
  // todo: add animation when letter is added (quick zoom in)
  cell.textContent = letter.toUpperCase();
}
export function eraseOneLetter() {
  // target previous index to delete last letter (current index is always empty)
  const index = getIndex();
  const position = `[data-row="${index.row}"] [data-idx="${index.letter - 1}"]`;
  const cell = document.querySelector(position);
  cell.textContent = "";
  cell.setAttribute('data-ltr', ' ');
  cell.setAttribute('data-sta', 'blank');
}

export function drawSquareColor(square) {
  if (square.getAttribute('data-sta') === 'blank') {
    square.setAttribute('data-sta', 'absent');
  } else if (square.getAttribute('data-sta') === 'absent') {
    square.setAttribute('data-sta', 'present');
  } else if (square.getAttribute('data-sta') === 'present') {
    square.setAttribute('data-sta', 'correct');
  } else {
    square.setAttribute('data-sta', 'absent')
  }
}
