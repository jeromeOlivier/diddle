// filter through the dictionary in five steps doing the following:
// first: remove all words containing grey letters
import * as filter from './filters';
import { dictionary } from './dictionary';
import * as formula from './formulas';

const first = filter.absentLetters(dictionary, formula.absent);
// second: keep only words matching green letters
const second = filter.correctLetters(first, formula.correct);
// third: keep only words containing yellow letters
const third = filter.presentLetters(second, formula.present);
// fourth: remove all words that have letters at yellow positions
const fourth = filter.wrongPositions(third, formula.present);
// fifth: remove all words that either have, or don't have, duplicates
const fifth = filter.duplicateLetters(fourth, formula.duplicates);
// finally, display results
console.log(fifth);

/*
 // display suggestions
 draw.suggestions();
 */
