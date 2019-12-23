exports.solve = input => {
  return input
    .map(x => {
      return Math.trunc(x / 3) - 2;
    })
    .reduce((accumulator, current) => {
      return accumulator + current;
    });
};
