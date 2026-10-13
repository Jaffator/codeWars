// Zadání: Ransom Note
// Máte k dispozici dva řetězce: ransomNote a magazine. Napište funkci, která vrátí true, pokud lze řetězec ransomNote sestavit použitím písmen z řetězce magazine, a false v opačném případě.

// Každé písmeno z řetězce magazine smí být v ransomNote použito pouze jednou.
// Příklad 1:

// Vstup: ransomNote = "a", magazine = "b"

// Výstup: false

// Příklad 2:

// Vstup: ransomNote = "aa", magazine = "ab"

// Výstup: false (magazine obsahuje pouze jedno 'a')

// Příklad 3:

// Vstup: ransomNote = "aa", magazine = "aab"

// Výstup: true

function useMagazine(ransomNote: string, magazine: string) {
  let obj: Record<string, number> = {};
  for (const char of magazine) {
    obj[char] = (obj[char] ?? 0) + 1;
  }
  for (const char of ransomNote) {
    if (obj[char] > 0) obj[char] = obj[char] - 1;
    else return false;
  }
  return true;
}
console.log(useMagazine("abbc", "abbc"));
