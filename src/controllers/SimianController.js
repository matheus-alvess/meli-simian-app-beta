import humanSimianLib from '../lib/humanSimian';
import Metrics from '../models/Metrics';
import Sequelize from 'sequelize';

const processDna = async (req, res) => {
  try {
    const dna = req.body.dna.map((combination) =>
      combination.toString().toUpperCase()
    );
    const generalAccumulatorObj = {
      isSimian: false,
      directions: {
        horizontal: {},
        vertical: {},
        diagonal: {},
      },
      totalSimians: 0,
      totalHumans: 0,
      totalDnas: dna.length * dna.length,
    };

    const simian = isSimian(generalAccumulatorObj, dna);

    await Metrics.create({
      is_simian: generalAccumulatorObj.isSimian,
      directions: JSON.stringify(generalAccumulatorObj.directions),
      total_simians: generalAccumulatorObj.totalSimians,
      total_humans: generalAccumulatorObj.totalHumans,
      total_dnas: generalAccumulatorObj.totalDnas,
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
    console.log(e);
    res.status(500).json({
      message: 'Ops houve um problema, entre em contato com o administrador.',
    });
  }
};

const isSimian = (generalAccumulatorObj, dna) => {
  humanSimianLib.validateHorizontalDirection(generalAccumulatorObj, dna);
  humanSimianLib.validateVerticalDirection(generalAccumulatorObj, dna);
  humanSimianLib.validateDiagonalDirection(generalAccumulatorObj, dna);
  humanSimianLib.validateDiagonalDirection(generalAccumulatorObj, dna, true);

  generalAccumulatorObj.totalHumans =
    generalAccumulatorObj.totalDnas - generalAccumulatorObj.totalSimians * 4;
  return generalAccumulatorObj.isSimian;
};

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
