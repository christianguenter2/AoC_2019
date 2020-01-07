const hashInput = input => {
  let m = new Map();
  input
    .map(x => x.split(")"))
    .forEach(([v, k]) => {
      m.set(k, v);
    });
  return m;
};

const calculateOrbits = input => {
  const m = hashInput(input);
  let orbits = 0;

  m.forEach((_, k) => {
    var planet = k;
    while (m.has(planet)) {
      orbits += 1;
      planet = m.get(planet);
    }
  });

  return orbits;
};

exports.solve = input => {
  const assert = require("assert");
  const testData = [
    "COM)B",
    "B)C",
    "C)D",
    "D)E",
    "E)F",
    "B)G",
    "G)H",
    "D)I",
    "E)J",
    "J)K",
    "K)L"
  ];

  assert(calculateOrbits(["COM)A", "A)B"]) === 3);
  assert(calculateOrbits(testData) === 42);

  return calculateOrbits(input);
};
