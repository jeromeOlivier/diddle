// to generate

// to generate an array from 1 to 30 === arrayOfNumbers(30);
function arrayOfNumbers(n, array = []) {
  if (n === 0) {
    return array.sort((a, b) => a - b);
  } else {
    array.push(n);
    return arrayOfNumbers(n - 1, array);
  }
}

// to generate an array of 10 question marks === arrayOfFillers(10, "?");
function arrayOfFillers(amount, filler, array = []) {
  if (amount === 0) {
    return array;
  } else {
    array.push(filler);
    return arrayOfFillers(amount - 1, filler, array);
  }
}

export {
  arrayOfNumbers,
  arrayOfFillers,
}
