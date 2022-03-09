"use strict";

import {words} from "./modules/words.js";
import * as filter from "./modules/filters.js";
import * as draw from "./modules/draw.js";
import * as generate from "./modules/generators.js";
import * as interaction from "./modules/interaction.js";

document.addEventListener('DOMContentLoaded', () => {

  // draw the interface
  draw.squares();
  draw.keys();

  // initialize interactivity
  interaction.start();

  // const absent = document.querySelectorAll('.absent');
  // const correct = document.querySelectorAll('.correct');
  // const present = document.querySelectorAll('.present');

  const absentSet = ['r', 'a', 'i',];
  const correctSet = ['.', '.', '.', '.', '.'];
  const presentSet = [{'t': 2}, {'o': 4}];
  const duplicate = {};

  // remove all words containing grey letters
  const first = filter.absentLetters(words, absentSet);
  // keep only words matching green letters
  const second = filter.correctLetters(first, correctSet);
  // keep only words containing yellow letters
  const third = filter.presentLetters(second, presentSet);
  // remove all words that have letters at yellow positions
  const fourth = filter.wrongPositions(third, presentSet);
  // remove all words that either have, or don't have, duplicates
  const fifth = filter.duplicateLetters(fourth, duplicate);

  console.log(fifth);

  // display suggestions
  draw.suggestions();


});
