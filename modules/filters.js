// remove all words with any of the following letters
import * as generate from './generators.js';

function absentLetters(words, letters) {
  const greySet = new Set();
  const greyRule = new RegExp("[" + letters.join("") + "]");
  words.forEach(word => !greyRule.test(word) && greySet.add(word));
  return Array.from(greySet);
}

// keep only words that have letters at the following positions
function correctLetters(words, letters) {
  const goodWords = new Set();
  const regex = new RegExp(letters.join(''));
  words.forEach(word => regex.test(word) && goodWords.add(word));
  return Array.from(goodWords);
}

// exclude all words with any of the  letters
function presentLetters(words, letters) {
  const literals = new Set();
  // extract letter from object and insert it into the regex rule (?=.* )
  letters.forEach(letter =>
    Object.keys(letter).forEach(ltr => literals.add(`(?=.*${ltr})`)));

  const array = Array.from(literals)
  const rules = new RegExp(array.join(""));
  const newSet = new Set();

  if (array.length) {
    words.forEach(word => rules.test(word) && newSet.add(word));
    return Array.from(newSet);
  } else {
    return words;
  }
}

// exclude words with yellow letters at position
function wrongPositions(words, letters) {
  const rules = new Set();
  // generate set of rules
  letters.forEach(letter => {
    Object.keys(letter).forEach(key => {
      const regex = generate.arrayOfFillers(5, '.');
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

// exclude or include duplicate letters (2 or more) at any position
function duplicateLetters(words, condition) {
  const setOfWords = new Set();
  const letter = Object.values(condition)[0]; // TODO: refactor this?
  const boolean = Object.keys(condition)[0]; // TODO: refactor this?
  if (letter) {
    const regex = `[${letter}]{2,}`;
    const rule = new RegExp(regex);
    boolean === 'true' ?
      // if word has more than one instance of condition's value, add to array
      words.forEach(word =>
        rule.test([...word].sort().join('')) && setOfWords.add(word)) :
      // if word DOES NOT contain more than one instance, add to array;
      words.forEach(word =>
        (!rule.test([...word].sort().join(''))) && setOfWords.add(word));
    return Array.from(setOfWords);
  } else {
    return words;
  }
}

function analyzeWord(words) {
  // return false if submition fails, true if it passes
  console.log(words)
}

// if a grey letter IS ALSO green or yellow, remove it from the list
// function removeDuplicates(greyLetters, greenLetters, yellowLetters) {
//   // merge greenLetters & yellowLetters into a set
//   const concatenated = Object.from(...greenLetters, ...yellowLetters);
//   const duplicates = new Set();
//   duplicates.add(Object.keys(concatenated));
//
//   const greySet = new Set(...greyLetters); // remove grey duplicates
//   const uniqueValues = new Set(); // the set that will be returned
//
//   // grey is not a duplicate of either green or yellow? add to uniqueValues
//   greySet.forEach(letter =>
//     !letter.has(duplicates) && uniqueValues.add(letter));
//
//   return Array.from(uniqueValues);
// }

export {
  absentLetters,
  presentLetters,
  wrongPositions,
  correctLetters,
  duplicateLetters,
  analyzeWord,
};
