"use strict";

import * as draw from "./modules/draw.js";
import * as interaction from "./modules/interaction.js";
import {dictionary} from "./modules/dictionary.js";
import * as filter from "./modules/filters.js";
// import * as generate from "./modules/generators.js";

document.addEventListener('DOMContentLoaded', () => {
  // draw the interface
  draw.squares();
  draw.buttons();
  // initialize interactivity
  interaction.start();
  // declare all the letter sets for filtering
  const absentSet = ['r', 'i', 'o', 'l'];
  const correctSet = ['.', 'a', 't', 'c', 'h'];
  const presentSet = [];
  const duplicate = {};

  // remove all words containing grey letters
  const first = filter.absentLetters(dictionary, absentSet);
  // keep only words matching green letters
  const second = filter.correctLetters(first, correctSet);
  // keep only words containing yellow letters
  const third = filter.presentLetters(second, presentSet);
  // remove all words that have letters at yellow positions
  const fourth = filter.wrongPositions(third, presentSet);
  // remove all words that either have, or don't have, duplicates
  const fifth = filter.duplicateLetters(fourth, duplicate);

  console.log(fifth);

  /*
  // display suggestions
  draw.suggestions();
   */

});
