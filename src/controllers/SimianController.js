import Metrics from '../models/Metrics';
import Sequelize from 'sequelize';

const processDna = async (req, res) => {
  try {
    const dna = req.body.dna.map((combination) =>
      combination.toString().toUpperCase()
    );

    const simian = isSimian(dna);

    // await Metrics.create({
    //   is_simian: simian
    // });

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
    console.log(e);
    res.status(500).json({
      message: 'Ops houve um problema, entre em contato com o administrador.',
    });
  }
};

const isSimian = (dna) => {
  let simian = false;
  let matchHorizontal = false;
  let matchVertical = 0;

  for (const [line, combination] of dna.entries()) {
    if (simian) break;
    for (const [positionCaracter, caracter] of combination
      .split('')
      .entries()) {
      
      matchHorizontal = equalNextCaracterHorizontal(positionCaracter, combination);

      matchVertical = equalNextCaracterVertical(
        dna,
        line,
        positionCaracter,
        combination
      );

      if (matchHorizontal || matchVertical) {
        console.log('horizontal', matchHorizontal, caracter);
        console.log('vertical', matchVertical, caracter);
        simian = true;
        break;
      }
      // // verifica uma possível combinacao com os proximos caracteres na horizontal
      // if (equalNextCaracterHorizontal(
      //   positionCaracter,
      //   combination
      // )) {
      //   // verifica se ainda resta o minimo de 3 caracteres para a horizontal a direita
      //   if (positionCaracter + 3 <= combination.length) {
      //     for (let i = positionCaracter; i <= positionCaracter + 3; i++) {
      //       if (!equalNextCaracterHorizontal(
      //         i,
      //         combination
      //       )) {
      //         break;
      //       }
      //       countMatchHorizontal++;
      //     }
      //   }
      // }


      // // verifica uma possível combinacao com os proximos caracteres na vertical
      // if (equalNextCaracterVertical(
      //   dna,
      //   line,
      //   positionCaracter,
      //   combination
      // )) {
      //   // verifica se ainda resta o minimo de 3 caracteres para abaixo na vertical
      //   if ((line + 3) <= (dna.length - 1)) {
      //     for (let i = line; i <= line + 3; i++) {
      //       if (!equalNextCaracterVertical(
      //         dna,
      //         i,
      //         positionCaracter,
      //         combination
      //       )) {
      //         break;
      //       }
      //       countMatchVertical++;
      //     }
      //   }
      // }

      // verificando se existe algum padrao simio em algumas das direcoes a partir de posicao atual
      // if (
      //   countMatchHorizontal === 3 ||
      //   countMatchVertical === 3 ||
      //   countMatchDiagonal === 3
      // ) {
      //   console.log(countMatchHorizontal, countMatchVertical, countMatchDiagonal, caracter);
      //   simian = true;
      //   break;
      // } else {
      //   countMatchHorizontal = 0
      //   countMatchVertical = 0
      //   countMatchDiagonal = 0;
      // }
    }
  }

  return simian;
};

const equalNextCaracterHorizontal = (basePositionCaracter, combination) => {
  let match = false;
  let countMatchHorizontal = 0;

  // verifica uma possível combinacao com os proximos caracteres na horizontal
  if (combination[basePositionCaracter] ===
    combination[basePositionCaracter + 1]) {
    // verifica se ainda resta o minimo de 3 caracteres para a horizontal a direita
    if (basePositionCaracter + 3 <= combination.length) {
      for (let nextCaracterPosition = basePositionCaracter; nextCaracterPosition <= basePositionCaracter + 3; nextCaracterPosition++) {
        if (combination[basePositionCaracter] !==
          combination[nextCaracterPosition]) {
          break;
        }
        countMatchHorizontal++;
      }
    }
  }

  if (countMatchHorizontal >= 4) match = true;
  return match;
}

const equalNextCaracterVertical = (
  dnaCombination,
  currentLine,
  currentPositionCaracter,
  combination
) => {
  let match = false;
  let countMatchVertical = 0;

  if (dnaCombination[currentLine + 1] &&
      combination[currentPositionCaracter] === dnaCombination[currentLine + 1][currentPositionCaracter]) {
    // verifica se ainda resta o minimo de 3 caracteres para abaixo na vertical
    if ((currentLine + 3) <= (dnaCombination.length - 1)) {
      for (let nextLine = currentLine; nextLine <= currentLine + 3; nextLine++) {
        if (combination[currentPositionCaracter] !== dnaCombination[nextLine][currentPositionCaracter]) {
          break;
        }
        countMatchVertical++;
      }
    }
  }

  if (countMatchVertical >= 4) match = true;
  return match;
}

const stats = async (req, res) => {
  try {
    const { count_is_simian } = await Metrics.findOne({
      attributes: [
        [Sequelize.fn('count', Sequelize.col('is_simian')), 'count_is_simian'],
      ],
      where: {
        is_simian: true,
      },
      raw: true,
    });

    const { count_is_human } = await Metrics.findOne({
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
      ratio: parseFloat((count_is_simian / count_is_human).toFixed(1)) || 0.0,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Ops houve um problema, entre em contato com o administrador.',
    });
  }
};

export default {
  processDna,
  stats,
};
