// --- Day 1: Historian Hysteria ---
//              (part 2)

const fs = require('fs');
const path = require('path');

// Extracting numbers from a string
function extractNumbers(inputString) {
  const numbers = inputString.match(/\d+/g);
  return numbers ? numbers.map(Number) : [];
}

const filePath = path.join(__dirname, 'numbers.txt');
try {
  const data = fs.readFileSync(filePath, 'utf8');
  const numbers = extractNumbers(data);

  function separateNumbers(numbers) {
    const column1 = [];
    const column2 = [];

    for (let i = 0; i < numbers.length; i++) {
      // Separating numbers into two columns based on even and odd indexes
      if (i % 2 === 0) {
        column1.push(numbers[i]);
      } else {
        column2.push(numbers[i]);
      }
    }
    return { column1, column2 };
  }

  const { column1, column2 } = separateNumbers(numbers);

                       // Solution
  const getNumberFrequency = (column1, column2) => {
    const result = {};
    column1.forEach((num) => {
      const count = column2.filter((number) => number === num).length;
      result[num] = count;
    });
    return result;
  };

  const frequencyResult = getNumberFrequency(column1, column2);

  let totalSimilarityScore = 0;
  for (const num in frequencyResult) {
    totalSimilarityScore += num * frequencyResult[num];
  }
