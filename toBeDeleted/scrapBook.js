// // to generate
//
// // to generate an array from 1 to 30 === arrayOfNumbers(30);
// function arrayOfIndexes(n, array = []) {
//   if (n < 0) {
//     return array.sort((a, b) => a - b);
//   } else {
//     array.push(n);
//     return arrayOfIndexes(n - 1, array);
//   }
// }
//
// // to generate an array of 10 question marks === arrayOfFillers(10, "?");
// function arrayOfFillers(amount, filler, array = []) {
//   if (amount === 0) {
//     return array;
//   } else {
//     array.push(filler);
//     return arrayOfFillers(amount - 1, filler, array);
//   }
// }
//
// function incrementBy(number, value) {
//   return number + value;
// }
//
// function increment(value) {
//   return value + 1;
// }
//
// function decrement(value) {
//   return value - 1;
// }
//
// export {
//   arrayOfIndexes,
//   arrayOfFillers,
//   incrementBy,
//   increment,
//   decrement,
// }

// function triplicate(words) {
//   const string = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
//   const result = [];
//   string.forEach(letter => {
//     const regex = `[${letter}]{3,}`
//     const rule = new RegExp(regex);
//     words.forEach(word => rule.test([...word].sort().join('')) && result.push(word));
//   });
//   return result;
// }