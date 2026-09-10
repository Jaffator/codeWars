// I am the one who establishes the list so I told him: "Don't worry any more, I will modify the order of the list". It was decided to attribute a "weight" to numbers. The weight of a number will be from now on the sum of its digits.

// For example 99 will have "weight" 18, 100 will have "weight" 1 so in the list 100 will come before 99.

// Given a string with the weights of FFC members in normal order can you give this string ordered by "weights" of these numbers?

// Example:
// "56 65 74 100 99 68 86 180 90" ordered by numbers weights becomes:

// "100 180 90 56 65 74 68 86 99"
// When two numbers have the same "weight", let us class them as if they were strings (alphabetical ordering) and not numbers:

// 180 is before 90 since, having the same "weight" (9), it comes before as a string.

// All numbers in the list are positive numbers and the list can be empty.

// Notes
// it may happen that the input string have leading, trailing whitespaces and more than a unique whitespace between two consecutive numbers
// For C: The result is freed.

// const a = ["74", "65", "56"];
// console.log(a.sort());

export function orderWeight(strng: string): string {
  let arrstr = strng
    .trim()
    .split(" ")
    .filter((item) => item.length > 0);

  const weightarr = arrstr.map((item) => {
    return item
      .split("")
      .map(Number)
      .reduce((acc, value) => acc + value, 0);
  });
  let pairs = weightarr
    .map((item, index) => ({
      weight: item,
      value: arrstr[index],
    }))
    .sort((a, b) => a.weight - b.weight || a.value.localeCompare(b.value));
  const result = pairs.map((item) => item.value).join(" ");
  return result;
}

orderWeight(" 56  65    74 100   99     68  86  180 90 ");
