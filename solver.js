const day = process.argv[2] || "";
if (!day) {
  console.log("Please specify the day");
  process.exit(1);
}

const part = process.argv[3] || "";
if (!part) {
  console.log("Please specify the part");
  process.exit(1);
}

let input = (() => {
  try {
    return require("fs")
      .readFileSync("./" + day + "/input.txt")
      .toString()
      .split(/\n/)
      .filter(line => {
        return line !== "";
      });
  } catch (e) {
    // It's ok. Solution module provides its own data
    return [];
  }
})();

console.log(require("./" + day + "/solution_" + part + ".js").solve(input));
