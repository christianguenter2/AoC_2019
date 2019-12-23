const Processor = require("./processor.js").Processor;

exports.solve = input => {
  let program = input.map(x => parseInt(x));
  [program[1], program[2]] = [12, 2];

  return new Processor(program).run().getProgram()[0];
};
