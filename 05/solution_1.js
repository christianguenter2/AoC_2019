const R = require("ramda");

const getParameter = (program, index, mode) => {
  if (mode === "0") {
    return program[index];
  } else {
    return index;
  }
};

const arithmetic_operation = (
  fn,
  program,
  execution_pointer,
  modeOf1stParameter,
  modeOf2ndParameter
) => {
  let operand1, operand2;
  let [p1, p2, p3] = [
    program[execution_pointer + 1],
    program[execution_pointer + 2],
    program[execution_pointer + 3]
  ];
  operand1 = getParameter(program, p1, modeOf1stParameter);
  operand2 = getParameter(program, p2, modeOf2ndParameter);

  program[p3] = fn(parseInt(operand1), parseInt(operand2));
  return [program, execution_pointer + 4];
};

const multiply = R.curry(arithmetic_operation)((op1, op2) => op1 * op2);
const add = R.curry(arithmetic_operation)((op1, op2) => op1 + op2);

function execute(program, input) {
  let execution_pointer = 0,
    newProgram = [];

  while (execution_pointer < program.length) {
    let p1, p2, p3;
    let instruction = program[execution_pointer].toString().split("");
    let opCode = parseInt(instruction.slice(-2).join(""));
    let modeOf1stParameter = instruction.slice(-3, -2).join("") || "0";
    let modeOf2ndParameter = instruction.slice(-4, -3).join("") || "0";

    switch (opCode) {
      case 1:
        [program, execution_pointer] = add(
          program,
          execution_pointer,
          modeOf1stParameter,
          modeOf2ndParameter
        );
        break;
      case 2:
        [program, execution_pointer] = multiply(
          program,
          execution_pointer,
          modeOf1stParameter,
          modeOf2ndParameter
        );
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

      case 5:
        p1 = program[execution_pointer + 1];
        p2 = program[execution_pointer + 2];
        p1 = getParameter(program, p1, modeOf1stParameter);
        p2 = getParameter(program, p2, modeOf2ndParameter);
        if (p1 !== 0) {
          execution_pointer = p2;
        } else {
          execution_pointer += 3;
        }
        break;

      case 6:
        p1 = program[execution_pointer + 1];
        p2 = program[execution_pointer + 2];
        p1 = getParameter(program, p1, modeOf1stParameter);
        p2 = getParameter(program, p2, modeOf2ndParameter);
        if (p1 === 0) {
          execution_pointer = p2;
        } else {
          execution_pointer += 3;
        }
        break;

      case 7:
        p1 = program[execution_pointer + 1];
        p2 = program[execution_pointer + 2];
        p3 = program[execution_pointer + 3];
        p1 = getParameter(program, p1, modeOf1stParameter);
        p2 = getParameter(program, p2, modeOf2ndParameter);
        if (p1 < p2) {
          program[p3] = 1;
        } else {
          program[p3] = 0;
        }
        execution_pointer += 4;
        break;

      case 8:
        p1 = program[execution_pointer + 1];
        p2 = program[execution_pointer + 2];
        p3 = program[execution_pointer + 3];
        p1 = getParameter(program, p1, modeOf1stParameter);
        p2 = getParameter(program, p2, modeOf2ndParameter);
        if (p1 === p2) {
          program[p3] = 1;
        } else {
          program[p3] = 0;
        }
        execution_pointer += 4;
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
  assert(execute([3, 3, 1108, -1, 8, 3, 4, 3, 99], 8)[1].slice(-1)[0] === 1);
  assert(execute([3, 3, 1108, -1, 8, 3, 4, 3, 99], 7)[1].slice(-1)[0] === 0);
  assert(execute([3, 3, 1107, -1, 8, 3, 4, 3, 99], 7)[1].slice(-1)[0] === 1);
  assert(execute([3, 3, 1107, -1, 8, 3, 4, 3, 99], 0)[1].slice(-1)[0] === 1);
  assert(execute([3, 3, 1107, -1, 8, 3, 4, 3, 99], 8)[1].slice(-1)[0] === 0);
  assert(
    execute([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], 8)[1].slice(-1)[0] === 1
  );
  assert(
    execute([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], 2)[1].slice(-1)[0] === 1
  );
  assert(
    execute(
      [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
      7
    )[1].slice(-1)[0] === 1
  );
  assert(
    execute(
      [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
      0
    )[1].slice(-1)[0] === 0
  );
  assert(
    execute([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], 7)[1].slice(
      -1
    )[0] === 1
  );
  assert(
    execute([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], 0)[1].slice(
      -1
    )[0] === 0
  );
  let p1 = [
    3,
    21,
    1008,
    21,
    8,
    20,
    1005,
    20,
    22,
    107,
    8,
    21,
    20,
    1006,
    20,
    31,
    1106,
    0,
    36,
    98,
    0,
    0,
    1002,
    21,
    125,
    20,
    4,
    20,
    1105,
    1,
    46,
    104,
    999,
    1105,
    1,
    46,
    1101,
    1000,
    1,
    20,
    4,
    20,
    1105,
    1,
    46,
    98,
    99
  ];
  assert(execute(p1, 8)[1].slice(-1)[0] === 1000);
  assert(execute(p1, 9)[1].slice(-1)[0] === 1001);

  p = input.map(x => parseInt(x));

  assert(execute(p, 5)[1].slice(-1)[0] === 12410607);
  p = input.map(x => parseInt(x));
  return execute(p, 1)[1].slice(-1);
};
