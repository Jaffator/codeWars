import { scramble } from "./codewar2";
describe("scramble - Basic Functionality", () => {
  test("should return true when str1 contains all characters for str2", () => {
    expect(scramble("rkqodlw", "world")).toBe(true);
  });

  test("should return true for complex matching case", () => {
    expect(scramble("cedewaraaossoqqyt", "codewars")).toBe(true);
  });

  test("should return false when str1 lacks characters from str2", () => {
    expect(scramble("katas", "steak")).toBe(false);
  });

  test("should return true for identical strings", () => {
    expect(scramble("hello", "hello")).toBe(true);
  });

  test("should return true when str1 is longer and contains str2", () => {
    expect(scramble("javascript", "java")).toBe(true);
  });
});

describe("scramble - Empty Strings", () => {
  test("should return true when str2 is empty", () => {
    expect(scramble("anything", "")).toBe(true);
  });

  test("should return true when both strings are empty", () => {
    expect(scramble("", "")).toBe(true);
  });

  test("should return false when str1 is empty but str2 is not", () => {
    expect(scramble("", "abc")).toBe(false);
  });
});

describe("scramble - Single Character", () => {
  test("should return true for single matching character", () => {
    expect(scramble("a", "a")).toBe(true);
  });

  test("should return false for single non-matching character", () => {
    expect(scramble("a", "b")).toBe(false);
  });

  test("should return true when str1 has multiple of same char needed by str2", () => {
    expect(scramble("aaaa", "a")).toBe(true);
  });

  test("should return false when str2 needs more of a char than str1 has", () => {
    expect(scramble("a", "aa")).toBe(false);
  });
});

describe("scramble - Character Frequency", () => {
  test("should return false when str1 has insufficient frequency of a character", () => {
    expect(scramble("abc", "aabbcc")).toBe(false);
  });

  test("should return true when str1 has exact frequency match", () => {
    expect(scramble("aabbcc", "abc")).toBe(true);
  });

  test("should return true when str1 has more than enough of each character", () => {
    expect(scramble("aaabbbccc", "abc")).toBe(true);
  });

  test("should handle repeated characters correctly", () => {
    expect(scramble("aabbccdd", "abcd")).toBe(true);
    expect(scramble("abcd", "aabbccdd")).toBe(false);
  });

  test("should return false when one character frequency is insufficient", () => {
    expect(scramble("aaabbbccd", "abcd")).toBe(true);
    expect(scramble("aaabbbccd", "abcdd")).toBe(false);
  });
});

describe("scramble - All Same Character", () => {
  test("should return true when both strings contain same repeated character", () => {
    expect(scramble("aaaaa", "aaa")).toBe(true);
  });

  test("should return false when str2 needs more repetitions", () => {
    expect(scramble("aaa", "aaaaa")).toBe(false);
  });

  test("should handle different characters", () => {
    expect(scramble("zzzzz", "z")).toBe(true);
    expect(scramble("zzzzz", "zzzzzz")).toBe(false);
  });
});

describe("scramble - Alphabet Coverage", () => {
  test("should work with all lowercase letters a-z", () => {
    expect(scramble("abcdefghijklmnopqrstuvwxyz", "xyz")).toBe(true);
  });

  test("should return true when str1 is full alphabet and str2 is subset", () => {
    expect(scramble("thequickbrownfoxjumpsoverthelazydog", "quick")).toBe(true);
  });

  test("should handle missing letters from alphabet", () => {
    expect(scramble("abcdefghijklmnopqrstuvwxy", "xyz")).toBe(false);
  });
});

describe("scramble - Order Independence", () => {
  test("should return true regardless of character order in str1", () => {
    expect(scramble("dlrow", "world")).toBe(true);
  });

  test("should return true for reversed strings", () => {
    expect(scramble("dcba", "abcd")).toBe(true);
  });

  test("should return true for scrambled characters", () => {
    expect(scramble("tac", "cat")).toBe(true);
  });
});

describe("scramble - Large Strings Performance", () => {
  test("should handle large str1 with small str2", () => {
    const str1 = "a".repeat(10000) + "b".repeat(5000) + "c".repeat(3000);
    const str2 = "abc";
    expect(scramble(str1, str2)).toBe(true);
  });

  test("should handle large str1 and large str2", () => {
    const str1 = "abcdefghij".repeat(1000);
    const str2 = "abc".repeat(100);
    expect(scramble(str1, str2)).toBe(true);
  });

  test("should efficiently return false for large strings", () => {
    const str1 = "a".repeat(10000);
    const str2 = "a".repeat(9999) + "b";
    expect(scramble(str1, str2)).toBe(false);
  });

  test("should handle str2 requiring exact counts from large str1", () => {
    const str1 = "a".repeat(1000) + "b".repeat(500);
    const str2 = "a".repeat(1000) + "b".repeat(500);
    expect(scramble(str1, str2)).toBe(true);
  });

  test("should return false when large str2 exceeds str1 by one character", () => {
    const str1 = "a".repeat(1000);
    const str2 = "a".repeat(1001);
    expect(scramble(str1, str2)).toBe(false);
  });
});

describe("scramble - Edge Cases", () => {
  test("should handle str2 with all unique characters", () => {
    expect(scramble("abcdefgh", "beh")).toBe(true);
  });

  test("should handle str1 with duplicates but str2 with unique chars", () => {
    expect(scramble("aaabbbcccddd", "abcd")).toBe(true);
  });

  test("should return false when str2 has unique char not in str1", () => {
    expect(scramble("aaabbbccc", "abcd")).toBe(false);
  });

  test("should handle mixed frequencies correctly", () => {
    expect(scramble("aabbccddee", "ace")).toBe(true);
    expect(scramble("aabbccddee", "aabbccddee")).toBe(true);
    expect(scramble("aabbccddee", "aabbccddeef")).toBe(false);
  });
});

describe("scramble - Special Patterns", () => {
  test("should handle palindromes", () => {
    expect(scramble("racecar", "car")).toBe(true);
    expect(scramble("racecar", "racecar")).toBe(true);
  });

  test("should handle anagrams", () => {
    expect(scramble("listen", "silent")).toBe(true);
    expect(scramble("triangle", "integral")).toBe(true);
  });

  test("should handle strings with alternating patterns", () => {
    expect(scramble("ababababab", "aabb")).toBe(true);
    expect(scramble("ababab", "aaabbb")).toBe(true);
  });

  test("should handle consecutive repeated characters", () => {
    expect(scramble("aaabbbccc", "abc")).toBe(true);
    expect(scramble("aaabbbccc", "aabbcc")).toBe(true);
    expect(scramble("aaabbbccc", "aaaabbbbcccc")).toBe(false);
  });
});
