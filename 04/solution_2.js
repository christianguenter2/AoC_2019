const calculate_candidates = require("./candidates.js").calculate_candidates;
exports.solve = input => {
  const assert = require("assert");
  let [r_from, r_to] = input[0].split("-");
  const candidates = calculate_candidates(r_from, r_to, (c, candidate) => {
    const r = new RegExp(c + "{3,}");
    return !r.exec(candidate);
  });
  assert(candidates.length === 1206);
  return candidates.length;
};
