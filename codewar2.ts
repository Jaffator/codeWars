// Complete the function scramble(str1, str2) that returns true if a portion of str1 characters can be rearranged to match str2, otherwise returns false.

// Notes:

// Only lower case letters will be used (a-z). No punctuation or digits will be included.
// Performance needs to be considered.
// Examples
// scramble('rkqodlw', 'world') ==> True
// scramble('cedewaraaossoqqyt', 'codewars') ==> True
// scramble('katas', 'steak') ==> False
interface Obj {
  [key: string]: number;
}
export function scramble(str1: string, str2: string) {
  // const count: Record<string, number> = {};
  const count: Obj = {};
  for (const char of str1) {
    count[char] = (count[char] || 0) + 1;
  }
  for (const char of str2) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}

const result = scramble("katas", "steak");
console.log(result);
