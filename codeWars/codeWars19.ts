// Četnost slov ve velkém souboru

// Napiš topWords(path, n), která najde nejčastější slova v textovém souboru, jenž je moc velký na načtení do paměti.

// Požadavky

// topWords(path, n = 10) vrátí n nejčastějších slov jako [{ word, count }] seřazených podle počtu sestupně, při shodě abecedně.
// Soubor čti jako stream (readline nebo Transform), nikdy přes readFile. Paměť roste jen s počtem různých slov, ne s velikostí souboru.
// Všechno převeď na malá písmena a děl podle všeho, co není písmeno ani číslice, takže „Node,“ a „node“ je stejné slovo. Písmena jako é nebo č se počítají jako písmena.
// Připrav se vysvětlit, jak vybrat top n z milionů různých slov (min-halda o velikosti n).
// Rozhraní a příklad
// await topWords("./big.txt", 3);
// // [{ word: "the", count: 51234 }, { word: "node", count: 20411 }, { word: "stream", count: 9870 }]

import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

type WordCount = { word: string; count: number };

async function topWords(path: string, n: number = 10): Promise<WordCount[]> {
  const stream = createReadStream(path, { encoding: "utf8" });
  const readline = createInterface({ input: stream, crlfDelay: Infinity });
  let mapWords = new Map();
  for await (const line of readline) {
    const lineArray = line.toLocaleLowerCase().match(/[\p{L}\p{N}]+/gu);
    lineArray?.forEach((word) => {
      mapWords.set(word, (mapWords.get(word) ?? 0) + 1);
    });
  }
  const result = [...mapWords].sort((a, b) => b[1] - a[1]).slice(0, n);
  return result.map((item) => ({ word: item[0], count: item[1] }));
}
const p = "topWords\\text.txt";

async function main() {
  const res = await topWords(p, 10);
  console.log(res);
}
main();

// let mapWords = new Map();
// mapWords.set("a", 1);

// mapWords.set("a", (mapWords.get("a") ?? 0) + 1);
// mapWords.set("b", (mapWords.get("a") ?? 0) + 2);
// mapWords.set("n", (mapWords.get("a") ?? 0) + 3);
// mapWords.set("jk", (mapWords.get("a") ?? 0) + 4);
// mapWords.set("nk", (mapWords.get("a") ?? 0) + 30);
// mapWords.set("nk", (mapWords.get("a") ?? 0) + 10);
// console.log(mapWords);
// const a = [...mapWords].sort((a, b) => b[1] - a[1]);

// console.log(a);
