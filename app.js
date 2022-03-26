"use strict";

import * as draw from "./modules/draw.js";
import * as game from "./modules/interaction.js";
import {dictionary} from "./modules/dictionary.js";
import * as filter from "./modules/filters.js";
import * as formula from './modules/formulas.js';

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

  function triplicate(words) {
    const string = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    const result = [];
    string.forEach(letter => {
      const regex = `[${letter}]{3,}`
      const rule = new RegExp(regex);
      words.forEach(word => rule.test([...word].sort().join('')) && result.push(word));
    });
    return result;
  }


});
