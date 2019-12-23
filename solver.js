const day = process.argv[2];

const input = require("fs")
  .readFileSync("./" + day + "/input.txt")
  .toString()
  .split(/\n/)
  .filter(line => {
    return line !== "";
  });

const solver = require("./" + day + "/solution.js");

console.log(solver.solve(input));
