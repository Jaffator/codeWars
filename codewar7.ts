// The rgb function is incomplete. Complete it so that passing in RGB decimal values will result in a hexadecimal representation being returned. Valid decimal values for RGB are 0 - 255. Any values that fall out of that range must be rounded to the closest valid value.

// Note: Your answer should always be 6 characters long, the shorthand with 3 will not work here.

// Examples (input --> output):
// 255, 255, 255 --> "FFFFFF"
// 255, 255, 300 --> "FFFFFF"
// 0, 0, 0       --> "000000"
// 148, 0, 211   --> "9400D3"

function rgb(r: number, g: number, b: number): string {
  let inputs: number[] = [r, g, b];
  const hexResult: string[] = inputs.map((item) => {
    let hex = Math.min(255, Math.max(0, item)).toString(16).toUpperCase();
    if (hex.length === 1) hex = "0" + hex;
    return hex;
  });
  return hexResult.join("");
}

const res = rgb(255, 14, 300);
res;

export { rgb };
