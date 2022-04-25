import { arrayOfFillers } from './utilities.js';
import { dictionary } from './dictionary.js';

// EXECUTIONS ------------------------------------------------------------------
export function runAllFilters(words) {
  // duplicate letters are established using the submitted words
  const duplicateLetters = generateDuplicateLettersFormula(words);
  // all other filters need to have the words converted into an list of letters
  const letters = convertWordsToLetters(words);
  // generate all of the formulas before running them through the filters
  const correctLetters = generateCorrectLettersFormula(letters);
  const presentLetters = generatePresentLettersFormula(letters);
  const absentLetters = generateAbsentLettersFormula(letters);
  // with all the formulas generated, run through the filters in sequence,
  // reducing the list of words with each pass
  const firstPass = filterAbsentLetters(dictionary, absentLetters);
  const secondPass = filterCorrectLetters(firstPass, correctLetters);
  const thirdPass = filterPresentLetters(secondPass, presentLetters);
  const fourthPass = filterWrongPositions(thirdPass, presentLetters);
  return filterDuplicateLetters(fourthPass, duplicateLetters);
}

// FORMULAS --------------------------------------------------------------------
function generateDuplicateLettersFormula(words) {
  // words is a two dimensional array of objects
  const duplicates = new Set();
  words.forEach(word => { // word is an object array
    const frequencies = {};
    // if the letter is new, count of 1, else add one to the count
    word.forEach(letter => frequencies[letter.ltr] = (frequencies[letter.ltr] || 0) + 1);
    const aLetterIsRecurrent = removePropertiesWithAValueOfOne(frequencies);
    // if there are recurrent letters, proceed
    if (aLetterIsRecurrent) {
      const duplicateLetters = [];
      Object.keys(aLetterIsRecurrent).forEach(key => duplicateLetters.push(key));
      // process the duplicate(s) to determine boolean value(s)
      duplicates.add(setBooleanValueForDuplicateLetters(duplicateLetters, word));
    }
  });
  return Array.from(duplicates)[0];
}

function generateCorrectLettersFormula(letters) {
  const formula = arrayOfFillers(5, '.');
  const correctLetters = new Set();
  letters.forEach(letter => letter.sta === 'correct' && correctLetters.add(letter));
  correctLetters.forEach(letter => formula[letter.idx] = letter.ltr);
  return formula;
}

function generatePresentLettersFormula(letters) {
  const formula = new Set();
  const collection = new Set();
  letters.forEach(letter => letter.sta === 'present' && collection.add(letter));
  collection.forEach(letter => formula.add({ [letter.ltr]: letter.idx }));
  return Array.from(formula);
}

function generateAbsentLettersFormula(letters) {
  // set of all letters marked absent
  const minuend = new Set();
  letters.forEach(letter => {
    if (letter.sta === 'absent') minuend.add(letter.ltr);
  });
  // set of all other letters
  const subtrahend = new Set();
  letters.forEach(letter => {
    if (letter.sta === 'correct' || letter.sta === 'present') subtrahend.add(letter.ltr);
  });
  // letters from subtrahend shouldn't be included since they're present in
  // the final word, this code removes them and returns an array
  return [ ...minuend ].filter(letter => ![ ...subtrahend ].includes(letter));
}

// FILTERS ---------------------------------------------------------------------
function filterAbsentLetters(dictionary, absentLetters) {
  const validWords = new Set();
  const absentRule = new RegExp('[' + absentLetters.join('') + ']');
  dictionary.forEach(word => !absentRule.test(word) && validWords.add(word));
  return Array.from(validWords);
}

function filterCorrectLetters(words, letters) {
  const validWords = new Set();
  const regex = new RegExp(letters.join(''));
  words.forEach(word => regex.test(word) && validWords.add(word));
  return Array.from(validWords);
}

function filterPresentLetters(words, letters) {
  const literals = new Set();
  // extract letter from object and insert it into the regex rule (?=.* )
  letters.forEach(letter =>
    Object.keys(letter).forEach(ltr => literals.add(`(?=.*${ ltr })`)));
  const array = Array.from(literals);
  const rules = new RegExp(array.join(''));
  const newSet = new Set();

  if (array.length) {
    words.forEach(word => rules.test(word) && newSet.add(word));
    return Array.from(newSet);
  } else {
    return words;
  }
}

function filterWrongPositions(words, letters) {
  const rules = new Set();
  // generate set of rules
  letters.forEach(letter => {
    Object.keys(letter).forEach(key => {
      const regex = arrayOfFillers(5, '.');
      regex[letter[key]] = key;
      const rule = new RegExp(regex.join(''));
      rules.add(rule);
    });
  });
  // compare array of words to set of rules, add matches to array of badWords
  const badWords = new Set();
  words.forEach(word => rules.forEach(rule => rule.test(word) && badWords.add(word)));
  // if not badWord, add to goodWords
  const goodWords = new Set();
  words.forEach(word => !badWords.has(word) && goodWords.add(word));
  return Array.from(goodWords);
}

