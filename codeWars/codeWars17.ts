// retry s backoffem a jitterem
// Napiš retry(fn, options), který selhávající asynchronní operaci opakuje s exponenciálním backoffem a jitterem.

// retry(fn, { retries = 3, baseMs = 100, maxMs = 2000, shouldRetry = () => true, signal }) volá fn(attempt), kde attempt začíná na 0, a vrátí první úspěšný výsledek.
// Po neúspěšném pokusu počkej náhodnou dobu mezi 0 a min(maxMs, baseMs × 2^attempt) (full jitter) a zkus to znovu.
// Skonči a vyhoď poslední chybu, když dojdou pokusy nebo když shouldRetry(error) vrátí false.
// fn se celkem zavolá nejvýš retries + 1krát.
// Když se signal přeruší během čekání, retry se hned zamítne s důvodem přerušení.

interface Options {
  retries: number;
  baseMs: number;
  maxMs: number;
  shouldRetry: () => true;
  signal?: AbortSignal;
}

let calls = 0;
async function failtTwice() {
  calls++;
  if (calls <= 2) throw new Error("fail test fn");
  return "done";
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function retry<T>(fn: (attemp: number) => Promise<T>, options: Options) {
  let backoff: number = options.baseMs;
  for (let i = 0; i <= options.retries; i++) {
    try {
      return await fn(i);
    } catch (error) {
      console.log(`pokus ${i} selhal`);
      backoff = backoff * 2;
      const wait = Math.random() * backoff;
      console.log(`další pokus za ${wait} ms `);
      if (i === options.retries) throw error;
      await sleep(wait);
    }
  }
}

retry(failtTwice, { retries: 3, baseMs: 1000, maxMs: 20000, shouldRetry: () => true }).then(console.log);
