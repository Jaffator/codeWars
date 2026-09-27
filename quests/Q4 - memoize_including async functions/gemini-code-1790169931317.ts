function memoize(
  fn: Function, 
  { 
    keyFn = (...args: any[]) => JSON.stringify(args), 
    ttl 
  }: { 
    keyFn?: (...args: any[]) => string; 
    ttl?: number; 
  } = {}
) {
  const cache = new Map<string, { promise: Promise<any>; expiresAt: number }>();

  return async function (...args: any[]) {
    const key = keyFn(...args);
    const now = Date.now();

    // 1. Kontrola cache a TTL
    if (cache.has(key)) {
      const cached = cache.get(key)!;
      if (!ttl || now < cached.expiresAt) {
        return cached.promise; // Vrací běžící/hotový promise
      }
      cache.delete(key); // TTL vypršelo
    }

    // 2. Vytvoření promisu (řeší souběžná volání)
    const promise = Promise.resolve().then(() => fn(...args));

    cache.set(key, {
      promise,
      expiresAt: ttl ? now + ttl : Infinity,
    });

    // 3. Eviction on rejection (smazání z cache při chybě)
    promise.catch(() => {
      if (cache.get(key)?.promise === promise) {
        cache.delete(key);
      }
    });

    return promise;
  };
}