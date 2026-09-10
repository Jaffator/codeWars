export {};
// Build Tower
// Build a pyramid-shaped tower, as an array/list of strings, given a positive integer number of floors. A tower block is represented with "*" character.

// For example, a tower with 3 floors looks like this:

// [
//   "  *  ",
//   " *** ",
//   "*****"
// ]
// And a tower with 6 floors looks like this:

// [
//   "     *     ",
//   "    ***    ",
//   "   *****   ",
//   "  *******  ",
//   " ********* ",
//   "***********"
// ]

const towerBuilder = (nFloors: number): string[] => {
  let result: string[] = [];
  let temp = nFloors;
  for (let i = 1; i <= nFloors; i++) {
    const stars = i * 2 - 1;
    const space = nFloors - i;
    const row = " ".repeat(space) + "*".repeat(stars) + " ".repeat(space);
    result.push(row);
  }
  return result;
};

const result = towerBuilder(10);
console.log(result.join("\n"));
