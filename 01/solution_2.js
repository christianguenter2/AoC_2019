exports.solve = input => {
  const calc_fuel = x => {
    const fuel = Math.max(0, Math.trunc(x / 3) - 2);
    if (fuel > 0) {
      return fuel + calc_fuel(fuel);
    } else {
      return fuel;
    }
  };

  return input
    .map(x => {
      return calc_fuel(x);
    })
    .reduce((accumulator, current) => accumulator + current);
};
