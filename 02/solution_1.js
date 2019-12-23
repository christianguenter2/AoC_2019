exports.solve = input => {
  let program = input.map(x => parseInt(x));
  [program[1], program[2]] = [12, 2];

  const Processor = function(program) {
    this.program = program;

    this.program.take = function(n) {
      if (!this.take_index) {
        this.take_index = 0;
      }
      const old_take_pos = this.take_index;

      this.take_index += n;
      return this.slice(old_take_pos, this.take_index);
    };

    this.program.has_more_items = function() {
      return !this.take_index || this.take_index < this.length;
    };

    this.process_instruction = instruction => {
      const [op_code, op_1, op_2, position] = instruction;

      if (op_code === 1) {
        this.program[position] = this.program[op_1] + this.program[op_2];
      }

      if (op_code === 2) {
        this.program[position] = this.program[op_1] * this.program[op_2];
      }

      return;
    };
  };

  Processor.prototype.run = function() {
    while (this.program.has_more_items()) {
      this.process_instruction(this.program.take(4));
    }
    return this;
  };
  Processor.prototype.getProgram = function() {
    return this.program;
  };

  return new Processor(program).run().getProgram()[0];
};
