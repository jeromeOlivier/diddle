import { arrayOfFillers } from './utilities.js';
import { dictionary } from './dictionary.js';

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

// formula generators
function generateDuplicateLettersFormula(words) {
  const duplicates = new Set();
  words.forEach(word => {
    const frequencies = {};
    // if the letter is new, count of 1, else add one to the count
    word.forEach(letter => frequencies[letter.ltr] = (frequencies[letter.ltr] || 0) + 1);
    const aLetterIsRecurrent = removePropertiesWithAValueOfOne(frequencies);
    // if there are recurrent letters, proceed
    if (aLetterIsRecurrent) {
      const duplicateLetters = [];
      Object.keys(aLetterIsRecurrent).forEach(key => duplicateLetters.push(key));
      // process the duplicate(s) to see if it is true or false
      duplicates.add(setBooleanValueForDuplicateLetters(duplicateLetters, word))
    }
  });
  return Array.from(duplicates);
};

function generateCorrectLettersFormula(letters) {
  const formula = arrayOfFillers(5, '.');
  const correctLetters = new Set();
  letters.forEach(letter => letter.sta === 'correct' && correctLetters.add(letter));
  correctLetters.forEach(letter => formula[letter.idx] = letter.ltr);
  return formula;
};

function generatePresentLettersFormula(letters) {
  const formula = new Set();
  const collection = new Set()
  letters.forEach(letter => letter.sta === 'present' && collection.add(letter));
  collection.forEach(letter => {
    const entries = new Map([ [ letter.ltr, letter.idx ] ]);
    formula.add(Object.fromEntries(entries));
  });
  return Array.from(formula);
};

function generateAbsentLettersFormula(letters) {
  // set of all letters marked absent
  const minuend = new Set();
  letters.forEach(letter => {
    if (letter.sta === 'absent') minuend.add(letter.ltr)
  });
  // set of all other letters
  const subtrahend = new Set();
  letters.forEach(letter => {
    if (letter.sta === 'correct' || letter.sta === 'present') subtrahend.add(letter.ltr);
  });
  // letters from subtrahend shouldn't be included since they're present in
  // the final word, this code removes them and returns an array
  return [ ...minuend ].filter(letter => ![ ...subtrahend ].includes(letter));
};

// filters to reduce the dictionary to possible words
function filterAbsentLetters(dictionary, absentLetters) {
  const validWords = new Set();
  const absentRule = new RegExp("[" + absentLetters.join("") + "]");
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
  const array = Array.from(literals)
  const rules = new RegExp(array.join(""));
  console.log(rules)
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
    })
  });
  // compare array of words to set of rules, add matches to array of badWords
  const badWords = new Set();
  words.forEach(word => rules.forEach(rule => rule.test(word) && badWords.add(word)));
  // words.forEach(word => rules.forEach(rule => rule.test(word) && console.log(word)));

  const goodWords = new Set();
  // if not badWord, add to goodWords
  words.forEach(word => !badWords.has(word) && goodWords.add(word));

  return Array.from(goodWords);
}

function filterDuplicateLetters(words, condition) {
  const setOfWords = new Set();
  const letter = Object.keys(condition)[0];
  const boolean = Object.values(condition)[0];
  if (letter) {
    const regex = `[${ letter }]{2,}`;
    const rule = new RegExp(regex);
    boolean === 'true' ?
      // if word has more than one instance of condition's value, add to array
      words.forEach(word =>
        rule.test([ ...word ].sort().join('')) && setOfWords.add(word)) :
      // if word DOES NOT contain more than one instance, add to array;
      words.forEach(word =>
        (!rule.test([ ...word ].sort().join(''))) && setOfWords.add(word));
    return Array.from(setOfWords);
  } else {
    return words;
  }
}

// additional functions
function convertWordsToLetters(words) {
  const letters = new Set();
  words.forEach(wrd => wrd.forEach(ltr => letters.add(JSON.stringify(ltr))))
  const tempArray = Array.from(letters);
  return new Set(tempArray.map(letter => JSON.parse(letter)));
}

function removePropertiesWithAValueOfOne(obj) {
  for (const key in obj) {
    if (obj[key] === 1) delete obj[key]
  }
  return obj;
}

function setBooleanValueForDuplicateLetters(letters, word) {
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
    const entries = new Map([ [ arrayOfObjects[0].ltr, !truth.has(false) ] ]);
    result.add(Object.fromEntries(entries));
  });
  return result;
};
