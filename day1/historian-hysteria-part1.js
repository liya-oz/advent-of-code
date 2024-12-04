// --- Day 1: Historian Hysteria ---
//              (part 1)

const fs = require('fs');
const path = require('path');

// Extracting numbers
function extractNumbers(inputString) {
  const numbers = inputString.match(/\d+/g);
  return numbers ? numbers.map(Number) : [];
}

const filePath = path.join(__dirname, 'numbers.txt');
try {
  const data = fs.readFileSync(filePath, 'utf8');

  const result = extractNumbers(data);

  function separateNumbers(numbers) {
    const column1 = [];
    const column2 = [];

    for (let i = 0; i < numbers.length; i++) {
      // filters array of numbers even and odd indexes in two columns
      if (i % 2 === 0) {
        column1.push(numbers[i]);
      } else {
        column2.push(numbers[i]);
      }
    }
    return { column1, column2 };
  }

  const { column1, column2 } = separateNumbers(result);

  // Solution
  function sortNumbersAscending() {
    return function (array) {
      return [...array].sort((a, b) => a - b);
    };
  }

  const sortedColumn1 = sortNumbersAscending()(column1);
  const sortedColumn2 = sortNumbersAscending()(column2);

  function sumTotalDifference(array1, array2) {
    let totalDifference = 0;

    for (let i = 0; i < array1.length; i++) {
      totalDifference += Math.abs(array1[i] - array2[i]);
    }

    return totalDifference;
  }

  console.log(sumTotalDifference(sortedColumn1, sortedColumn2));
} catch (err) {
  console.error('Error during reading file:', err);
}
