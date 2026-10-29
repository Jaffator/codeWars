// Napiš promiseAll a promiseAllSettled bez použití vestavěných Promise.all a Promise.allSettled.

// Požadavky
// 1 promiseAll(iterable) vrátí pole výsledků ve stejném pořadí jako vstup bez ohledu na to, který  promise skončil dřív.
// 2 Zamítne se hned, jak se zamítne kterákoli položka, a to s jejím důvodem.
// 3 Hodnoty, které nejsou promisy, se berou jako už vyřešené.
// 4 Prázdný vstup se hned vyřeší na [].
// 5 promiseAllSettled(iterable) se nikdy nezamítne a vrátí [{ status: "fulfilled", value } nebo {status: "rejected", reason }] v pořadí vstupu.

function sleep<T>(ms: number, value: T) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

function promiseAll<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
  const items = Array.from(iterable);
  if (items.length === 0) return Promise.resolve([]);
  const result = new Array(items.length);
  let counter = items.length;
  return new Promise((resolve, reject) => {
    items.forEach((element, index) => {
      Promise.resolve(element).then((value) => {
        result[index] = value;
        counter--;
        if (counter === 0) return resolve(result);
      }, reject);
    });
  });
}

async function main() {
  const result = await promiseAll([sleep(1000, "a"), sleep(500, "b"), "xs"]);
  console.log(result);
}
main();
