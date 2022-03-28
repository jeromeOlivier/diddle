// UTILITIES are helper functions that can be used in different modules

// to generate an array of 10 question marks === arrayOfFillers(10, "?");
export function arrayOfFillers(amount, filler, array = []) {
  if (amount === 0) {
    return array;
  } else {
    array.push(filler);
    return arrayOfFillers(amount - 1, filler, array);
  }
}

// to generate an array from 1 to 30 === arrayOfNumbers(30);
export function arrayOfIndexes(n, array = []) {
  if (n < 0) {
    return array.sort((a, b) => a - b);
  } else {
    array.push(n);
    return arrayOfIndexes(n - 1, array);
  }
}

// blanks are letters that haven't had their color selected
export function containsBlanks(word) {
  const blanks = []
  word.forEach(letter => {
    if (letter.sta === 'blank') blanks.push(letter)
  });
  return blanks.length;
}
