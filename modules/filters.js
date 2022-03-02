// remove all words with any of the following letters
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
  const literals = [];
  Object.keys(letters).forEach(letter => literals.push(`(?=.*${letter})`));
  if (literals.length) {
    const rules = new RegExp(literals.join(""));
    const newSet = new Set();
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
  Object.keys(letters).forEach(key => {
    const string = ['.', '.', '.', '.', '.'];
    string[letters[key]] = key;
    const rule = new RegExp(string.join(''));
    rules.add(rule);
  });
  // compare array of words to set of rules, add matches to array of badWords
  const badWords = new Set();
  words.forEach(word => rules.forEach(rule => rule.test(word) && badWords.add(word)));
  // if not badWord, add to goodWords
  const goodWords = new Set();
  words.forEach(word => !badWords.has(word) && goodWords.add(word));
  return goodWords;
}

// exclude or include duplicate letters (2 or more) at any position
function duplicateLetters(words, conditions) {
  const setOfWords = new Set();
  if (conditions) {
    conditions.forEach((condition) => {
      const letter = Object.values(condition)[0]; // TODO: refactor this?
      const boolean = Object.keys(condition)[0]; // TODO: refactor this?
      const regex = `[${letter}]{2,}`;
      const rule = new RegExp(regex);
      // if word has more than one instance of condition's value, add to array
      if (boolean === 'true') {
        words.forEach(word => rule.test(word) && setOfWords.add(word));
        // if word DOES NOT contain more than one instance, add to array;
        words.forEach(word => !rule.test(word) && setOfWords.add(word));
      }
    })
  }
  return Array.from(setOfWords);
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
};
