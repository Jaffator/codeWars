import { rgb } from "./codewar7";

describe("RGB to Hex Conversion", () => {
  test("should convert standard RGB values to hex", () => {
    expect(rgb(0, 0, 0)).toBe("000000");
    expect(rgb(255, 255, 255)).toBe("FFFFFF");
    expect(rgb(255, 0, 0)).toBe("FF0000");
    expect(rgb(0, 255, 0)).toBe("00FF00");
    expect(rgb(0, 0, 255)).toBe("0000FF");
    expect(rgb(148, 0, 211)).toBe("9400D3");
  });
  test("output has lenght of 6", () => {
    expect(rgb(524, 1000, 300)).toHaveLength(6);
    expect(rgb(0, 0, 0)).toHaveLength(6);
  });
});
