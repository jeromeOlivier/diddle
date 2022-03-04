"use strict";

import {words} from "./modules/words.js";
import * as filter from "./modules/filters.js";
import * as draw from "./modules/draw.js";
// import * as generate from "./modules/generators.js";
// import * as input from "./modules/interaction.js";

document.addEventListener('DOMContentLoaded', () => {

  // draw the interface
  draw.squares();
  draw.keys();

  // INTERACTION ---------------------------------------------------------------

  // word logic
  const arrayOfChoices = [[]];
  let index = 1;

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

  // keyboard interaction
  const buttons = document.querySelectorAll('.kb-row button');
  buttons.forEach(button => button.onclick = ({target}) => {
    const letter = target.getAttribute("data-key");
    if (letter === 'enter') filter.analyzeLetters(arrayOfChoices);
    else if (letter === 'del') deleteLastLetter();
    else updateGuessedWords(letter);
  });

  function deleteLastLetter() {
    const currentWordArr = getCurrentWordArray();
    currentWordArr.pop();

    arrayOfChoices[arrayOfChoices.length - 1] = currentWordArr;
    const lastLetterEl = document.getElementById(String(index - 1));
    lastLetterEl.textContent = "";
    lastLetterEl.className = "square";
    index = index - 1;
  }

  // ---------------------------------------------------------------------------

  // const absent = document.querySelectorAll('.absent');
  // const correct = document.querySelectorAll('.correct');
  // const present = document.querySelectorAll('.present');

  const absentSet = ['a', 't', 'i', 'o', 'b', 'l'];
  const correctSet = ['r', '.', '.', 'e', '.'];
  const presentSet = [{'e': 1},];
  const duplicates = [{true: 'e'}];

  // remove all words containing grey letters
  const first = filter.absentLetters(words, absentSet);
  // keep only words matching green letters
  const second = filter.correctLetters(first, correctSet);
  // keep only words containing yellow letters
  const third = filter.presentLetters(second, presentSet);
  // remove all words that have letters at yellow positions
  const fourth = filter.wrongPositions(third, presentSet);
  // remove all words that either have, or don't have, duplicates
  const fifth = filter.duplicateLetters(fourth, duplicates);

  console.log(third);

  // display suggestions
  draw.suggestions();


});
