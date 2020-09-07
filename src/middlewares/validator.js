export default (req, res, next) => {
  try {
    const dna = req.body.dna;

    if (req.method !== 'POST' && req.url !== '/simian') {
      return next();
    }

    validatesBodyDna(req.body);
    validatesIsArray(dna);
    validatesIsNotEmpty(dna);
    validatesIfChartIsSquare(dna);
    validateContent(dna);

    next();
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

const validatesBodyDna = (body) => {
  if (!body.hasOwnProperty('dna')) {
    throw new Error('DNA is missing :( .');
  }
};

const validatesIsArray = (dna) => {
  if (!Array.isArray(dna)) {
    throw new Error('DNA is missing array :( .');
  }
};

const validatesIsNotEmpty = (dna) => {
  if (dna.length === 0) {
    throw new Error('DNA cannot be empty :( .');
  }
};

const validatesIfChartIsSquare = (dna) => {
  if (dna.length <= 1 || dna.length % 2 !== 0) {
    throw new Error('DNA is missing chart square :( .');
  }
};

const validateContent = (dna) => {
  const cleanDna = dna.map((combination) => combination.toUpperCase());

  for (const [line, combination] of cleanDna.entries()) {
    validateIsString(line, combination);
    validateWhetherTheBaseIsNitrogenous(line, combination);
    validatesIfContentIsSquare(line, combination, cleanDna);
  }
};

const validateIsString = (line, combination) => {
  if (typeof combination !== 'string') {
    throw new Error(
      `DNA combination (${combination}) on line ${line + 1} must be string :( .`
    );
  }
};

const validatesIfContentIsSquare = (line, combination, dna) => {
  if (combination.length !== dna.length) {
    throw new Error(
      `the DNA combination in line ${line + 1} must be square :( .`
    );
  }
};

const validateWhetherTheBaseIsNitrogenous = (line, combination) => {
  const pattern = ['A', 'T', 'C', 'G'];

  for (const letter of combination) {
    if (!pattern.includes(letter)) {
      throw new Error(
        `the DNA combination letter (${combination} -> ${letter}) passed in line ${
          line + 1
        } must be nitrogenous :( .`
      );
    }
  }
};
