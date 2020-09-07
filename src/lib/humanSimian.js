const validateHorizontalDirection = (generalAccumulatorObj, dna) => {
  let acumulator = {
    A: 0,
    T: 0,
    C: 0,
    G: 0,
  };

  const matchesCombinationByLetter = {};

  for (const combination of dna) {
    for (const letter of combination) {
      acumulator[letter]++;
      if (!matchesCombinationByLetter[letter]) {
        matchesCombinationByLetter[letter] = 0;
      }

      if (acumulator[letter] > 0 && acumulator[letter] % 4 === 0) {
        matchesCombinationByLetter[letter]++;
        generalAccumulatorObj.totalSimians++;
        generalAccumulatorObj.isSimian = true;
      }
    }
    acumulator = {
      A: 0,
      T: 0,
      C: 0,
      G: 0,
    };
  }
  generalAccumulatorObj.directions.horizontal = matchesCombinationByLetter;
};

const validateVerticalDirection = (generalAccumulatorObj, dna) => {
  let acumulator = {
    A: 0,
    T: 0,
    C: 0,
    G: 0,
  };

  const matchesCombinationByLetter = {};
  const combinationLimit = dna.length - 1;

  for (const [line, combination] of dna.entries()) {
    for (const [letterIndex, letter] of combination.split('').entries()) {
      if (!matchesCombinationByLetter[letter]) {
        matchesCombinationByLetter[letter] = 0;
      }

      const minimumMatchCount = line + 3;
      if (minimumMatchCount <= combinationLimit) {
        if (letter === dna[line + 1][letterIndex]) {
          acumulator[letter]++;
        }
        for (let i = line + 1; i <= minimumMatchCount; i++) {
          if (letter === dna[i][letterIndex]) {
            acumulator[letter]++;
          }

          if (acumulator[letter] > 0 && acumulator[letter] % 4 === 0) {
            matchesCombinationByLetter[letter]++;
            generalAccumulatorObj.totalSimians++;
            generalAccumulatorObj.isSimian = true;
          }
        }
      }
      acumulator = {
        A: 0,
        T: 0,
        C: 0,
        G: 0,
      };
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

  let acumulator = {
    A: 0,
    T: 0,
    C: 0,
    G: 0,
  };

  const matchesCombinationByLetter = {};
  const combinationLimit = dna.length - 1;

  for (const [line, combination] of dna.entries()) {
    for (const [letterIndex, letter] of combination.split('').entries()) {
      if (!matchesCombinationByLetter[letter]) {
        matchesCombinationByLetter[letter] = 0;
      }

      const minimumMatchCount = line + 3;
      if (minimumMatchCount <= combinationLimit) {
        if (
          letter === dna[line + 1][letterIndex + 1] &&
          letter === dna[line + 2][letterIndex + 2] &&
          letter === dna[line + 3][letterIndex + 3]
        ) {
          acumulator[letter] = 4;
        }

        if (acumulator[letter] > 0 && acumulator[letter] % 4 === 0) {
          matchesCombinationByLetter[letter]++;
          generalAccumulatorObj.totalSimians++;
          generalAccumulatorObj.isSimian = true;
        }
      }
      acumulator = {
        A: 0,
        T: 0,
        C: 0,
        G: 0,
      };
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
