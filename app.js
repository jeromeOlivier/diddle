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

  const absentSet = ['a', 't', 'o', 'm', 's', 'g', 'p', 'd', 'v'];
  const correctSet = ['b', 'r', 'i', '.', 'e'];
  const presentSet = [{'r': 0}, {'i': 3}, {'i': 1}, {'e': 3}, {'r': 4}];
  const duplicate = {'false': 'b'};

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
