// Task
// Calculate (1 / n!) * (1! + 2! + 3! + ... + n!) for a given n, where n is an integer greater or equal to 1.

// Your result should be within 10^-6 of the expected one.

function going(n: number): number {
  let sum = 0;
  let curFraction = 1;
  for (let i = n; i > 0; i--) {
    sum = sum + curFraction;
    curFraction = curFraction / i;
    curFraction;
    sum;
  }
  return sum;
}

const res = going(3);
res;
