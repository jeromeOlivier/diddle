// the interface has three main sections
// the grid holds the squares that display the letters
const grid = document.querySelector('#grid');
// the list holds the words that the app suggests
const list = document.querySelector('#words');
// the keyboard holds the virtual onscreen keyboard
const keyboard = document.querySelector('#keyboard');
let rowIndex = 0;

// draw one row of squares on screen, set its attributes and append to grid div
function squares() {
  const row = document.createElement('div');
  row.setAttribute('data-row', `${rowIndex++}`);
  row.setAttribute('data-row-sta', 'active');
  row.className = "row";
  grid.appendChild(row);
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

function toggleStatus(square) {
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

function suggestions() {
}

function buttons() {
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
    keyboard.appendChild(kbRow)
  });
}

// HELPER FUNCTIONS ------------------------------------------------------------
// to generate an array from 1 to 30 === arrayOfNumbers(30);
function arrayOfIndexes(n, array = []) {
  if (n < 0) {
    return array.sort((a, b) => a - b);
  } else {
    array.push(n);
    return arrayOfIndexes(n - 1, array);
  }
}

export {
  squares,
  suggestions,
  buttons,
  toggleStatus,
}
