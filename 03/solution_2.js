function* times(n) {
  let counter = 0;

  while (counter < n) {
    yield counter;
    counter += 1;
  }
}

const move = (direction, position) => {
  switch (direction) {
    case "L":
      position.x -= 1;
      break;

    case "R":
      position.x += 1;
      break;

    case "D":
      position.y -= 1;
      break;

    case "U":
      position.y += 1;
      break;

    default:
      break;
  }
  return position;
};

const walk = instructions => {
  let visited = new Map();
  let position = { x: 0, y: 0 };
  let step_counter = 0;
  instructions.forEach(x => {
    let [_, direction, length] = x.split(/([RULD])/);
    let iter = times(parseInt(length));

    while (!iter.next().done) {
      step_counter += 1;
      position = move(direction, position);
      let json = JSON.stringify(position);
      if (!visited.has(json)) {
        visited.set(json, step_counter);
      }
    }
  });
  return visited;
};

const manhattan_distance = coordinate => {
  return Math.abs(coordinate.x) + Math.abs(coordinate.y);
};

const merge_maps = (map1, map2) => {
  let map = new Map();

  map2.forEach((v, k) => {
    if (map1.has(k)) {
      map.set(k, map1.get(k) + v);
    }
  });

  return map;
};

const solve = (s1, s2) => {
  const visited = merge_maps(walk(s1), walk(s2));
  let candidates = [...visited].filter(([k, v]) => v > 1);
  return Math.min.apply(
    null,
    candidates.map(([k, v]) => v)
  );
};

exports.solve = input => {
  const assert = require("assert");
  assert(solve(["R8", "U5", "L5", "D3"], ["U7", "R6", "D4", "L4"]) === 30);
  assert(
    solve(
      [
        "R98",
        "U47",
        "R26",
        "D63",
        "R33",
        "U87",
        "L62",
        "D20",
        "R33",
        "U53",
        "R51"
      ],
      ["U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"]
    ) === 410
  );
  assert(
    solve(
      ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"],
      ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"]
    ) === 610
  );

  s1 = input.slice(0, 301);
  s2 = input.slice(301, 602);
  return solve(s1, s2);
};
