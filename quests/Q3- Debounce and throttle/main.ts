// 1. Implementace debounce
function debounce(fn: Function, ms) {
  let timer: any = null;

  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, ms);
  }

  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
}

// 2. Testovací funkce (např. simulace API dotazu)
const searchApi = (query) => {
  console.log(`[${new Date().toLocaleTimeString()}] 🚀 Odesílám API dotaz pro: "${query}"`);
};

// Obalíme funkci s debounce na 1000 ms (1 sekunda)
const debouncedSearch = debounce(searchApi, 1000);

// --- SIMULACE RAPIDNÍHO PSANÍ UŽIVATELE ---
console.log("Uživatel začal psát do vyhledávače...");

// // Uživatel píše 'O', 'Or', 'Orb', 'Orbea' v krátkých intervalech (každých 200 ms)
setTimeout(() => debouncedSearch("O"), 0);
setTimeout(() => debouncedSearch("Or"), 200);
setTimeout(() => debouncedSearch("Orb"), 400);
setTimeout(() => debouncedSearch("Orbea"), 600);

// // Tady uživatel přestal psát.
// // Očekávání: Všechna předchozí volání se zruší.
// // Až za 1000 ms od posledního stisku ("Orbea") se zavolá searchApi("Orbea").

// // --- SIMULACE STORNA (cancel) ---
// // Co když uživatel po napsání okamžitě zavře okno?
setTimeout(() => {
  console.log("\nUživatel píše znova a hned klikne na Cancel...");
  debouncedSearch("Test cancel");

  setTimeout(() => {
    console.log("Volám .cancel() – funkce se NESMÍ vykonat");
    debouncedSearch.cancel();
  }, 300);
}, 2500);

//2. implementace throttle
// když přijde funkce spustí se časovač, po dobu běhu časovače se další volání nesmí spustit až když časovač bude off
// jak zjistit že běží časovač?
// dělat nějakou proměnou true false? když false časovač běží?

function throttle(fn, ms) {
  let isThrottled = false;
  let savedArgs = null;
  let savedThis = null;

  function wrapper(...args) {
    // Pokud jsme v "čekací době", jen si uložíme poslední argumenty a kontext
    if (isThrottled) {
      savedArgs = args;
      savedThis = this;
      return;
    }

    // 1. Spustíme funkci okamžitě (leading execution)
    fn.apply(this, args);
    isThrottled = true;

    // 2. Nastavíme zámek na dobu 'ms'
    setTimeout(() => {
      isThrottled = false;

      // Pokud během čekání přišla další volání, spustíme funkci s posledními argumenty
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

throttle(() => console.log("ahoj"), 500);
