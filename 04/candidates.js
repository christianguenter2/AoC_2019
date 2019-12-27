function* iterator(r_from, r_to, condition) {
  counter = r_from;
  while (counter <= r_to) {
    if (is_candidate_valid(counter, condition)) {
      yield counter;
    }
    counter++;
  }
}

const is_candidate_valid = (x, condition) => {
  let prev = 0;
  let has_consecutive_digits = true;
  let has_double_digit = false;
  const chars = int_to_chars(x);

  chars.forEach(c => {
    if (c < prev) {
      has_consecutive_digits = false;
    }
    if (prev === c) {
      if (typeof condition === "function") {
        if (!condition(c, x)) {
          return;
        }
      }
      has_double_digit = true;
    }
    prev = c;
  });

  return has_consecutive_digits && has_double_digit;
};

const int_to_chars = x => {
  return x
    .toString()
    .split(/(\d)/)
    .filter(x => x !== "");
};

calculate_candidates = (r_from, r_to, condition) => {
  const iter = iterator(r_from, r_to, condition);
  let candidates = [];
  i = iter.next();
  while (!i.done) {
    candidates.push(i.value);
    i = iter.next();
  }
  return candidates;
};

exports.calculate_candidates = calculate_candidates;
