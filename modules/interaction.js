import * as filter from './filters.js';

const arrayOfChoices = [[]];
let index = 1;

function start() {
  // onscreen keyboard interaction
  const buttons = document.querySelectorAll('.kb-row button');
  buttons.forEach(button => button.onclick = ({target}) => {
    const letter = target.getAttribute("data-key");
    if (letter === 'enter') filter.analyzeLetters(arrayOfChoices);
    else if (letter === 'del') deleteLastLetter();
    else updateGuessedWords(letter);
  });


}

function getCurrentWordArray() {
  const numberOfWords = arrayOfChoices.length;
  return arrayOfChoices[numberOfWords - 1];
}

function updateGuessedWords(letter) {
  const currentWordArr = getCurrentWordArray();
  (currentWordArr && currentWordArr.length < 5) && currentWordArr.push(letter);

  const availableSpaceEl = document.getElementById(String(index));
  index = index + 1;

  availableSpaceEl.textContent = letter.toUpperCase();
}

function deleteLastLetter() {
  const currentWordArr = getCurrentWordArray();
  currentWordArr.pop();

  arrayOfChoices[arrayOfChoices.length - 1] = currentWordArr;
  const lastLetterEl = document.getElementById(String(index - 1));
  lastLetterEl.textContent = "";
  lastLetterEl.className = "square";
  index = index - 1;
}

export {
  start,
}
