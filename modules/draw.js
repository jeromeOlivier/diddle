import * as generate from './generators.js';

const grid = document.querySelector('#grid');
const words = document.querySelector('#words');
const keyboard = document.querySelector('#keyboard');

function squares() {
  const rows = generate.arrayOfNumbers(6)
  const cols = generate.arrayOfNumbers(5);
  let iterator = 1;
  rows.forEach(row => {
    const thisRow = document.createElement('div')
    thisRow.id = `row${row}`;
    thisRow.className = "row"
    grid.appendChild(thisRow);
    cols.forEach(col => {
      const cell = document.createElement('div');
      cell.id = `${iterator++}`;
      cell.setAttribute('data-index', `${col - 1}`)
      cell.className = "square";
      cell.addEventListener('click', colorToggle);
      thisRow.appendChild(cell);
    })
  })
}

function colorToggle() {
  if (this.textContent !== '') {
    if (this.getAttribute('class') === 'square') {
      this.setAttribute('class', 'square grey');
    } else if (this.getAttribute('class') === 'square grey') {
      this.setAttribute('class', 'square yellow');
    } else if (this.getAttribute('class') === 'square yellow') {
      this.setAttribute('class', 'square green');
    } else {
      this.setAttribute('class', 'square grey');
    }
  }
}

function suggestions() {
}

function keys() {
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '&#9003;'],
    ['1', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '&#9166;',],
    ['2', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '2', '2', '2'],
  ];
  rows.forEach(row => {
    const kbRow = document.createElement('div');
    kbRow.className = 'kb-row';
    row.forEach(key => {
      const btn = document.createElement('button');
      if (key === '&#9166;') {
        btn.setAttribute('data-key', 'enter');
        btn.innerHTML = key;
      } else if (key === '&#9003;') {
        btn.setAttribute('data-key', 'del');
        btn.innerHTML = key;
      } else if (key === '1') {
        btn.setAttribute('data-key', 'single');
      } else if (key === '2') {
        btn.setAttribute('data-key', 'double');
      } else {
        btn.setAttribute('data-key', key);
        btn.textContent = key;
      }
      kbRow.appendChild(btn);
    });
    keyboard.appendChild(kbRow)
  });
}

// function toggleSquareColor() {
//   const buttons = document.querySelectorAll('.row button');
//   buttons.forEach(button => {
//     const btn = button.id;
//     document.querySelector(btn).addEventListener('click', colorToggle);
//   })
// }

export {
  squares,
  suggestions,
  keys,
  // toggleSquareColor,
}
