const validateHorizontalDirection = (generalAccumulatorObj, dna) => {
  let accumulator = {
    A: 0,
    T: 0,
    C: 0,
    G: 0,
  };

  const matchesCombinationByLetter = {};

  for (const combination of dna) {
    for (const [letterIndex, letter] of combination.split('').entries()) {
      if (letterIndex === 0) {
        accumulator[letter]++;
      } else if (combination[letterIndex - 1] === letter) {
        accumulator[letter]++;
      } else {
        accumulator[letter] = 1;
      }
      if (!matchesCombinationByLetter[letter]) {
        matchesCombinationByLetter[letter] = 0;
      }

      if (accumulator[letter] > 0 && accumulator[letter] % 4 === 0) {
        matchesCombinationByLetter[letter]++;
        accumulator[letter] = 0;
        generalAccumulatorObj.totalSimians++;
        generalAccumulatorObj.isSimian = true;
      }
    }
    accumulator = {
      A: 0,
      T: 0,
      C: 0,
      G: 0,
    };
  }
  generalAccumulatorObj.directions.horizontal = matchesCombinationByLetter;
};

const validateVerticalDirection = (generalAccumulatorObj, dna) => {
  const matchesCombinationByLetter = {};
  const accumulator = {};

  dna.forEach(
    (combination, letterIndex) =>
      (accumulator[letterIndex] = {
        A: 0,
        T: 0,
        C: 0,
        G: 0,
      })
  );

  for (const [line, combination] of dna.entries()) {
    for (const [letterIndex, letter] of combination.split('').entries()) {
      if (line === 0 && accumulator[letterIndex][letter] === 0) {
        accumulator[letterIndex][letter]++;
      } else if (line !== 0 && letter === dna[line - 1][letterIndex]) {
        accumulator[letterIndex][letter]++;
      } else {
        accumulator[letterIndex][letter] = 1;
      }

      if (!matchesCombinationByLetter[letter]) {
        matchesCombinationByLetter[letter] = 0;
      }

      if (
        accumulator[letterIndex][letter] > 0 &&
        accumulator[letterIndex][letter] % 4 === 0
      ) {
        matchesCombinationByLetter[letter]++;
        accumulator[letterIndex][letter] = 0;
        generalAccumulatorObj.totalSimians++;
        generalAccumulatorObj.isSimian = true;
      }
    }
  }
  generalAccumulatorObj.directions.vertical = matchesCombinationByLetter;
};

const validateDiagonalDirection = (
  generalAccumulatorObj,
  dna,
  reverse = false
) => {
  if (reverse) {
    dna = dna.map((combination) => combination.split('').reverse().join(''));
  }

  let accumulator = {
    A: 0,
    T: 0,
    C: 0,
    G: 0,
  };

  const matchesCombinationByLetter = {};

  for (const [line, combination] of dna.entries()) {
    for (const [letterIndex, letter] of combination.split('').entries()) {
      if (!matchesCombinationByLetter[letter]) {
        matchesCombinationByLetter[letter] = 0;
      }

      if (line === 0) {
        accumulator[letter]++;
      } else if (line !== 0 && letter === dna[line - 1][letterIndex + 1]) {
        accumulator[letter]++;
      } else {
        accumulator[letter] = 1;
      }

      if (accumulator[letter] > 0 && accumulator[letter] % 4 === 0) {
        matchesCombinationByLetter[letter]++;
        accumulator[letter] = 0;
        generalAccumulatorObj.totalSimians++;
        generalAccumulatorObj.isSimian = true;
      }
    }
  }

  if (reverse) {
    for (const letter in matchesCombinationByLetter) {
      if (matchesCombinationByLetter[letter] > 0) {
        generalAccumulatorObj.directions.diagonal[letter] +=
          matchesCombinationByLetter[letter];
      }
    }
  } else {
    generalAccumulatorObj.directions.diagonal = matchesCombinationByLetter;
  }
};

export default {
  validateHorizontalDirection,
  validateVerticalDirection,
  validateDiagonalDirection,
};
