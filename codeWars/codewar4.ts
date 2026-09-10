export {};
// Write an algorithm that will identify valid IPv4 addresses in dot-decimal format. IPs should be considered valid if they consist of four octets, with values between 0 and 255, inclusive.

// Valid inputs examples:
// Examples of valid inputs:
// 1.2.3.4
// 123.45.67.89
// Invalid input examples:
// 1.2.3
// 1.2.3.4.5
// 123.456.78.90
// 123.045.067.089

function isValidIP(str: string) {
  const ip: string[] = str.split(".");
  if (ip.length != 4) return false;
  for (const item of ip) {
    const intItem = Number(item);
    if (item.length !== intItem.toString().length) return false;
    if (isNaN(intItem)) return false;
    if (intItem > 255 || intItem < 0) return false;
    if (item[0] === "0" && item.length > 1) return false;
  }
  return true;
}

const valid = ["1.2.3.4", "123.45.67.89"];
const invalid = ["1.2.3", "1.2.3.4.5", "123.456.78.90", "123.045.067.089"];

const res = isValidIP("0.0.0.0");
console.log(res);
