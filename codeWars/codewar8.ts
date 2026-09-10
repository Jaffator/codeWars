// How can you tell an extrovert from an introvert at NSA?
// Va gur ryringbef, gur rkgebireg ybbxf ng gur BGURE thl'f fubrf.

// I found this joke on USENET, but the punchline is scrambled. Maybe you can decipher it?
// According to Wikipedia, ROT13 is frequently used to obfuscate jokes on USENET.

// For this task you're only supposed to substitute characters. Not spaces, punctuation, numbers, etc.

// Test examples:

// "EBG13 rknzcyr." -> "ROT13 example."

// "This is my first ROT13 excercise!" -> "Guvf vf zl svefg EBG13 rkprepvfr!"

function rot13(str: string): any {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const strArr = [...str];
  const resultArr: any[] = strArr.map((letter) => {
    if (letter === " ") return " ";
    if (alphabet.indexOf(letter.toUpperCase()) == -1) return letter;

    let index = alphabet.indexOf(letter.toUpperCase()) + 13;
    if (index >= 26) index = index - 26;

    return letter === letter.toLowerCase() ? alphabet[index].toLowerCase() : alphabet[index];
  });
  return resultArr.join("");
}

const res = rot13("EBG13 rknzcyr.");
res;
const guess = prompt("guess a number between 1 and 100!");
