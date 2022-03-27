import { arrayOfFillers } from './utilities.js'

// A filter selects words in the dictionary that have a specific formula. A
// formula is a list of conditions. The filter uses the formula to return a
// list of words from the dictionary.

export function parseLetters(words) {
  // duplicates uses "words" instead of letters since the filter will check if
  // words have, or not, the same letter more than once
  duplicates(words);
  // after duplicates, all other functions just check for letters
  const letters = convertWordsToLetters(words);
  // formula for letters that are in the right spot
  correct(letters);
  // formula for letters that are present in the word
  present(letters);
  // formula for letters that aren't in the word
  absent(letters);
}
// find duplicate letter selections
const duplicates = function (words) {
  const duplicates = new Set();
  words.forEach(word => {
    const frequencies = {};
    // if the letter is new, count of 1, else add one to the count
    word.forEach(letter => frequencies[letter.ltr] = (frequencies[letter.ltr] || 0) + 1);
    const aLetterIsRecurrent = stripSinglesFrom(frequencies);
    // if there are recurrent letters, proceed
    if (aLetterIsRecurrent) {
      const duplicateLetters = [];
      Object.keys(aLetterIsRecurrent).forEach(key => duplicateLetters.push(key));
      // process the duplicate(s) to see if it is true or false
      duplicates.add(validateDuplicates(duplicateLetters, word))
    }
  });
  return Array.from(duplicates);
}

const correct = function (letters) {
  const formula = arrayOfFillers(5, '.');
  const correctLetters = new Set();
  letters.forEach(letter => letter.sta === 'correct' && correctLetters.add(letter));
  correctLetters.forEach(letter => formula[letter.idx] = letter.ltr);
  return formula;
}

const present = function (letters) {
  const formula = new Set();
  const collection = new Set()
  letters.forEach(letter => collection.add(letter));
  collection.forEach(letter => {
    const entries = new Map([[letter.ltr, letter.idx]]);
    formula.add(Object.fromEntries(entries));
  });
  return Array.from(formula);
}

const absent = function generateAbsentFormula(letters) {
  // set of all letters marked absent
  const minuend = new Set();
  letters.forEach(letter => { if (letter.sta === 'absent') minuend.add(letter.ltr) });
  // set of all other letters
  const subtrahend = new Set();
  letters.forEach(letter => {
    if (letter.sta === 'correct' || letter.sta === 'present') subtrahend.add(letter.ltr);
  });
  // letters from subtrahend shouldn't be included since they're present in
  // the final word, this code removes them and returns an array
  return [...minuend].filter(letter => ![...subtrahend].includes(letter));
}

export const answer = new Formulas(correct, present, absent, duplicates);


// PRIVATE FUNCTIONS -----------------------------------------------------------
// constructor for Formulas
function Formulas(correctSet, presentSet, absentSet, duplicates) {
  this.correctSet = correctSet;
  this.presentSet = presentSet;
  this.absentSet = absentSet;
  this.duplicates = duplicates;
}

function stripSinglesFrom(obj) {
  for (const key in obj) {
    if (obj[key] === 1) delete obj[key]
  }
  return obj;
}

function validateDuplicates(letters, word) {
  const result = new Set();
  // store into pairs all objects that contain duplicate letters
  letters.forEach(letter => {
    // generate an array by filtering in matching letters
    const arrayOfObjects = word.filter(ltr => ltr.ltr === letter);
    // collects true and false values
    const truth = new Set();
    // iterate through each object to see if the letter is present or absent
    arrayOfObjects.forEach(obj => truth.add(obj.sta !== 'absent'));
    // build the key value pairs that will be pushed to the set of results
    const entries = new Map([[arrayOfObjects[0].ltr, !truth.has(false)]]);
    result.add(Object.fromEntries(entries));
  });
  return result;
};

/** convert the two dimensional array into a one dimentional array and remove
 * duplicates using a set.
 */
function convertWordsToLetters(words) {
  const letters = new Set();
  words.forEach(wrd => wrd.forEach(ltr => letters.add(JSON.stringify(ltr))))
  const tempArray = Array.from(letters);
  return new Set(tempArray.map(letter => JSON.parse(letter)));
}
