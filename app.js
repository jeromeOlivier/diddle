'use strict'

document.addEventListener('DOMContentLoaded', () => {
  import {words} from './modules/words.js';
  import * as filter from './modules/filters.js';
  // import * as draw from './modules/draw.js';

  // draw.generateGrid();

  // const absent = document.querySelectorAll('.absent');
  // const correct = document.querySelectorAll('.correct');
  // const present = document.querySelectorAll('.present');

  // const absentSet = ['a', 't', 'i', 'o', 'b', 'l'];
  // const correctSet = ['r', '.', '.', 'e', '.'];
  // const presentSet = {'e': 1, 'p': 4};

  const absentSet = ['p', 'l'];
  const correctSet = ['.', 'o', '.', '.', 's'];
  const presentSet = {};

  // const invalidLetters = 0;
  // const validPositions = 0;
  // const validLetters = 0;
  // const invalidPositions = 0
  const duplicates = [{false: 'o'}];

  // remove all words containing grey letters
  const first = filter.absentLetters(words, absentSet);
  // keep only words matching green letters
  const second = filter.correctLetters(first, correctSet);
  // keep only words containing yellow letters
  const third = filter.presentLetters(second, presentSet);
  // remove all words that have letters at yellow positions
  const fourth = filter.wrongPositions(third, presentSet);

  const fifth = filter.duplicateLetters(fourth, duplicates);

  console.log(fifth);
})


// const indexes = makeArrayOf(30);
// console.log(indexes);

// const wordsWithLettersAtPositions = words.filter(word => word.charAt(1) === "a");
// const wordContainingLetters = wordsWithLettersAtPositions.filter(word => word.includes("l"));
// const letterNotAtPosition = wordContainingLetters.filter(word => word.charAt(4) !== "l");
// const wordsNotContainLetters = letterNotAtPosition.filter(word => !word.includes("p"));
//
// console.log(wordsNotContainLetters);

// const noBadLettersSet = new Set();
// for (let i = 0; i < noBadLetters.length; i++) {
//   noBadLettersSet.add(noBadLetters[i]);
// }
// const cleaned = Array.from(noBadLettersSet);






