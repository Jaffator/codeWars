// Napiš promiseAll a promiseAllSettled bez použití vestavěných Promise.all a Promise.allSettled.

// Požadavky
// 1 promiseAll(iterable) vrátí pole výsledků ve stejném pořadí jako vstup bez ohledu na to, který  promise skončil dřív.
// 2 Zamítne se hned, jak se zamítne kterákoli položka, a to s jejím důvodem.
// 3 Hodnoty, které nejsou promisy, se berou jako už vyřešené.
// 4 Prázdný vstup se hned vyřeší na [].
// 5 promiseAllSettled(iterable) se nikdy nezamítne a vrátí [{ status: "fulfilled", value } nebo {status: "rejected", reason }] v pořadí vstupu.

function delay<T>(ms: number, value: T) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));
}

function promiseAll<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<T[]> {
  const promises = Array.from(iterable);
  if (promises.length === 0) return Promise.resolve([]);
  let result = new Array(promises.length);
  let counter = promises.length;
  return new Promise((resolve, reject) => {
    promises.forEach((item, index) => {
      Promise.resolve(item).then((value) => {
        result[index] = value;
        counter--;
        if (counter === 0) resolve(result);
      }, reject);
    });
  });
}
promiseAll([delay(400, "a"), "b", delay(2000, "d"), Promise.reject("boom")])
  .then((value) => console.log(value))
  .catch((err) => console.log("err"));

type ReturnObject<T> = { status: "fulfilled"; value: T } | { status: "rejected"; reason: unknown };

function promiseAllSettled<T>(iterable: Iterable<T | PromiseLike<T>>): Promise<ReturnObject<T>[]> {
  const promises = Array.from(iterable);
  if (promises.length === 0) return Promise.resolve([]);
  let result: ReturnObject<T>[] = new Array(promises.length);
  let counter = promises.length;
  return new Promise((resolve, reject) => {
    promises.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          result[index] = { status: "fulfilled", value };
          counter--;
          if (counter === 0) resolve(result);
        },
        (reason) => {
          result[index] = { status: "rejected", reason };
          counter--;
          if (counter === 0) resolve(result);
        },
      );
    });
  });
}

promiseAllSettled([delay(400, "a"), "b", delay(2000, "d"), Promise.reject("boom")])
  .then((value) => console.log(value))
  .catch((err) => console.log("err"));

promiseAllSettled([])
  .then((value) => console.log(value))
  .catch((err) => console.log("err"));
export {};
