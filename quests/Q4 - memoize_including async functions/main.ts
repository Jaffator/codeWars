import { setTimeout as sleep } from "node:timers/promises";

function memoize(
  fn: Function,
  { keyFn = (...args: any[]) => JSON.stringify(args), ttl }: { keyFn?: Function; ttl?: number } = {},
) {
  const cache = new Map<string, { promise: Promise<any>; expireAt: number }>();
  return function (this: unknown, ...args: any[]) {
    const key = keyFn(...args);
    if (cache.has(key)) {
      if (ttl) {
        const cacheAlive = cache.get(key)?.expireAt! > Date.now();
        if (cacheAlive) {
          console.log(`used cache with ttl, timeleft: ${cache.get(key)?.expireAt! - Date.now()}`);
          return cache.get(key)?.promise;
        } else cache.delete(key);
      }
      return cache.get(key);
    }
    // ---- Shrnutí ----
    // Promise.resolve(val) použij, když chceš zabalit existující hodnota/výsledek do Promisu (nebo sjednotit typy).

    // new Promise(...) použij, když vyrábíš novou asynchronní operaci od nuly a sám řídíš čas, kdy se dokončí (resolve) nebo selže (reject).
    const promise = Promise.resolve(fn.apply(this, args));
    const expireAt = ttl !== undefined ? Date.now() + ttl : Infinity;
    cache.set(key, { promise, expireAt });
    promise.catch(() => {
      if (cache.get(key)?.promise === promise) cache.delete(key);
    });

    console.log("used og");
    return promise;
  };
}

async function add(n1: number, n2: number) {
  return n1 + n2;
}

const addMemo = memoize(add, { ttl: 5000 });

const ar = [
  { n1: 2, n2: 2, expected: "og" },
  { n1: 2, n2: 2, expected: "cache" },
  { n1: 1, n2: 1, expected: "og" },
  { n1: 2, n2: 3, expected: "og" },
  { n1: 1, n2: 1, expected: "cache" },
];

async function main() {
  for (const set of ar) {
    const res = addMemo(set.n1, set.n2);
    await sleep(1000);
    console.log(res, set.expected);
  }
}
main();
export {};
