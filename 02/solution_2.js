const Processor = require("./processor.js").Processor;

exports.solve = input => {
  function* generator(limit) {
    let x = 0;
    while (x <= limit) {
      let y = 0;
      while (y <= limit) {
        yield [x, y];
        y += 1;
      }
      x += 1;
    }
  }

  const g = generator(99);
  let candidate = g.next();

  while (!candidate.done) {
    let [noun, verb] = [candidate.value[0], candidate.value[1]];
    let program = input.map(x => parseInt(x));
    [program[1], program[2]] = [noun, verb];

    if (new Processor(program).run().getProgram()[0] === 19690720) {
      return 100 * noun + verb;
    }

    candidate = g.next();
  }
};
