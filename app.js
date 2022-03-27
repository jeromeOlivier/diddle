"use strict";

import * as draw from "./modules/draw.js";
import * as game from "./modules/interaction.js";
import {dictionary} from "./modules/dictionary.js";
import * as filter from "./modules/filters.js";

document.addEventListener('DOMContentLoaded', () => {
  // draw the interface
  draw.squares();
  draw.buttons();
  // initialize user interaction (events) and wait for user input
  game.start();
  // declare all the letter sets for filtering
  const absentSet = ['r', 'a', 't', 'i', 'm', 'n'];
  const correctSet = ['.', '.', '.', '.', 'y'];
  const presentSet = [{'o': 4}, {'o': 2},{'e': 1}, {'r': 2}, {'t': 4}];
  const duplicates = {'a': 'true'}; // todo: make this an array

  // filter through the dictionary in five steps doing the following:
  // first: remove all words containing grey letters
  const first = filter.absentLetters(dictionary, absentSet);
  // second: keep only words matching green letters
  const second = filter.correctLetters(first, correctSet);
  // third: keep only words containing yellow letters
  const third = filter.presentLetters(second, presentSet);
  // fourth: remove all words that have letters at yellow positions
  const fourth = filter.wrongPositions(third, presentSet);
  // fifth: remove all words that either have, or don't have, duplicates
  const fifth = filter.duplicateLetters(fourth, duplicates);

  /*
  // display suggestions
  draw.suggestions();
   */

});
