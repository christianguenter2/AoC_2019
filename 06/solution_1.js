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

const directedWalk = (input, from, to) => {
  const m = hashInput(input);
  let steps = [];

  let planet = from;
  while (planet !== to && planet !== "COM") {
    planet = m.get(planet);
    steps.push(planet);
  }
  steps.pop();

  return steps;
};

const walk = (input, from, to) => {
  const fToCOM = directedWalk(input, from, "COM");
  const tToCOM = directedWalk(input, to, "COM");

  for (const x in fToCOM) {
    const element = fToCOM[x];
    if (tToCOM.includes(element)) {
      return parseInt(x) + tToCOM.indexOf(element);
    }
  }
};

exports.solve = input => {
  const assert = require("assert");
  let testData = [
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
  assert(calculateOrbits(input) === 158090);

  testData.push("K)YOU");
  testData.push("I)SAN");

  assert.deepEqual(directedWalk(testData, "YOU", "D"), ["K", "J", "E"]);
  assert.deepEqual(directedWalk(testData, "SAN", "D"), ["I"]);

  assert(walk(testData, "YOU", "SAN") === 4);
  assert(walk(input, "YOU", "SAN") === 241);

  return walk(input, "YOU", "SAN");
};
