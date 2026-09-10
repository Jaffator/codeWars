import { arrayDiff } from "./codewar5";

describe("arrayDiff", () => {
  // Basic test cases
  describe("Basic functionality", () => {
    test("should remove all occurrences of 1 from [1, 2]", () => {
      expect(arrayDiff([1, 2], [1])).toEqual([2]);
    });

    test("should remove all occurrences of 2 from [1, 2, 2, 2, 3]", () => {
      expect(arrayDiff([1, 2, 2, 2, 3], [2])).toEqual([1, 3]);
    });

    test("should remove multiple different values", () => {
      expect(arrayDiff([1, 2, 3, 4, 5], [2, 4])).toEqual([1, 3, 5]);
    });

    test("should preserve order of remaining elements", () => {
      expect(arrayDiff([5, 3, 1, 4, 2], [3, 4])).toEqual([5, 1, 2]);
    });
  });

  // Edge cases - Empty arrays
  describe("Empty arrays", () => {
    test("should return empty array when first array is empty", () => {
      expect(arrayDiff([], [1, 2, 3])).toEqual([]);
    });

    test("should return original array when second array is empty", () => {
      expect(arrayDiff([1, 2, 3], [])).toEqual([1, 2, 3]);
    });

    test("should return empty array when both arrays are empty", () => {
      expect(arrayDiff([], [])).toEqual([]);
    });
  });

  // Edge cases - No matches
  describe("No matching elements", () => {
    test("should return original array when no elements match", () => {
      expect(arrayDiff([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3]);
    });

    test("should handle negative numbers with no matches", () => {
      expect(arrayDiff([-1, -2, -3], [1, 2, 3])).toEqual([-1, -2, -3]);
    });
  });

  // Edge cases - All elements match
  describe("All elements should be removed", () => {
    test("should return empty array when all elements are in b", () => {
      expect(arrayDiff([1, 2, 3], [1, 2, 3])).toEqual([]);
    });

    test("should remove all duplicates", () => {
      expect(arrayDiff([1, 1, 1, 1], [1])).toEqual([]);
    });

    test("should handle when b has more elements than needed", () => {
      expect(arrayDiff([1, 2], [1, 2, 3, 4, 5])).toEqual([]);
    });
  });

  // Edge cases - Duplicates
  describe("Handling duplicates", () => {
    test("should remove all duplicate occurrences", () => {
      expect(arrayDiff([1, 2, 2, 3, 2, 4], [2])).toEqual([1, 3, 4]);
    });

    test("should handle duplicates in both arrays", () => {
      expect(arrayDiff([1, 1, 2, 2, 3, 3], [1, 1, 3, 3])).toEqual([2, 2]);
    });

    test("should work with many duplicates", () => {
      expect(arrayDiff([5, 5, 5, 5, 5, 1, 2, 3], [5])).toEqual([1, 2, 3]);
    });
  });

  // Edge cases - Special numbers
  describe("Special numeric values", () => {
    test("should handle zero", () => {
      expect(arrayDiff([0, 1, 2, 0, 3], [0])).toEqual([1, 2, 3]);
    });

    test("should handle negative numbers", () => {
      expect(arrayDiff([-1, -2, -3, 1, 2, 3], [-1, -2])).toEqual([-3, 1, 2, 3]);
    });

    test("should handle mixed positive and negative", () => {
      expect(arrayDiff([-5, -2, 0, 2, 5], [-2, 2])).toEqual([-5, 0, 5]);
    });

    test("should handle large numbers", () => {
      expect(arrayDiff([999999, 1000000, 1000001], [1000000])).toEqual([999999, 1000001]);
    });
  });

  // Edge cases - Large arrays
  describe("Performance with large arrays", () => {
    test("should handle large array a", () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      const result = arrayDiff(largeArray, [500, 501, 502]);
      expect(result).toHaveLength(997);
      expect(result).not.toContain(500);
      expect(result).not.toContain(501);
      expect(result).not.toContain(502);
    });

    test("should handle large array b", () => {
      const removeArray = Array.from({ length: 100 }, (_, i) => i * 2);
      const result = arrayDiff([1, 2, 3, 4, 5, 6], removeArray);
      expect(result).toEqual([1, 3, 5]);
    });

    test("should handle both large arrays", () => {
      const largeA = Array.from({ length: 500 }, (_, i) => i);
      const largeB = Array.from({ length: 250 }, (_, i) => i * 2);
      const result = arrayDiff(largeA, largeB);
      expect(result.length).toBeLessThan(500);
      // Check that even numbers are removed
      result.forEach((num) => {
        expect(num % 2).toBe(1);
      });
    });
  });

  // Edge cases - Single elements
  describe("Single element arrays", () => {
    test("should handle single element in a", () => {
      expect(arrayDiff([1], [1])).toEqual([]);
      expect(arrayDiff([1], [2])).toEqual([1]);
    });

    test("should handle single element in b", () => {
      expect(arrayDiff([1, 2, 3, 4, 5], [3])).toEqual([1, 2, 4, 5]);
    });

    test("should handle both single elements", () => {
      expect(arrayDiff([5], [5])).toEqual([]);
      expect(arrayDiff([5], [3])).toEqual([5]);
    });
  });

  // Edge cases - Same array
  describe("Identical arrays", () => {
    test("should return empty when arrays are identical", () => {
      expect(arrayDiff([1, 2, 3], [1, 2, 3])).toEqual([]);
    });

    test("should handle identical arrays with duplicates", () => {
      expect(arrayDiff([1, 1, 2, 2, 3, 3], [1, 2, 3])).toEqual([]);
    });
  });

  // Edge cases - Order preservation
  describe("Order preservation", () => {
    test("should maintain original order", () => {
      expect(arrayDiff([9, 8, 7, 6, 5, 4, 3, 2, 1], [5, 3, 1])).toEqual([9, 8, 7, 6, 4, 2]);
    });

    test("should maintain order with scattered removals", () => {
      expect(arrayDiff([1, 5, 2, 8, 3, 9, 4], [2, 4, 8])).toEqual([1, 5, 3, 9]);
    });
  });

  // Edge cases - Complex patterns
  describe("Complex patterns", () => {
    test("should handle alternating pattern", () => {
      expect(arrayDiff([1, 2, 1, 2, 1, 2], [2])).toEqual([1, 1, 1]);
    });

    test("should handle mixed unique and duplicate values", () => {
      expect(arrayDiff([1, 2, 2, 3, 4, 4, 4, 5], [2, 4])).toEqual([1, 3, 5]);
    });

    test("should remove from beginning, middle, and end", () => {
      expect(arrayDiff([1, 2, 3, 4, 5, 6, 7], [1, 4, 7])).toEqual([2, 3, 5, 6]);
    });
  });
});
