import * as generate from './generators.js';

const grid = document.querySelector('#grid');
const submit = document.querySelector('#submit');
const words = document.querySelector('#words');

function generateGrid() {
  const rows = generate.arrayOfNumbers(6)
  const cols = generate.arrayOfNumbers(5);
  rows.forEach(row => {
    const thisRow = document.createElement('div')
    thisRow.id = `row${row}`;
    grid.appendChild(thisRow);
    cols.forEach(col => {
      const cell = document.createElement('div');
      cell.id = `cell${col}`;
      thisRow.appendChild(cell);
    })
  })
}

export {
  generateGrid,
}
