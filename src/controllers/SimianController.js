import Metrics from '../models/Metrics';
import Sequelize from 'sequelize';
import logger from '../lib/logger';

const processDna = async (req, res) => {
  try {
    const dna = req.body.dna.map((combination) =>
      combination.toString().toUpperCase()
    );

    const simian = isSimian(dna);

    await Metrics.create({
      is_simian: simian,
    });

    if (simian) {
      res.status(200).json({
        simian: true,
      });
    } else {
      res.status(403).json({
        simian: false,
      });
    }
  } catch (e) {
    logger.error(e.message);
    res.status(500).json({
      message: 'Ops houve um problema, entre em contato com o administrador.',
    });
  }
};

const isSimian = (dna) => {
  let simian = false;
  let matchHorizontal = false;
  let matchVertical = false;
  let matchDiagonal = false;

  for (const [line, combination] of dna.entries()) {
    if (simian) break;
    for (const [positionCaracter, caracter] of combination
      .split('')
      .entries()) {
      matchHorizontal = equalNextCaracterHorizontal(
        positionCaracter,
        combination
      );

      matchVertical = equalNextCaracterVertical(
        dna,
        line,
        positionCaracter,
        combination
      );

      matchDiagonal = equalNextCaracterDiagonal(
        dna,
        line,
        positionCaracter,
        combination
      );

      if (matchHorizontal || matchVertical || matchDiagonal) {
        simian = true;
        break;
      }
    }
  }

  return simian;
};

const equalNextCaracterHorizontal = (basePositionCaracter, combination) => {
  let match = false;
  let countMatchHorizontal = 0;
  const minimumPositionMatch = 3;

  if (
    combination[basePositionCaracter] === combination[basePositionCaracter + 1]
  ) {
    if (basePositionCaracter + minimumPositionMatch <= combination.length) {
      for (
        let nextCaracterPosition = basePositionCaracter;
        nextCaracterPosition <= basePositionCaracter + minimumPositionMatch;
        nextCaracterPosition++
      ) {
        if (
          combination[basePositionCaracter] !==
          combination[nextCaracterPosition]
        ) {
          break;
        }
        countMatchHorizontal++;
      }
    }
  }

  if (countMatchHorizontal >= 4) match = true;
  return match;
};

const equalNextCaracterVertical = (
  dnaCombination,
  currentLine,
  currentPositionCaracter,
  combination
) => {
  let match = false;
  let countMatchVertical = 0;
  const minimumPositionMatch = 3;

  if (
    dnaCombination[currentLine + 1] &&
    combination[currentPositionCaracter] ===
      dnaCombination[currentLine + 1][currentPositionCaracter]
  ) {
    if (currentLine + minimumPositionMatch <= dnaCombination.length - 1) {
      for (
        let nextLine = currentLine;
        nextLine <= currentLine + minimumPositionMatch;
        nextLine++
      ) {
        if (
          combination[currentPositionCaracter] !==
          dnaCombination[nextLine][currentPositionCaracter]
        ) {
          break;
        }
        countMatchVertical++;
      }
    }
  }

  if (countMatchVertical >= 4) match = true;
  return match;
};

const equalNextCaracterDiagonal = (
  dnaCombination,
  currentLine,
  currentPositionCaracter,
  combination
) => {
  const minimumPositionMatch = 3;
  let match = false;
  let countMatchDiagonal = 0;
  let nextDiagonalCaracterPosition = currentPositionCaracter + 1;
  let previousDiagonalCaracterPosition = currentPositionCaracter - 1;

  if (
    (dnaCombination[currentLine + 1] &&
      combination[currentPositionCaracter] ===
        dnaCombination[currentLine + 1][nextDiagonalCaracterPosition]) ||
    (dnaCombination[currentLine + 1] &&
      combination[currentPositionCaracter] ===
        dnaCombination[currentLine + 1][previousDiagonalCaracterPosition])
  ) {
    if (currentLine + minimumPositionMatch <= dnaCombination.length - 1) {
      for (
        let nextLine = currentLine + 1;
        nextLine <= currentLine + minimumPositionMatch;
        nextLine++
      ) {
        if (
          combination[currentPositionCaracter] ===
            dnaCombination[nextLine][nextDiagonalCaracterPosition] ||
          combination[currentPositionCaracter] ===
            dnaCombination[nextLine][previousDiagonalCaracterPosition]
        ) {
          nextDiagonalCaracterPosition++;
          previousDiagonalCaracterPosition--;
          countMatchDiagonal++;
          continue;
        }
        break;
      }
    }
  }

  if (countMatchDiagonal >= 3) match = true;
  return match;
};

const stats = async (req, res) => {
  try {
    const { count_is_simian = 0 } = await Metrics.findOne({
      attributes: [
        [Sequelize.fn('count', Sequelize.col('is_simian')), 'count_is_simian'],
      ],
      where: {
        is_simian: true,
      },
      raw: true,
    });

    const { count_is_human = 0 } = await Metrics.findOne({
      attributes: [
        [Sequelize.fn('count', Sequelize.col('is_simian')), 'count_is_human'],
      ],
      where: {
        is_simian: false,
      },
      raw: true,
    });

    res.status(200).json({
      count_mutant_dna: Number(count_is_simian),
      count_human_dna: Number(count_is_human),
      ratio: calculateRatio(count_is_simian, count_is_human)
    });
  } catch (e) {
    logger.error(e.message);
    res.status(500).json({
      message: 'Ops houve um problema, entre em contato com o administrador.',
    });
  }
};

const calculateRatio = (simio, human) => {
  const ratio = parseFloat(
    (Number(simio) / Number(human)).toFixed(1)
  );

  if (ratio === Infinity || isNaN(ratio)) {
    return 0.0;
  }
  
  return ratio;
}

export default {
  processDna,
  stats,
};
