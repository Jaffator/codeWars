// You probably know the "like" system from Facebook and other pages. People can "like" blog posts, pictures or other items. We want to create the text that should be displayed next to such an item.

// Implement the function which takes an array containing the names of people that like an item. It must return the display text as shown in the examples:

// []                                -->  "no one likes this"
// ["Peter"]                         -->  "Peter likes this"
// ["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
// ["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
// ["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this"
// Note: For 4 or more names, the number in "and 2 others" simply increases.

function likes(a: string[]): string {
  let result: string = "";
  if (a.length === 0) result = "no one likes this";
  if (a.length === 1) result = `${a[0]} likes this`;
  if (a.length === 2) result = `${a[0]} and ${a[1]} likes this`;
  if (a.length === 3) result = `${a[0]}, ${a[1]} and ${a[2]} likes this`;
  if (a.length >= 4) result = `${a[0]}, ${a[1]} and ${a.length - 2} likes this`;
  return result;
}

const test1 = [];
const test2 = ["Peter"];
const test3 = ["Jacob", "Alex"];
const test4 = ["Max", "John", "Mark"];
const test5 = ["Alex", "Jacob", "Mark", "Max", "Mark", "Max"];
console.log(likes(test1));
console.log(likes(test2));
console.log(likes(test3));
console.log(likes(test4));
console.log(likes(test5));