function filterDuplicateLetters(words, conditions) {
  const setUp = checkSetUp(conditions);
  console.log(setUp);
  if (setUp === 'none') return words;
  const setOfWords = new Set();
  const secondary = new Set();
  if (setUp === 'single') {
    conditions.forEach(condition => {
      const letter = Object.keys(condition)[0];
      console.log(letter);
      const boolean = Object.values(condition)[0];
      console.log(boolean);
      const regex = `[${ letter }]{2,}`;
      const rule = new RegExp(regex);
      if (boolean === true) {
        words.forEach(word => rule.test([ ...word ].sort().join('')) && setOfWords.add(word));
      } else {
        // if only false, copy all words to set, then remove those that are true
        words.forEach(word => setOfWords.add(word));
        words.forEach(word => rule.test([ ...word ].sort().join('')) && setOfWords.delete(word));
      }
    });
    return setOfWords;
  }
  if (setUp === 'mixed') {
    conditions.forEach(condition => {
      const letter = Object.keys(condition)[0];
      const boolean = Object.values(condition)[0];
      const regex = `[${ letter }]{2,}`;
      const rule = new RegExp(regex);
      if (boolean === true) {
        words.forEach(word =>
          (rule.test([ ...word ].sort().join(''))) && secondary.add(word));
      } else {
        secondary.forEach(word => {
          (!rule.test([ ...word ].sort().join(''))) && setOfWords.add(word);
        });
      }
      console.log(setOfWords);
    });
    return setOfWords;
  }
}

// FORMULA HELPERS -------------------------------------------------------------
function convertWordsToLetters(words) {
  const letters = new Set();
  words.forEach(wrd => wrd.forEach(ltr => letters.add(JSON.stringify(ltr))));
  const tempArray = Array.from(letters);
  return new Set(tempArray.map(letter => JSON.parse(letter)));
}

function removePropertiesWithAValueOfOne(obj) {
  for (const key in obj) {
    if (obj[key] === 1) delete obj[key];
  }
  return obj;
}

function setBooleanValueForDuplicateLetters(letters, word) {
  const result = new Set();
  // store into pairs all objects that contain duplicate letters
  letters.forEach(letter => {
    // generate array by filtering matching letters (stitch object to letter)
    const arrayOfObjects = word.filter(ltr => ltr.ltr === letter);
    // collects true and false values
    const truth = new Set();
    // iterate through each object to see if the letter is present or absent
    arrayOfObjects.forEach(obj => truth.add(obj.sta !== 'absent'));
    // build the key value pairs that will be pushed to the set of results
    const entries = new Map([ [ arrayOfObjects[0].ltr, !truth.has(false) ] ]);
    result.add(Object.fromEntries(entries));
  });
  // sort set to start with all trues and end with falses
  const tempArray = Array.from(result);
  if (tempArray <= 1) {
    return tempArray[0];
  } else {
    return tempArray.sort(() => {
      return (Number(Object.values(tempArray[0])[0]) - Number(Object.values(tempArray[1])[0]));
    });
  }
}

// FILTER HELPERS --------------------------------------------------------------
// return any word matching the rule
function testWords(rule, words) {
  return words.forEach(word => rule.test([ ...word ].sort().join('')) && word);
}

// check if booleans are all true, all false, mixed, single, or none
function checkSetUp(conditions) {
  let bools = [];
  if (conditions.length > 1) {
    for (let i = 0; i < conditions.length; i++) {
      bools.push(Object.values(conditions[i])[0]);
    }
    if (bools[0] !== bools[1]) {
      return 'mixed';
    } else {
      return 'single';
    }
  } else if (conditions.length === 1) {
    return 'single';
  } else {
    return 'none';
  }
}

///*
//  conditions[0].forEach(condition => {
//  const letter = Object.keys(condition)[0];
//  const boolean = Object.values(condition)[0];
//  if (conditions[0] > 1) { // if there is more than one duplicate
//  if (boolean === 'true') {
//  // if word has more than one instance of condition's value, add to array
//  setOfWords.add(testWords(rule, words));
//  } else {
//  // if word DOES NOT contain more than one instance, add to array;
//  setOfWords.forEach(word => (rule.test([ ...word ].sort().join(''))) && setOfWords.delete(word));
//  }
//  return Array.from(setOfWords);
//  }
//  if (conditions[0] === 1) {
//  if (boolean === 'true') {
//  // if only true, add words to set that are true
//  setOfWords.add(testWords(rule, words));
//  } else {
//  // if only false, copy all words to set, then remove those that are true
//  words.forEach(word => setOfWords.add(word));
//  setOfWords.delete(testWords(rule, words));
//  }
//  }
//  });
//  return conditions[0] ? Array.from(setOfWords) : words;
//  }
//  */
