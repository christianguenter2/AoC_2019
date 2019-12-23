const day = process.argv[2] || "";
let input = [];

try {
  input = require("fs")
    .readFileSync("./" + day + "/input.txt")
    .toString()
    .split(/\n/)
    .filter(line => {
      return line !== "";
    });
} catch (e) {
  // It's ok. Solution module provides its own data
}

const solver = require("./" + day + "/solution.js");

console.log(solver.solve(input));
