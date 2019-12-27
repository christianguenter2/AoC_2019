function execute(program, input) {
  let execution_pointer = 0,
    newProgram = [];

  while (execution_pointer < program.length) {
    let operand1 = 0,
      operand2 = 0,
      p1,
      p2,
      p3;

    let instruction = program[execution_pointer].toString().split("");
    let opCode = parseInt(instruction.slice(-2).join(""));
    let modeOf1stParameter = instruction.slice(-3, -2).join("") || "0";
    let modeOf2ndParameter = instruction.slice(-4, -3).join("") || "0";

    switch (opCode) {
      case 1:
        [p1, p2, p3] = [
          program[execution_pointer + 1],
          program[execution_pointer + 2],
          program[execution_pointer + 3]
        ];
        if (modeOf1stParameter === "0") {
          operand1 = program[p1];
        } else {
          operand1 = p1;
        }

        if (modeOf2ndParameter === "0") {
          operand2 = program[p2];
        } else {
          operand2 = p2;
        }
        program[p3] = parseInt(operand1) + parseInt(operand2);
        execution_pointer += 4;

        break;
      case 2:
        [p1, p2, p3] = [
          program[execution_pointer + 1],
          program[execution_pointer + 2],
          program[execution_pointer + 3]
        ];
        if (modeOf1stParameter === "0") {
          operand1 = program[p1];
        } else {
          operand1 = p1;
        }

        if (modeOf2ndParameter === "0") {
          operand2 = program[p2];
        } else {
          operand2 = p2;
        }
        program[p3] = parseInt(operand1) * parseInt(operand2);

        execution_pointer += 4;
        break;

      case 3:
        p1 = program[execution_pointer + 1];
        program[p1] = input;
        execution_pointer += 2;
        break;

      case 4:
        p1 = program[execution_pointer + 1];
        newProgram.push(program[p1]);
        execution_pointer += 2;
        break;

      default:
        execution_pointer = program.length + 1;
        break;
    }
  }
  return [program, newProgram];
}

exports.solve = input => {
  const assert = require("assert");
  let p = input.map(x => parseInt(x));
  assert(execute([1002, 4, 3, 4, 33])[0][4] === 99);
  assert(execute([3, 0, 4, 0, 99], 0)[1][0] === 0);
  assert(execute(p, 1)[1].slice(-1)[0] === 11193703);
  return execute(p, 1)[1].slice(-1);
};
